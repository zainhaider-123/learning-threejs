import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvas = document.getElementById('webgl')
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('webgl not found')

const body = document.querySelector('body')
if (!(body instanceof HTMLBodyElement)) throw new Error('body tag not found')
body.style.overflow = "hidden"

const scene = new THREE.Scene()

const object = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({
    color: 0xFAFAFA,
    wireframe: true
  })
)

const size = { width: window.innerWidth, height: window.innerHeight }


// PERSPECTIVE CAMERA - options: angle, aspect ratio, near, far
const camera = new THREE.PerspectiveCamera(35, size.width / size.height, 1, 100)

// Orthographic Camera - options: left, right, top, bottom
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1)

camera.position.set(0, 0, 2)

scene.add(object, camera)

const cursor = { x: 0, y: 0 }

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const timer = new THREE.Timer()
timer.connect(document)

window.addEventListener('resize', () => {
  size.width = window.innerWidth,
    size.height = window.innerHeight,

    camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'f') {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch(err => {
        console.error('Failed to enter fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }
});

// camera.lookAt(object.position)

const orbitControls = new OrbitControls(
  camera,
  canvas
)

orbitControls.enableDamping = true

object.rotation.reorder('YXZ')

function animate() {
  const delta = timer.getDelta()
  timer.update()

  // window.addEventListener('mousemove', (e) => {
  //   cursor.x = (e.clientX / size.width) - 0.5
  //   cursor.y = (e.clientY / size.height) - 0.5

  //   object.rotation.x = cursor.y * 2
  //   object.rotation.y = cursor.x * 2

  //   camera.rotation.x = cursor.y * 1.5
  //   camera.rotation.y = cursor.x * 1.5

  // })

  orbitControls.update()

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
