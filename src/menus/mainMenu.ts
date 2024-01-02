import { Game } from '../game'
import { Stage1 } from '../stages/stage1'

export class MainMenu {
  game: Game
  mainMenuDiv: HTMLDivElement
  startButton: HTMLButtonElement
  optionsButton: HTMLButtonElement
  playDiv: HTMLDivElement

  constructor (game: Game) {
    this.game = game
    this.mainMenuDiv = document.getElementById('mainMenuDiv') as HTMLDivElement
    this.startButton = document.getElementById('startButton') as HTMLButtonElement
    this.optionsButton = document.getElementById('optionsButton') as HTMLButtonElement
    this.playDiv = document.getElementById('playDiv') as HTMLDivElement
    this.startButton.onmouseenter = () => this.startButton.focus()
    this.optionsButton.onmouseenter = () => this.optionsButton.focus()
    this.startButton.onclick = () => this.start()
    this.startButton.focus()
  }

  start (): void {
    this.startButton.focus()
    this.game.state = 'play'
    this.game.stage = new Stage1(this.game)
    this.game.runner.start()
    this.mainMenuDiv.style.display = 'none'
    this.playDiv.style.display = 'block'
  }
}
