import { CircleShape, Fixture, PolygonShape, Vec2, Body, ChainShape } from 'planck'
import { tile } from './patterns/tile'
import { FixtureData } from './fixtures/fixtureData'
import { BodyData } from './bodies/bodyData'
import { clamp } from './math'
import { Game } from './game'

class Runner {
  game: Game
  context: CanvasRenderingContext2D
  paused = true
  timeStep = 1 / 60
  timeScale = 1
  lastFrameTime = 0
  worldTime = 0
  targetWorldTime = 0
  minZoom = -15
  maxZoom = 5
  camera = {
    position: new Vec2(0, 0),
    zoom: -15
  }

  constructor (game: Game) {
    this.game = game
    this.context = this.game.context
    window.addEventListener('wheel', (event) => this.onwheel(event))
  }

  onwheel (event: WheelEvent): void {
    const zoom = this.camera.zoom - 0.005 * event.deltaY
    this.camera.zoom = clamp(this.minZoom, this.maxZoom, zoom)
  }

  start (): void {
    this.paused = false
    this.lastFrameTime = performance.now()
    this.draw(this.lastFrameTime)
  }

  pause (): void {
    this.paused = true
  }

  draw (newFrameTime: number): void {
    if (this.paused) return
    const dt = Math.min(0.2, (newFrameTime - this.lastFrameTime) / 1000)
    this.lastFrameTime = newFrameTime
    this.targetWorldTime += dt
    while (this.worldTime + this.timeStep < this.targetWorldTime) {
      this.step()
    }
    this.render()
    window.requestAnimationFrame(t => this.draw(t))
  }

  step (): void {
    this.camera.position = this.game.stage.player.body.getPosition()
    this.game.stage.onStep()
    const bodies = this.getBodies()
    bodies.forEach(body => {
      const bodyData = body.getUserData() as BodyData
      bodyData.onStep()
    })
    const stepSize = this.game.stage.player.alive ? this.timeStep * this.timeScale : this.timeStep * this.timeScale
    this.game.stage.world.step(stepSize)
    this.worldTime += this.timeStep
  }

  render (): void {
    this.setupCanvas()
    this.drawBackground()
    const context = this.context
    const fixtures = this.getFixtures()
    fixtures.forEach(fixture => {
      this.followCamera()
      const fixtureData = fixture.getUserData() as FixtureData
      fixtureData.preDraw()
      const body = fixture.getBody()
      const bodyPosition = body.getPosition()
      context.translate(bodyPosition.x, bodyPosition.y)
      context.rotate(body.getAngle())
      if (fixtureData.drawShape) {
        context.fillStyle = fixtureData.color
        const shape = fixture.getShape()
        if (shape instanceof PolygonShape) {
          this.drawPolygon(shape.m_vertices)
        }
        if (shape instanceof ChainShape) {
          this.drawPolygon(shape.m_vertices)
        }
        if (shape instanceof CircleShape) {
          this.drawCircle(shape.getCenter(), shape.m_radius)
        }
      }
      this.followCamera()
      fixtureData.postDraw()
    })
  }

  drawPolygon (vertices: Vec2[]): void {
    const context = this.context
    context.beginPath()
    vertices.forEach((vertex, i) => {
      const x = vertex.x
      const y = vertex.y
      if (i === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    context.closePath()
    context.fill()
  }

  drawCircle (center: Vec2, radius: number): void {
    const context = this.context
    context.beginPath()
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    context.fill()
  }

  getBodies (): Body[] {
    const bodies = []
    for (let body = this.game.stage.world.getBodyList(); body != null; body = body.getNext()) {
      bodies.push(body)
    }
    return bodies
  }

  getFixtures (): Fixture[] {
    const fixtures = []
    for (let body = this.game.stage.world.getBodyList(); body != null; body = body.getNext()) {
      for (let fixture = body.getFixtureList(); fixture != null; fixture = fixture.getNext()) {
        fixtures.push(fixture)
      }
    }
    fixtures.sort((a, b) => {
      const aLayer = (a.getUserData() as FixtureData).layer
      const bLayer = (b.getUserData() as FixtureData).layer
      return aLayer - bLayer
    })
    return fixtures
  }

  setupCanvas (): void {
    const context = this.context
    const canvas = context.canvas
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.followCamera()
  }

  followCamera (): void {
    const context = this.context
    const canvas = context.canvas
    context.resetTransform()
    context.translate(0.5 * canvas.width, 0.5 * canvas.height)
    const vmin = Math.min(canvas.width, canvas.height)
    context.scale(0.1 * vmin, -0.1 * vmin)
    const cameraScale = Math.exp(0.1 * this.camera.zoom)
    context.scale(cameraScale, cameraScale)
    context.translate(-this.camera.position.x, -this.camera.position.y)
  }

  drawBackground (): void {
    const context = this.context
    context.imageSmoothingEnabled = false
    context.fillStyle = tile
    context.save()
    context.scale(5, 5)
    context.beginPath()
    this.game.stage.corners.forEach((corner: Vec2, i: number) => {
      if (i === 0) context.moveTo(corner.x, corner.y)
      else context.lineTo(corner.x, corner.y)
    })
    context.closePath()
    context.fill()
    context.restore()
  }
}

export { Runner }
