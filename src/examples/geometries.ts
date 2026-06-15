import * as THREE from 'three'

const canvas = document.getElementById('webgl')
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('webgl not found')

const scene = new THREE.Scene()

const positionArrary = new Float32Array([
  0, 0, 0,
  0, 1, 0,
  1, 0, 0
])

const positionAtribute = new THREE.BufferAttribute(positionArrary, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAtribute)

// create a mesh from the BufferGeometry so it can be added to the scene
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)

const size = { width: window.innerWidth, height: window.innerHeight }

const camera = new THREE.PerspectiveCamera(35, size.width / size.height, 1, 100)
camera.position.set(0, 0, 2)

scene.add(mesh, camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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

function animate() {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
