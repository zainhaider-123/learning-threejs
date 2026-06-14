import {
  Mesh,
  Scene,
  AxesHelper,
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  Object3D
} from 'three'

const title = document.getElementById('content')
if (!(title instanceof HTMLElement)) throw new Error('no element with id title exist')

const h1 = document.createElement('h1')
h1.textContent = "Controls"

const p = document.createElement('p')
p.textContent = "Use WASD to move - C to center"

title.appendChild(h1)
title.appendChild(p)

const scene = new Scene
const axesHelper = new AxesHelper()

scene.add(axesHelper)

const mesh = new Mesh(
  new BoxGeometry(0.5, 0.5, 0.5),
  new MeshBasicMaterial({
    color: 0x0AAA0A,
    wireframe: true
  })
)

scene.add(mesh)

const size = {
  width: 800,
  height: 600
}

const camera = new PerspectiveCamera(75, size.width / size.height)
camera.position.z = 2
scene.add(camera)

const canvas = document.getElementById('webgl')
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Canvas element with id "webgl" not found or is not a canvas')

const renderer = new WebGLRenderer({
  canvas: canvas
})

renderer.setSize(size.width, size.height)


/*
// My version
const keys = new Map<string, () => void>()

function positionControls<T extends Object3D>(
{ object, key, axis, factor = 0.0001 }:
  {
    object: T,
    key: string,
    axis: "X" | "Y" | "Z",
    factor?: number
  }
) {
const handler = (e: KeyboardEvent) => {
  if (e.key === key) {
    const a = axis.toLowerCase() as "x" | "y" | "z"
    object.position[a] += factor
  }
  else if (e.key === 'c') {
    object.position.set(0, 0, 0)
  }
}
document.addEventListener('keydown', handler)
keys.set(key, () => document.removeEventListener("keydown", handler))
}

function animate() {
camera.lookAt(mesh.position)

positionControls({ object: mesh, key: "w", axis: "Y" })
positionControls({ object: mesh, key: "a", axis: "X", factor: -0.0001 })
positionControls({ object: mesh, key: "s", axis: "Y", factor: -0.0001 })
positionControls({ object: mesh, key: "d", axis: "X" })

renderer.render(scene, camera)
requestAnimationFrame(animate)
}

animate()
*/


// AI Provided
const keys = new Set<string>()

document.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase())
})

document.addEventListener("keyup", (e) => {
  keys.delete(e.key.toLowerCase())
})

function animate() {
  const speed = 0.02

  if (keys.has("w")) mesh.position.y += speed
  if (keys.has("s")) mesh.position.y -= speed
  if (keys.has("a")) mesh.position.x -= speed
  if (keys.has("d")) mesh.position.x += speed

  if (keys.has("c")) mesh.position.set(0, 0, 0)

  camera.lookAt(mesh.position)

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()