import AsciiEffect from "./AsciiEffect.js"
import VideoCameraToCanvas from "./VideoCameraToCanvas.js";

const video = document.querySelector('video')

const image = new Image()
image.src = 'assets/img/naruto.png'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d', { willReadFrequently: false })

const framesIntoCanvas = new VideoCameraToCanvas({})
framesIntoCanvas.init()

function animate() {
  framesIntoCanvas.takeFrame()
  const effect = new AsciiEffect(ctx, video, canvas.width, canvas.height, 5)
  effect.draw()
  window.requestAnimationFrame(animate)
}
animate();



