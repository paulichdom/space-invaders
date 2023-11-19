class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
    this.speed = 10;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    // horizontal movement
    if(this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
    if(this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;

    // horizontal boundaries
    if(this.x < 0) this.x = 0;
    if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
  }
}

class Projectile {}

class Enemy {}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    // event listeners
    window.addEventListener('keydown', e => {
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
    });

    window.addEventListener('keyup', e => {
      const index = this.keys.indexOf(e.key);
      if(index > -1) this.keys.splice(index, 1);
    });
  }

  render(context) {
    this.player.draw(context);
    this.player.update();
  }
}

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 800;

  const game = new Game(canvas);
  game.render(ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
