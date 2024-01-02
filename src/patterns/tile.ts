const tileCanvas: HTMLCanvasElement = document.createElement('canvas')
const tileContext: CanvasRenderingContext2D = tileCanvas.getContext('2d') as CanvasRenderingContext2D

tileCanvas.style.imageRendering = 'pixelated'

const size = 4 // this needs to be an even number
tileCanvas.width = size
tileCanvas.height = size
const color1 = '#000000'
const color2 = '#020202'
tileContext.fillStyle = color1
tileContext.fillRect(0, 0, size, size)
tileContext.fillStyle = color2
tileContext.fillRect(0, 0, 0.5 * size, 0.5 * size)
tileContext.fillRect(0.5 * size, 0.5 * size, 0.5 * size, 0.5 * size)
tileContext.stroke()

export const tile: CanvasPattern = tileContext.createPattern(tileCanvas, 'repeat') as CanvasPattern
