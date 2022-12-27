export default class AsciiEffect{
  #imageCells = []
  #cellSize
  #pixels = []
  #ctx
  #image
  #width
  #height

  constructor(ctx, image, width, height, cellSize) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height
    this.#image = image
    this.#cellSize = cellSize

    this.#ctx.drawImage(image, 0, 0, this.#width, this.#height)
    this.#pixels = this.#ctx.getImageData(0,0, this.#width, this.#height)
  }

  #getImageCells(){
    for (let y = 0; y < this.#pixels.height; y += this.#cellSize) {
      for (let x = 0; x < this.#pixels.width; x += this.#cellSize) {

        const index = (y * this.#pixels.width + x) * 4

        const red = this.#pixels.data[index]
        const green = this.#pixels.data[index + 1]
        const blue = this.#pixels.data[index + 2]
        const alpha = this.#pixels.data[index + 3]

        const averageColor = (red + green + blue) / 3
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha/255})`

        const symbol = AsciiEffect.#convertToSymbol(averageColor)

        this.#imageCells.push(new Cell(x,y, symbol,color))
      }
    }
  }

  static #convertToSymbol(averageColor) {
    if (averageColor > 250) {return ':'}
    else if (averageColor > 240) {return ';'}
    else if (averageColor > 220) {return '1'}
    else if (averageColor > 200) {return '2'}
    else if (averageColor > 180) {return '3'}
    else if (averageColor > 140) {return '0'}
    else if (averageColor > 120) {return '8'}
    else if (averageColor > 160) {return '&'}
    else if (averageColor > 100) {return '%'}
    else if (averageColor > 80) {return '$'}
    else if (averageColor > 60) {return '#'}
    else if (averageColor > 40) {return 'X'}
    else if (averageColor > 20) {return 'W'}
    else if (averageColor >= 0) {return '@'}
  }

  #drawAscii(){
    this.#ctx.clearRect(0,0, this.#width, this.#height)
    this.#imageCells.forEach(cell => cell.draw(this.#ctx, this.#cellSize))
  }

  draw() {
    this.#getImageCells()
    this.#drawAscii()
  }
}

export class Cell {
  #x
  #y
  #symbol
  #color

  constructor(x,y, symbol, color) {
    this.#x = x
    this.#y = y
    this.#symbol = symbol
    this.#color = color
  }

  draw(ctx, fontSize){
    ctx.fillStyle = this.#color;
    ctx.font = `${fontSize * 1.8}px sans-serif`
    ctx.fillText(this.#symbol, this.#x, this.#y)
  }
}