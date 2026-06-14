import * as Three from 'three'

const scene = new Three.Scene
const axesHelper = new Three.AxesHelper()

scene.add(axesHelper)

const redBox = new Three.Mesh(
  new Three.BoxGeometry(0.5, 0.5, 0.5),
  new Three.MeshBasicMaterial({
    color: 0xAA0A0A,
    wireframe: true
  })
)
const greenBox = new Three.Mesh(
  new Three.BoxGeometry(0.5, 0.5, 0.5),
  new Three.MeshBasicMaterial({
    color: 0x0AAA0A,
    wireframe: true
  })
)
const blueBox = new Three.Mesh(
  new Three.BoxGeometry(0.5, 0.5, 0.5),
  new Three.MeshBasicMaterial({
    color: 0x0A0AAA,
    wireframe: true
  })
)
greenBox.position.z = -0.5
redBox.position.x = -0.25
blueBox.position.x = 0.25



const group = new Three.Group()
group.add(redBox, greenBox, blueBox)

group.rotation.x = Math.PI / 2

scene.add(group)

const size = {
  width: 800,
  height: 600
}

const camera = new Three.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 2
scene.add(camera)

const canvas = document.getElementById('webgl')
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Canvas element with id "webgl" not found or is not a canvas')

const renderer = new Three.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(size.width, size.height)

// let time = Date.now()
const timer = new Three.Timer()
timer.connect(document)

function animate() {
  // let timeFrame: = Date.now()
  // let deltaTime = timeFrame - time
  timer.update()
  let deltaTime: number = timer.getDelta()
  let elapsTime: number = timer.getElapsed()

  // console.log(`Delta: ${deltaTime}`)
  // console.log(`Elapsed: ${elapsTime}`)
  group.rotation.x += 0.1 * deltaTime
  greenBox.rotation.z += 1 * deltaTime

  // time = timeFrame
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()