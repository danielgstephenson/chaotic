import { Body, BodyDef, World, FixtureDef } from 'planck'
import { FixtureData } from '../feature'
import { Stage } from '../stages/stage'
import { Game } from '../game'

export class Actor {
  body: Body
  stage: Stage
  game: Game
  world: World
  label = 'default'
  drawShape = true

  constructor (stage: Stage, bodyDef: BodyDef) {
    this.stage = stage
    this.game = this.stage.game
    this.world = this.stage.world
    this.body = this.world.createBody(bodyDef)
    this.body.setUserData(this)
  }

  createFixture (fixtureDef: FixtureDef): FixtureData {
    const fixtureData = new FixtureData(this.body, fixtureDef)
    return fixtureData
  }

  onStep (): void {}

  postDraw (): void {}

  preDraw (): void {}
}
