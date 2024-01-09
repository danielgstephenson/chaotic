import { Fixture, FixtureDef, Body } from 'planck'
import { Actor } from '../actors/actor'
import { Stage } from '../stages/stage'
import { Game } from '../game'

class FixtureData {
  actor: Actor
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
    this.actor = body.getUserData() as Actor
    this.stage = this.actor.stage
    this.game = this.stage.game
    this.fixture = body.createFixture(fixtureDef) // PROBLEM: Locked During Callbacks
    this.fixture.setUserData(this)
  }

  preDraw (): void {}

  postDraw (): void {}

  topDraw (): void {}
}

export { FixtureData }
