import { Vec2, Box, RopeJoint } from 'planck'
import { BodyData } from './bodyData'
import { FixtureData } from '../fixtures/fixtureData'
import { Fighter } from './fighter'

export class Weapon extends BodyData {
  movePower = 0.5
  maxDistance = 2
  length = 6
  fromPoint = Vec2(0, 0)
  toPoint = Vec2(0, 0)
  fighter: Fighter
  blade: FixtureData

  constructor (fighter: Fighter) {
    super(fighter.stage, {
      type: 'dynamic',
      position: fighter.body.getPosition(),
      bullet: true,
      fixedRotation: false,
      angle: Math.random() * 2 * Math.PI,
      linearDamping: 0.0,
      angularDamping: 0.0
    })
    this.fighter = fighter
    const hx = 0.5 * this.length
    this.blade = this.createFixture({
      shape: new Box(hx, 0.2, Vec2(hx + this.maxDistance, 0)),
      density: 0.01,
      friction: 0,
      restitution: 0
    })
    this.blade.layer = 12
    this.label = 'blade'
    this.blade.label = 'blade'
    this.world.createJoint(new RopeJoint({
      bodyA: this.blade.body,
      bodyB: this.fighter.torso.body,
      localAnchorA: { x: this.maxDistance, y: 0 },
      localAnchorB: { x: 0, y: 0 },
      maxLength: this.maxDistance,
      collideConnected: false
    }))
  }

  onStep (): void {
    super.onStep()
  }
}
