import { Game } from '../game'

export class DeathMenu {
  game: Game
  deathMenuDiv: HTMLDivElement
  deathButton: HTMLButtonElement

  constructor (game: Game) {
    this.game = game
    this.deathMenuDiv = document.getElementById('deathMenuDiv') as HTMLDivElement
    this.deathButton = document.getElementById('deathButton') as HTMLButtonElement
    this.deathButton.onmouseenter = () => this.deathButton.focus()
    this.deathButton.onclick = () => this.continue()
    this.deathButton.focus()
  }

  show (): void {
    this.deathMenuDiv.style.display = 'flex'
    this.deathButton.focus()
  }

  continue (): void {
    this.game.stage.respawn()
    this.deathMenuDiv.style.display = 'none'
  }
}
