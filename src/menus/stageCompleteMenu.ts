import { Game } from '../game'

export class StageCompleteMenu {
  game: Game
  menuDiv: HTMLDivElement
  button: HTMLButtonElement

  constructor (game: Game) {
    this.game = game
    this.menuDiv = document.getElementById('stageCompleteMenuDiv') as HTMLDivElement
    this.button = document.getElementById('stageCompleteButton') as HTMLButtonElement
    this.button.onmouseenter = () => this.button.focus()
    this.button.onclick = () => this.continue()
    this.button.focus()
  }

  show (): void {
    this.menuDiv.style.display = 'flex'
    this.button.focus()
  }

  continue (): void {
    this.game.stage.beginNextStage()
    this.menuDiv.style.display = 'none'
  }
}
