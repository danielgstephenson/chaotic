import { Vec2, Circle } from 'planck'
import { Actor } from './actor'
import { FixtureData } from '../feature'
import { Stage } from '../stages/stage'
import { Weapon } from './weapon'

export class Fighter extends Actor {
  alive = true
  movePower = 5
  moveDir = Vec2(0, 0)
  torso: FixtureData
  weapon: Weapon
  blade: FixtureData

  constructor (stage: Stage, position: Vec2) {
    super(stage, {
      type: 'dynamic',
      position,
      bullet: true,
      fixedRotation: true,
      linearDamping: 1
    })
    this.torso = this.createFixture({
      shape: new Circle(Vec2(0, 0), 0.5),
      density: 1,
      friction: 0,
      restitution: 0
    })
    this.torso.layer = 11
    this.torso.label = 'torso'
    this.torso.preDraw = () => this.drawConnection()
    this.weapon = new Weapon(this)
    this.blade = this.weapon.blade
  }

  onStep (): void {
    super.onStep()
    this.move()
  }

  move (): void {
    this.moveDir.normalize()
    const force = Vec2.mul(this.moveDir, this.movePower)
    this.body.applyForceToCenter(force)
  }

  drawConnection (): void {
    const fromPoint = this.body.getWorldCenter()
    const toPoint = this.weapon.body.getWorldPoint(Vec2(0, 0))
    const context = this.game.runner.context
    context.strokeStyle = 'rgb(256,256,256,0.5)'
    context.lineCap = 'round'
    context.lineWidth = 0.1
    context.beginPath()
    context.moveTo(fromPoint.x, fromPoint.y)
    context.lineTo(toPoint.x, toPoint.y)
    context.closePath()
    context.stroke()
  }

  die (): void {}
}
