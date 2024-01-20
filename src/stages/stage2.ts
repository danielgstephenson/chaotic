import { Vec2 } from 'planck'
import { Stage } from './stage'
import { Game } from '../game'

export class Stage2 extends Stage {
  constructor (game: Game) {
    super(game)
    this.north = 190
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
    this.addEnemy(Vec2(0, 20))
    this.addStar(Vec2(0, 30))
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
    console.log('stage complete')
  }
}
