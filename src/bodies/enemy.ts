
import { Vec2 } from 'planck'
import { Fighter } from './fighter'
import { Stage } from '../stages/stage'
import { getAngleDifference } from '../math'
import { EnemyDef } from './enemyDef'

export class Enemy extends Fighter {
  swingDistance = 12
  engageDistance = 15
  retreatDistance = 4
  swingTime = 0.0
  swingSign = 1

  constructor (stage: Stage, enemyDef: EnemyDef) {
    super(stage, enemyDef)
    this.label = 'enemy'
    this.torso.color = enemyDef.torsoColor ?? '#00A0A1'
    this.swingDistance = enemyDef.swingDistance ?? this.swingDistance
    this.engageDistance = enemyDef.engageDistance ?? this.engageDistance
    this.retreatDistance = enemyDef.retreatDistance ?? this.retreatDistance
    this.swingSign = Math.random() > 0.5 ? 1 : -1
  }

  onStep (): void {
    super.onStep()
    if (this.alive) {
      this.think()
      this.move()
      this.swing()
    }
  }

  think (): void {
    const player = this.stage.player
    const vecToPlayer = Vec2.sub(player.body.getPosition(), this.body.getPosition())
    const vecFromPlayer = Vec2.mul(vecToPlayer, -1)
    const distanceToPlayer = vecToPlayer.length()
    const angleToPlayer = Math.atan2(vecToPlayer.y, vecToPlayer.x)
    const angleFromPlayer = Math.atan2(vecFromPlayer.y, vecFromPlayer.x)
    const angleDifferance = getAngleDifference(this.body.getAngle(), angleToPlayer)
    const playerAngleDifferance = getAngleDifference(player.body.getAngle(), angleFromPlayer)
    const futurePosition = Vec2.add(this.body.getPosition(), Vec2.mul(this.body.getLinearVelocity(), this.swingTime))
    const futurePlayerPosition = Vec2.add(player.body.getPosition(), Vec2.mul(player.body.getLinearVelocity(), this.swingTime))
    const futureDistance = Vec2.sub(futurePosition, futurePlayerPosition).length()
    if (futureDistance < this.swingDistance) {
      const absAngleDiff = Math.abs(angleDifferance)
      if (absAngleDiff < 0.1 * Math.PI) {
        this.targetAngle = this.body.getAngle() + 2 * absAngleDiff * Math.PI * Math.sign(angleDifferance)
      } else {
        this.targetAngle = this.body.getAngle() + 0.5 * Math.PI * Math.sign(angleDifferance)
      }
    } else {
      this.targetAngle = angleToPlayer + 0.25 * Math.PI * this.swingSign
    }
    if (!player.alive) this.retreatDistance = 7
    const extraRetreatDistance = Math.abs(angleDifferance) > Math.abs(playerAngleDifferance) + 0.01 ? 3 : 0
    const currentRetreatDistance = this.retreatDistance + extraRetreatDistance
    if (distanceToPlayer < this.engageDistance) {
      if (distanceToPlayer < currentRetreatDistance) {
        this.moveDir = Vec2.mul(vecToPlayer, -1)
      } else {
        this.moveDir = vecToPlayer
      }
    } else {
      this.moveDir = Vec2(vecToPlayer.x, 0)
    }
    if (this.stage.enemies.length > 1) {
      const closest = this.getClosestEnemy()
      const vecFromEnemy = Vec2.sub(this.body.getPosition(), closest.body.getPosition())
      const distance = vecFromEnemy.length()
      if (distance < 7) {
        this.moveDir = vecFromEnemy
      }
    }
    if (this.stage.avoidPoints.length > 1) {
      const closestPoint = this.getClosestPoint(this.stage.avoidPoints)
      const vecFromPoint = Vec2.sub(this.body.getPosition(), closestPoint)
      const distance = vecFromPoint.length()
      if (distance < 10) {
        this.moveDir = vecFromPoint
      }
    }
  }

  getClosestEnemy (): Enemy {
    const otherEnemies = this.stage.enemies.filter(enemy => {
      return enemy !== this
    })
    let closestEnemy = otherEnemies[0]
    let minDistance = Vec2.sub(closestEnemy.body.getPosition(), this.body.getPosition()).length()
    otherEnemies.forEach(enemy => {
      const distance = Vec2.sub(enemy.body.getPosition(), this.body.getPosition()).length()
      if (distance < minDistance) {
        closestEnemy = enemy
        minDistance = distance
      }
    })
    return closestEnemy
  }

  getClosestPoint (points: Vec2[]): Vec2 {
    let closestPoint = Vec2(0, 0)
    let minDistance = Infinity
    points.forEach(point => {
      const distance = Vec2.sub(point, this.body.getPosition()).length()
      if (distance < minDistance) {
        closestPoint = point
        minDistance = distance
      }
    })
    return closestPoint
  }
}
