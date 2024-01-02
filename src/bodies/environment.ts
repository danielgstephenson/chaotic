import { Vec2, Circle, Box } from 'planck'
import { BodyData } from './bodyData'
import { Stage } from '../stages/stage'

export class Environment extends BodyData {
  color = '#293030'
  wallThickness = 2

  constructor (stage: Stage) {
    super(stage, {
      type: 'static',
      position: Vec2(0, 0),
      angle: 0
    })
  }

  addWalls (points: Vec2[]): void {
    points.forEach((point, i) => {
      const corner = this.createFixture({
        shape: new Circle(point, 0.5 * this.wallThickness),
        friction: 1,
        restitution: 0
      })
      corner.color = this.color
      if (i === 0) return false
      const oldPoint = points[i - 1]
      const vector = Vec2.sub(point, oldPoint)
      const angle = Math.atan2(vector.y, vector.x)
      const length = Vec2.lengthOf(vector)
      const midPoint = Vec2.mul(Vec2.add(oldPoint, point), 0.5)
      const wall = this.createFixture({
        shape: new Box(0.5 * length, 0.5 * this.wallThickness, midPoint, angle),
        friction: 1,
        restitution: 0
      })
      wall.color = this.color
      wall.label = 'wall'
    })
  }
}
