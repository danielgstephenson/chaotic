const canvas: HTMLCanvasElement = document.createElement('canvas')
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.style.imageRendering = 'pixelated'

const size = 4 // this needs to be an even number
canvas.width = size
canvas.height = size
const color1 = '#000000'
const color2 = '#020202'
context.fillStyle = color1
context.fillRect(0, 0, size, size)
context.fillStyle = color2
context.fillRect(0, 0, 0.5 * size, 0.5 * size)
context.fillRect(0.5 * size, 0.5 * size, 0.5 * size, 0.5 * size)

export const checker: CanvasPattern = context.createPattern(canvas, 'repeat') as CanvasPattern
