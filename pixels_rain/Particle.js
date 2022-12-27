export default class Particles{
  #x
  #y
  #width
  #height
  #speed
  #velocity
  #size
  #ctx = document.querySelector('canvas').getContext('2d')
  #particlesCount



  constructor({x, y, width, height, speed, velocity, size, ctx, particlesCount}) {
    this.#width = width || 300
    this.#height = height || 150
    this.#x = x || Math.random()  * this.#width
    this.#y = 0
    this.#speed = speed || 0
    this.#velocity = velocity || Math.random() * 0.5
    this.#size = (size || 1) * Math.random() * 1.5 + 1
    this.#ctx = ctx || this.#ctx
    this.#particlesCount = particlesCount || 500
  }

  update(){
    this.#y += this.#velocity
    if (this.#y >= this.#height) {
      this.#y = 0
      this.#x = Math.random() * this.#width
    }
  }

  draw(){
    this.#ctx.beginPath()
    this.#ctx.fillStyle = 'white'
    this.#ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2)
    this.#ctx.fill()
  }

  init(){
    const particles = []
    for (let i = 0; i < this.#particlesCount; i++) {
      particles.push(this)
    }
    return particles
  }
}