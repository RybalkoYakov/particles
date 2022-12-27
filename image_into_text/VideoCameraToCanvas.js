export default class VideoCameraToCanvas {
  #constraints = {
    video: true,
    audio: false
  }

  #videoDomElement = document.querySelector('video') || document.body.appendChild(document.createElement('video'))
  #canvas = document.querySelector('canvas') || document.body.appendChild(document.createElement('canvas'))
  #context = this.#canvas.getContext('2d', {willReadFrequently: false})

  constructor({constraints, videoDomElement, canvas, context, width, height}) {
    this.#constraints = constraints || this.#constraints
    this.#videoDomElement = videoDomElement || this.#videoDomElement
    this.#canvas = canvas || this.#canvas
    this.#canvas.width = width || 500;
    this.#canvas.height = height || 360;
    this.#context = context || this.#context
  }

  takeFrame () {
    this.#context.drawImage(this.#videoDomElement, 0, 0, this.#canvas.width, this.#canvas.height);
  }

  init() {
    navigator.mediaDevices
      .getUserMedia(this.#constraints)
      .then(stream => {
      window.stream = stream;
      this.#videoDomElement.srcObject = stream;
    }).catch(error => error)
  }

}