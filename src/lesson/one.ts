import * as THREE from 'three'

const scene = new THREE.Scene()

const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xFF0F0F,
  // wireframe: true 
})
const mesh = new THREE.Mesh(box, material)

scene.add(mesh)

const cameraSizes = {
  height: 300,
  width: 400,
}
const camera = new THREE.PerspectiveCamera(50, cameraSizes.width / cameraSizes.height)
camera.position.z = 3
scene.add(camera)

const canvas = document.getElementById("webgl")

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Canvas element with id "webgl" not found or is not a canvas')
}

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(cameraSizes.width, cameraSizes.height)
renderer.render(scene, camera)