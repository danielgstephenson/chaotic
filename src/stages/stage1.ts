import { Vec2 } from 'planck'
import { Stage } from './stage'
import { Stage2 } from './stage2'
import { Game } from '../game'

export class Stage1 extends Stage {
  constructor (game: Game) {
    super(game)
    this.north = 50
    const width = 20
    this.corners.push(Vec2(-width, this.north))
    this.corners.push(Vec2(-width, -width))
    this.corners.push(Vec2(+width, -width))
    this.corners.push(Vec2(+width, this.north))
    this.environment.addWalls([
      Vec2(-width, +this.north),
      Vec2(-width, -width),
      Vec2(+width, -width),
      Vec2(+width, +this.north),
      Vec2(-width, +this.north)
    ])
    this.player = this.addPlayer(Vec2(0, 0))
    this.addStar(Vec2(0, 30))
  }

  onStep (): void {
    super.onStep()
  }

  respawn (): void {
    super.respawn()
    this.game.state = 'play'
    this.game.stage = new Stage1(this.game)
  }

  onComplete (): void {
    console.log('stage 1 complete')
    this.paused = true
    this.game.stageCompleteMenu.show()
  }

  beginNextStage (): void {
    this.game.stage = new Stage2(this.game)
  }
}
