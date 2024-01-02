import { Vec2 } from 'planck'
import { Stage } from './stage'
import seedrandom from 'seedrandom'

class Stage1 extends Stage {
  setup (): void {
    this.runif = seedrandom(String(Math.random()))
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
    this.addStar(Vec2(0, this.north - 10))
  }

  onStep (): void {
    super.onStep()
  }

  respawn (): void {
    super.respawn()
    this.game.state = 'play'
    console.log('respawnPoint', this.spawnPoint)
    this.game.stage = new Stage1(this.game, this.spawnPoint, this.spawnAngle)
  }

  complete (): void {
    console.log('stage complete')
  }
}

export { Stage1 }
