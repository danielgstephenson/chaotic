import { Input } from './input'
import { DeathMenu } from './menus/deathMenu'
import { MainMenu } from './menus/mainMenu'
import { StageCompleteMenu } from './menus/stageCompleteMenu'
import { Runner } from './runner'
import { Stage } from './stages/stage'
import { Stage1 } from './stages/stage1'

class Game {
  mainMenu: MainMenu
  deathMenu: DeathMenu
  stageCompleteMenu: StageCompleteMenu
  playDiv: HTMLDivElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  runner: Runner
  stage: Stage
  input: Input
  state = 'mainMenu'

  constructor () {
    this.playDiv = document.getElementById('playDiv') as HTMLDivElement
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.runner = new Runner(this)
    this.input = new Input(this)
    this.stage = new Stage1(this)
    this.mainMenu = new MainMenu(this)
    this.deathMenu = new DeathMenu(this)
    this.stageCompleteMenu = new StageCompleteMenu(this)
  }

  togglePause (): void {
    if (this.state === 'play') {
      if (this.runner.paused) this.runner.start()
      else this.runner.pause()
    }
  }
}

export { Game }
