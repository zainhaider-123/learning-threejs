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

redBox.position.x = -1
blueBox.position.x = 1

const group = new Three.Group()
group.add(redBox, greenBox, blueBox)

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

function animate() {
  group.rotation.x += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()