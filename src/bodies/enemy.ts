import { Vec2 } from 'planck'
import { Stage } from '../stages/stage'
import { Fighter } from './fighter'

export class Enemy extends Fighter {
  constructor (stage: Stage, posistion: Vec2) {
    super(stage, posistion)
    this.label = 'enemy'
    this.torso.color = 'rgb(0,120,0)'
    this.blade.color = 'rgb(100,256,50)'
  }

  onStep (): void {
    super.onStep()
    if (this.alive) {
      this.move()
    }
  }

  processInput (): void {
    const input = this.stage.game.input
    let x = 0
    let y = 0
    if (input.isKeyDown('KeyW') || input.isKeyDown('ArrowUp')) y += 1
    if (input.isKeyDown('KeyS') || input.isKeyDown('ArrowDown')) y -= 1
    if (input.isKeyDown('KeyA') || input.isKeyDown('ArrowLeft')) x -= 1
    if (input.isKeyDown('KeyD') || input.isKeyDown('ArrowRight')) x += 1
    this.moveDir = Vec2(x, y)
  }

  die (): void {
    super.die()
  }
}
