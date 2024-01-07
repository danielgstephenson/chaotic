import { Game } from './game'

class Input {
  game: Game
  keyboard = new Map<string, boolean>()
  mouse = { x: 0, y: 0, buttons: [false, false, false, false, false] }
  mode = 'keyboard'

  constructor (game: Game) {
    this.game = game
    window.onkeydown = (event: KeyboardEvent) => this.onkeydown(event)
    window.onkeyup = (event: KeyboardEvent) => this.onkeyup(event)
    window.onmousemove = (event: MouseEvent) => this.onmousemove(event)
    window.onmousedown = (event: MouseEvent) => this.onmousedown(event)
    window.onmouseup = (event: MouseEvent) => this.onmouseup(event)
    window.ontouchstart = (event: TouchEvent) => this.ontouchstart(event)
    window.ontouchend = (event: TouchEvent) => this.ontouchend(event)
    window.ontouchmove = (event: TouchEvent) => this.ontouchmove(event)
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
    this.mouse.x = event.clientX - 0.5 * window.innerWidth
    this.mouse.y = 0.5 * window.innerHeight - event.clientY
  }

  onmousedown (event: MouseEvent): void {
    this.mouse.buttons[event.button] = true
    event.preventDefault()
  }

  onmouseup (event: MouseEvent): void {
    this.mouse.buttons[event.button] = false
  }

  ontouchstart (event: TouchEvent): void {
    this.mouse.buttons[0] = true
    if (event.touches.length > 0) {
      this.mouse.x = event.touches[0].clientX - 0.5 * window.innerWidth
      this.mouse.y = 0.5 * window.innerHeight - event.touches[0].clientY
    }
  }

  ontouchend (event: TouchEvent): void {
    this.mouse.buttons[0] = false
    if (event.touches.length > 0) {
      this.mouse.x = event.touches[0].clientX - 0.5 * window.innerWidth
      this.mouse.y = 0.5 * window.innerHeight - event.touches[0].clientY
    }
  }

  ontouchmove (event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.mouse.x = event.touches[0].clientX - 0.5 * window.innerWidth
      this.mouse.y = 0.5 * window.innerHeight - event.touches[0].clientY
    }
  }
}

export { Input }
