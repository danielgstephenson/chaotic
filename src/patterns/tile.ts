const canvas: HTMLCanvasElement = document.createElement('canvas')
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.style.imageRendering = 'pixelated'

const size = 100 // this needs to be an even number
canvas.width = size
canvas.height = size
context.fillStyle = '#000000'
context.strokeStyle = '#161616'
context.fillRect(0, 0, size, size)
context.beginPath()
context.rect(0, 0, size, size)
context.lineJoin = 'miter'
context.lineWidth = 1
context.stroke()

export const tile: CanvasPattern = context.createPattern(canvas, 'repeat') as CanvasPattern
