import { Vec2, Box } from 'planck'
import { BodyData } from './bodyData'
import { FixtureData } from '../fixtures/fixtureData'
import { Fighter } from './fighter'

export class Blade extends BodyData {
  movePower = 4
  length = 6
  fromPoint = Vec2(0, 0)
  toPoint = Vec2(0, 0)
  fighter: Fighter
  fixtureData: FixtureData

  constructor (fighter: Fighter) {
    super(fighter.stage, {
      type: 'dynamic',
      position: fighter.body.getPosition(),
      bullet: true,
      fixedRotation: false,
      angle: 0.5,
      linearDamping: 0.5,
      angularDamping: 0.5
    })
    this.fighter = fighter
    const hx = 0.5 * this.length
    this.fixtureData = this.createFixture({
      shape: new Box(hx, 0.2, Vec2(hx, 0)),
      density: 0.5,
      friction: 0,
      restitution: 0
    })
    this.fixtureData.layer = 12
    this.label = 'blade'
    this.fixtureData.label = 'blade'
  }

  onStep (): void {
    super.onStep()
    this.fromPoint = this.body.getWorldPoint(Vec2(0, 0))
    this.toPoint = this.fighter.body.getWorldCenter()
    const force = Vec2.mul(Vec2.sub(this.toPoint, this.fromPoint), this.movePower)
    this.body.applyForce(force, this.fromPoint)
  }

  preDraw (): void {
    this.fromPoint = this.body.getWorldPoint(Vec2(0, 0))
    this.toPoint = this.fighter.body.getWorldCenter()
    const context = this.game.runner.context
    context.strokeStyle = 'rgb(100,100,100,0.5)'
    context.lineWidth = 0.1
    context.beginPath()
    context.moveTo(this.fromPoint.x, this.fromPoint.y)
    context.lineTo(this.toPoint.x, this.toPoint.y)
    context.closePath()
    context.stroke()
  }
}
