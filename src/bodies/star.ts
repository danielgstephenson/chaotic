import { range } from '../math'
import { Stage } from '../stages/stage'
import { BodyData } from './bodyData'
import { Chain, Vec2 } from 'planck'

export class Star extends BodyData {
  constructor (stage: Stage, position: Vec2) {
    super(stage, {
      type: 'static',
      position,
      angle: 0
    })
    const size = 1.5
    const vertices: Vec2[] = []
    range(5).forEach(i => {
      const angle = (0.25 + i / 5) * 2 * Math.PI
      const point = Vec2(size * Math.cos(angle), size * Math.sin(angle))
      vertices.push(point)
      const size2 = 0.55 * size
      const angle2 = angle + 1 / 10 * 2 * Math.PI
      const point2 = Vec2(size2 * Math.cos(angle2), size2 * Math.sin(angle2))
      vertices.push(point2)
    })
    const fixture = this.createFixture({
      shape: new Chain(vertices, true),
      friction: 0,
      restitution: 0
    })
    fixture.color = 'hsla(51, 100%, 41%, 1)'
    fixture.label = 'star'
    fixture.layer = 7
  }
}
