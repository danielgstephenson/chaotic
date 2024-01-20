import { Vec2, Box, DistanceJoint } from 'planck'
import { Actor } from './actor'
import { FixtureData } from '../feature'
import { Fighter } from './fighter'

export class Weapon extends Actor {
  movePower = 0.5
  maxDistance = 1
  fromPoint = Vec2(0, 0)
  toPoint = Vec2(0, 0)
  fighter: Fighter
  blade: FixtureData

  constructor (fighter: Fighter) {
    super(fighter.stage, {
      type: 'dynamic',
      position: Vec2.add(fighter.body.getPosition(), Vec2(0, 0)),
      bullet: true,
      fixedRotation: false,
      angle: Math.random() * 2 * Math.PI,
      linearDamping: 0.3,
      angularDamping: 0.6
    })
    this.fighter = fighter
    /*
    this.blade = this.createFixture({
      shape: new Box(hx, 0.2, Vec2(hx + this.maxDistance, 0)),
      density: 0.01,
      friction: 0,
      restitution: 0
    })
    */
    this.blade = this.createFixture({
      shape: new Box(2, 0.2, Vec2(2, 0)),
      density: 0.01,
      friction: 0,
      restitution: 0
    })
    this.blade.layer = 12
    this.label = 'blade'
    this.blade.label = 'blade'
    /*
    this.world.createJoint(new RopeJoint({
      bodyA: this.blade.body,
      bodyB: this.fighter.torso.body,
      localAnchorA: { x: this.maxDistance, y: 0 },
      localAnchorB: { x: 0, y: 0 },
      maxLength: this.maxDistance,
      collideConnected: false
    }))
    */
    /*
    this.world.createJoint(new RevoluteJoint({
      bodyA: this.blade.body,
      bodyB: this.fighter.torso.body,
      localAnchorA: { x: 0, y: 0 },
      localAnchorB: { x: 0, y: 0 },
      referenceAngle: 0,
      collideConnected: false
    }))
    */
    this.world.createJoint(new DistanceJoint({
      bodyA: this.blade.body,
      bodyB: this.fighter.torso.body,
      localAnchorA: { x: 0, y: 0 },
      localAnchorB: { x: 0, y: 0 },
      frequencyHz: 0.6,
      dampingRatio: 0.0,
      collideConnected: false
    }))
  }

  onStep (): void {
    super.onStep()
  }
}
