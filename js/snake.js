function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 40;
var gridsize = canvas.width / grid;
var count = 0;
let score = 0;

var snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  cells: [],
  maxCells: 4

};

var apple = {
  x: 320,
  y: 320
};


function loop() {
  requestAnimationFrame(loop);
  if (++count < Math.floor(Math.sqrt(snake.maxCells)) + 2) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({
    x: snake.x,
    y: snake.y
  });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = '#211908';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  context.fillStyle = "black"
  context.font = "50px Arial";
  context.fillText(snake.maxCells - 4, grid * 10, grid * 1);


  context.fillStyle = `#c9701c`;
  snake.cells.forEach(function(cell, index) {
    context.fillStyle = `rgb(24, ${Math.floor(210 - 10*index)}, 0)`;
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      if (snake.maxCells > 13){
        setTimeout(function(){
  window.location.href = 'qest.html';
}, 1 * 1000);
      }


      apple.x = getRandomInt(0, gridsize) * grid;
      apple.y = getRandomInt(0, gridsize) * grid;

    }
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, gridsize) * grid;
        apple.y = getRandomInt(0, gridsize) * grid;





      }
    }
  });
};

document.addEventListener('keydown', function(e) {

  // Стрелка влево
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // Стрелка вверх
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // Стрелка вправо
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // Стрелка вниз
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});







requestAnimationFrame(loop);

var arrow_keys_handler = function(e) {
  switch (e.keyCode) {
    case 37:
    case 39:
    case 38:
    case 40: // Arrow keys
    case 32:
      e.preventDefault();
      break; // Space
    default:
      break; // do not block other keys
  }
};
window.addEventListener("keydown", arrow_keys_handler, false);
