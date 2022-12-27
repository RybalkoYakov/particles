import Particles from "./Particle";

const canvas= document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const image = new Image()
image.src = 'assets/cyberPunk.png'



image.onload = function () {
  canvas.width = image.width
  canvas.height = image.height

  ctx.drawImage(image, 0, 0)


}