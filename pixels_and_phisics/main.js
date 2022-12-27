window.addEventListener('load', function (){
  // ASSETS
  const image = document.querySelector('#image');

  // CANVAS INITIALIZATION
  const canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  // CONTROLS
  const warpSpeedInput = document.querySelector('#warp_speed');
  const warpSpeedOutput = document.querySelector('#warp_speed_output');

  // LISTENERS
  warpSpeedInput.addEventListener('input', (e) => {
    warpSpeedOutput.innerHTML = `Warp Speed ${e.target.value}`;
    particles.setWarpSpeed(e.target.value/2000);
  })

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
      this.originX = Math.floor(x);
      this.originy = Math.floor(y);
      this.color = color || 'red';
      this.size = this.effect.gap;
      this.vx = 0;
      this.vy = 0;
      this.ease = 0.1;
      this.friction = 0.8;
      this.dx = 0;
      this.dy = 0;
      this.squareDistance = 0;
      this.force = 0;
      this.angle = 0;
    }

    draw(context2D){
      context2D.fillStyle = this.color;
      context2D.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    update(){
      this.dx = this.effect.mouse.x - this.x;
      this.dy = this.effect.mouse.y - this.y;
      this.squareDistance = this.dx * this.dx + this.dy * this.dy;
      this.force = - this.effect.mouse.radius / this.squareDistance;

      if (this.squareDistance < this.effect.mouse.radius) {
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx += this.force * Math.cos(this.angle);
        this.vy += this.force * Math.sin(this.angle);
      }

      this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
      this.y += (this.vy *= this.friction) + (this.originy - this.y) * this.ease;
    }

    warp() {
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
    }

    setWarpSpeed(ease) {
      this.ease = ease;
    }
  }

  class Particles {
    constructor(width, height, image, gap) {
      this.width = width;
      this.height = height;
      this.particlesArray = [];
      this.image = image;
      this.centeredX = canvas.width / 2 - image.width / 2;
      this.centeredY = canvas.height / 2 - image.height / 2;
      this.gap = gap || 3;
      this.mouse = {
        radius: 2500,
        x: null,
        y: null
      }

      window.addEventListener('pointermove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      })

      window.addEventListener('pointerdown', e => {
        if (e.target.dataset.type === 'warp_button') {
          this.warp();
        }
      })
    }

    init(context2D){
      context2D.drawImage(this.image, this.centeredX, this.centeredY);
      const pixels = context2D.getImageData(0,0, this.width, this.height).data;
      for (let y = 0; y < this.height; y += this.gap) {
        for (let x = 0; x < this.width; x += this.gap) {
          const index = (y * this.width + x) * 4
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];
          const color = `rgb(${red}, ${green}, ${blue})`;

          if (alpha > 0) {
            this.particlesArray.push(new Particle(this, x, y, color))
          }
        }
      }
    }

    draw(context2D) {
      this.particlesArray.forEach(value => value.draw(context2D));
    }

    update(){
      this.particlesArray.forEach(value => value.update());
    }

    warp() {
      this.particlesArray.forEach(value => value.warp())
    }

    setWarpSpeed(ease) {
      this.particlesArray.forEach(value => value.setWarpSpeed(ease))
    }
  }

  const particles = new Particles(canvas.width, canvas.height, image);
  particles.init(ctx);


  // UPDATE LOOP
  function animate() {

    ctx.clearRect(0,0, canvas.width, canvas.height)
    particles.draw(ctx);
    particles.update();

    window.requestAnimationFrame(animate);
  }
  animate();
})