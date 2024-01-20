import { Game } from './game'

class Input {
  game: Game
  keyboard = new Map<string, boolean>()
  cursor = { x: 0, y: 0, buttons: [false, false, false, false, false] }

  constructor (game: Game) {
    this.game = game
    window.onkeydown = (event: KeyboardEvent) => this.onkeydown(event)
    window.onkeyup = (event: KeyboardEvent) => this.onkeyup(event)
    window.onmousemove = (event: MouseEvent) => this.onmousemove(event)
    window.onmousedown = (event: MouseEvent) => this.onmousedown(event)
    window.onmouseup = (event: MouseEvent) => this.onmouseup(event)
    window.onwheel = (event: WheelEvent) => this.onwheel(event)
    window.ontouchstart = (event: TouchEvent) => this.ontouchstart(event)
    window.ontouchend = (event: TouchEvent) => this.ontouchmove(event)
    window.ontouchmove = (event: TouchEvent) => this.ontouchmove(event)
    window.oncontextmenu = () => false
  }

  onkeydown (event: KeyboardEvent): void {
    this.keyboard.set(event.code, true)
    if (event.code === 'Escape') this.game.togglePause()
  }

  onkeyup (event: KeyboardEvent): void {
    this.keyboard.set(event.code, false)
  }

  isKeyDown (key: string): boolean {
    return this.keyboard.get(key) ?? false
  }

  onmousemove (event: MouseEvent): void {
    this.cursor.x = event.clientX - 0.5 * window.innerWidth
    this.cursor.y = 0.5 * window.innerHeight - event.clientY
  }

  onmousedown (event: MouseEvent): void {
    this.cursor.buttons[event.button] = true
    event.preventDefault()
  }

  onmouseup (event: MouseEvent): void {
    this.cursor.buttons[event.button] = false
  }

  onwheel (event: WheelEvent): void {
    this.game.runner.zoom(0.005 * event.deltaY)
  }

  ontouchstart (event: TouchEvent): void {
    this.cursor.buttons[0] = event.touches.length >= 1
    this.cursor.x = event.touches[0].clientX - 0.5 * window.innerWidth
    this.cursor.y = 0.5 * window.innerHeight - event.touches[0].clientY
  }

  ontouchend (event: TouchEvent): void {
    this.cursor.buttons[0] = event.touches.length > 1
    this.cursor.x = event.touches[0].clientX - 0.5 * window.innerWidth
    this.cursor.y = 0.5 * window.innerHeight - event.touches[0].clientY
  }

  ontouchmove (event: TouchEvent): boolean {
    this.cursor.buttons[0] = true
    this.cursor.x = event.touches[0].clientX - 0.5 * window.innerWidth
    this.cursor.y = 0.5 * window.innerHeight - event.touches[0].clientY
    return false
  }
}

export { Input }
