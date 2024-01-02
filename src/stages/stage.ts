import { World, Vec2, Contact } from 'planck'
import { FixtureData } from '../fixtures/fixtureData'
import { Environment } from '../bodies/environment'
import { Enemy } from '../bodies/enemy'
import { Game } from '../game'
import { EnemyDef } from '../bodies/enemyDef'
import { Star } from '../bodies/star'
import { Player } from '../bodies/player'

class Stage {
  game: Game
  world: World
  player: Player
  environment: Environment
  corners: Vec2[] = []
  runif = (): number => Math.random()
  spawnPoint = Vec2(0, 0)
  spawnAngle = 0
  north = 100

  constructor (game: Game, spawnPoint?: Vec2, spawnAngle?: number) {
    this.game = game
    this.world = new World({ gravity: new Vec2(0, 0) })
    this.world.on('pre-solve', (contact) => this.preSolve(contact))
    this.world.on('begin-contact', (contact) => this.beginContact(contact))
    this.player = this.addPlayer(Vec2(0, 0))
    this.environment = new Environment(this)
    this.spawnPoint = spawnPoint ?? this.spawnPoint
    this.spawnAngle = spawnAngle ?? this.spawnAngle
    this.setup()
  }

  setup (): void {
    //
  }

  onStep (): void { }

  respawn (): void {
    console.log('respawn')
  }

  complete (): void {
    console.log('complete')
  }

  preSolve (contact: Contact): void {
    const a = contact.getFixtureA().getUserData() as FixtureData
    const b = contact.getFixtureB().getUserData() as FixtureData
    if (a.label === 'blade' && b.label === 'torso') {
      contact.setEnabled(false)
    }
    if (a.label === 'torso' && b.label === 'blade') {
      contact.setEnabled(false)
    }
    if (a.label === 'blade' && b.label === 'wall') {
      contact.setEnabled(false)
    }
    if (a.label === 'wall' && b.label === 'blade') {
      contact.setEnabled(false)
    }
    if (a.label === 'star' || b.label === 'star') {
      contact.setEnabled(false)
    }
  }

  beginContact (contact: Contact): void {
    const a = contact.getFixtureA().getUserData() as FixtureData
    const b = contact.getFixtureB().getUserData() as FixtureData
    if (a.label === 'star' && b.label === 'torso' && b.bodyData.label === 'player') {
      this.complete()
    }
    if (b.label === 'star' && a.label === 'torso' && a.bodyData.label === 'player') {
      this.complete()
    }
  }

  addPlayer (posistion: Vec2): Player {
    const player = new Player(this, posistion)
    return player
  }

  addEnemy (enemyDef: EnemyDef): Enemy {
    const enemy = new Enemy(this, enemyDef)
    return enemy
  }

  addStar (position: Vec2): Star {
    const star = new Star(this, position)
    return star
  }

  shuffled (array: any[]): any[] {
    return array
      .map(item => ({ value: item, priority: this.runif() }))
      .sort((a, b) => a.priority - b.priority)
      .map(x => x.value)
  }

  eps (): number {
    return 2 * this.runif() - 1
  }
}

export { Stage }
