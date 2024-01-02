import { FighterDef } from './fighterDef'

export interface EnemyDef extends FighterDef {
  swingDistance?: number
  engageDistance?: number
  retreatDistance?: number
}
