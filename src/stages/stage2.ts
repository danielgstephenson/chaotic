import { Vec2 } from 'planck'
import { Stage } from './stage'
import { Game } from '../game'

export class Stage2 extends Stage {
  constructor (game: Game) {
    super(game)
    const height = 20
    const width = 50
    this.corners.push(Vec2(-height, height))
    this.corners.push(Vec2(-height, -height))
    this.corners.push(Vec2(+width, -height))
    this.corners.push(Vec2(+width, height))
    const outerCorners = this.corners.map(corner => corner)
    outerCorners.push(this.corners[0])
    this.environment.addWalls(outerCorners)
    this.player = this.addPlayer(Vec2(0, 0))
    this.addEnemy(Vec2(20, 0))
    this.addStar(Vec2(40, 0))
  }

  onStep (): void {
    super.onStep()
  }

  respawn (): void {
    super.respawn()
    this.game.state = 'play'
    console.log('respawnPoint', this.spawnPoint)
    this.game.stage = new Stage2(this.game)
  }

  onComplete (): void {
    console.log('stage 2 complete')
    this.paused = true
    this.game.stageCompleteMenu.show()
  }

  beginNextStage (): void {
    console.log('begin next stage...')
    // this.game.stage = new Stage2(this.game)
  }
}
