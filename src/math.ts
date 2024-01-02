function getAngleDifference (angle1: number, angle2: number): number {
  const v = { x: Math.cos(angle1), y: Math.sin(angle1) }
  const w = { x: Math.cos(angle2), y: Math.sin(angle2) }
  return Math.atan2(w.y * v.x - w.x * v.y, w.x * v.x + w.y * v.y)
}

function clamp (a: number, b: number, x: number): number {
  return Math.max(a, Math.min(x, b))
}

function range (n: number): number[] {
  return [...Array(n).keys()]
}

function runif (a: number, b: number): number {
  return a + Math.random() * (b - a)
}

function choose<type> (array: type[]): type {
  return array[Math.floor(Math.random() * array.length)]
}

export { getAngleDifference, clamp, range, runif, choose }
