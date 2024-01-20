import { World, Vec2, Contact } from 'planck'
import { FixtureData } from '../feature'
import { Environment } from '../actors/environment'
import { Game } from '../game'
import { Star } from '../actors/star'
import { Fighter } from '../actors/fighter'
import { Runner } from '../runner'

class Stage {
  game: Game
  runner: Runner
  world: World
  player?: Fighter
  environment: Environment
  paused = false
  corners: Vec2[] = []
  enemies: Fighter[] = []
  spawnPoint = Vec2(0, 0)
  north = 100

  constructor (game: Game) {
    this.game = game
    this.runner = game.runner
    this.world = new World({ gravity: new Vec2(0, 0) })
    this.world.on('pre-solve', (contact) => this.preSolve(contact))
    this.world.on('begin-contact', (contact) => this.beginContact(contact))
    this.environment = new Environment(this)
  }

  onStep (): void {
    if (this.player != null) {
      const input = this.game.input
      let x = 0
      let y = 0
      if (input.isKeyDown('KeyW') || input.isKeyDown('ArrowUp')) y += 1
      if (input.isKeyDown('KeyS') || input.isKeyDown('ArrowDown')) y -= 1
      if (input.isKeyDown('KeyA') || input.isKeyDown('ArrowLeft')) x -= 1
      if (input.isKeyDown('KeyD') || input.isKeyDown('ArrowRight')) x += 1
      this.player.moveDir = Vec2(x, y)
      const cursor = input.cursor
      // const canvas = this.game.runner.context.canvas
      // const vmin = Math.min(canvas.width, canvas.height)
      // const cursorDist = Math.sqrt(cursor.x * cursor.x + cursor.y * cursor.y) / vmin
      if (cursor.buttons[0]) this.player.moveDir = Vec2(cursor.x, cursor.y)
    }
  }

  respawn (): void {
    console.log('respawn')
  }

  onComplete (): void {
    console.log('stage complete')
  }

  beginNextStage (): void {
    console.log('begin next stage')
  }

  preSolve (contact: Contact): void {
    const a = contact.getFixtureA().getUserData() as FixtureData
    const b = contact.getFixtureB().getUserData() as FixtureData
    const featureLabels = [a.label, b.label]
    const actorLabels = [a.actor.label, b.actor.label]
    if (featureLabels.includes('blade') && featureLabels.includes('torso')) {
      contact.setEnabled(false)
    }
    /*
    if (featureLabels.includes('blade') && featureLabels.includes('wall')) {
      contact.setEnabled(false)
    }
    */
    if (featureLabels.includes('star') && featureLabels.includes('blade')) {
      contact.setEnabled(false)
    }
    if (featureLabels.includes('star') && featureLabels.includes('torso')) {
      contact.setEnabled(false)
      if (actorLabels.includes('player')) this.onComplete()
    }
  }

  beginContact (contact: Contact): void {
    const a = contact.getFixtureA().getUserData() as FixtureData
    const b = contact.getFixtureB().getUserData() as FixtureData
    const featureLabels = [a.label, b.label]
    const actorLabels = [a.actor.label, b.actor.label]
    if (featureLabels.includes('star') && featureLabels.includes('torso')) {
      if (actorLabels.includes('player')) this.onComplete()
    }
  }

  addPlayer (posistion: Vec2): Fighter {
    this.player = new Fighter(this, posistion)
    this.player.label = 'player'
    this.player.torso.color = 'rgb(0,40,300)'
    this.player.blade.color = 'rgb(0,200,200)'
    return this.player
  }

  addEnemy (posistion: Vec2): Fighter {
    const enemy = new Fighter(this, posistion)
    enemy.label = 'enemy'
    enemy.torso.color = 'rgb(0,120,0)'
    enemy.blade.color = 'rgb(100,256,50)'
    this.enemies.push(enemy)
    return enemy
  }

  addStar (position: Vec2): Star {
    const star = new Star(this, position)
    return star
  }

  shuffled (array: any[]): any[] {
    return array
      .map(item => ({ value: item, priority: Math.random() }))
      .sort((a, b) => a.priority - b.priority)
      .map(x => x.value)
  }

  eps (): number {
    return 2 * Math.random() - 1
  }
}

export { Stage }
