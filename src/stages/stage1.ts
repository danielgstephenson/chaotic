import { Vec2 } from 'planck'
import { Stage } from './stage'
import { Stage2 } from './stage2'
import { Game } from '../game'

export class Stage1 extends Stage {
  constructor (game: Game) {
    super(game)
    const height = 50
    const width = 20
    this.corners.push(Vec2(-width, height))
    this.corners.push(Vec2(-width, -width))
    this.corners.push(Vec2(+width, -width))
    this.corners.push(Vec2(+width, height))
    const outerCorners = this.corners.map(corner => corner)
    outerCorners.push(this.corners[0])
    this.environment.addWalls(outerCorners)
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
    console.log('begin stage 2')
    this.game.stage = new Stage2(this.game)
  }
}
