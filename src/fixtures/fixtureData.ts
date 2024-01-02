import { Fixture, FixtureDef, Body } from 'planck'
import { BodyData } from '../bodies/bodyData'
import { Stage } from '../stages/stage'
import { Game } from '../game'

class FixtureData {
  bodyData: BodyData
  body: Body
  stage: Stage
  game: Game
  fixture: Fixture
  layer = 10
  color = '#FFFFFF'
  label = 'default'
  drawShape = true

  constructor (body: Body, fixtureDef: FixtureDef) {
    this.body = body
    this.bodyData = body.getUserData() as BodyData
    this.stage = this.bodyData.stage
    this.game = this.stage.game
    this.fixture = body.createFixture(fixtureDef) // PROBLEM: Locked During Callbacks
    this.fixture.setUserData(this)
  }

  preDraw (): void {}

  postDraw (): void {}

  topDraw (): void {}
}

export { FixtureData }
