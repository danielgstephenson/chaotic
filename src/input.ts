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
  }

  onkeydown (event: KeyboardEvent): void {
    this.keyboard.set(event.code, true)
    if (event.code === 'Escape') this.game.togglePause()
  }

  onkeyup (event: KeyboardEvent): void {
    this.keyboard.set(event.code, false)
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

  isKeyDown (key: string): boolean {
    return this.keyboard.get(key) ?? false
  }
}

export { Input }
