import * as THREE from 'three'

const axesHelper = new THREE.AxesHelper(0.5)
const scene = new THREE.Scene()
scene.add(axesHelper)

const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xFF0F0F,
  // wireframe: true 
})
const mesh = new THREE.Mesh(box, material)

// change the position of the object
mesh.position.x = 0.7
mesh.position.y = 0.7
mesh.position.z = -0.7
// mesh.position.set(1, 1, -0.5)

// change the size of the object
// mesh.scale.x = 2
// mesh.scale.y = 2
// mesh.scale.z = 2
// mesh.scale.set(2, 2, 2)

// rotate the object, pi rotate half axis
// const pi = Math.PI
// mesh.rotation.reorder('YXZ') // set order of rotation, first Y then X then Z
// mesh.rotation.x = pi / 2
// mesh.rotation.y = pi / 2
// mesh.rotation.z = pi / 2
// mesh.rotation.set(pi /2, pi /2, pi /2)

// it set the position to (1, 1,1)
// mesh.position.normalize() 

scene.add(mesh)

const size = {
  height: 600,
  width: 600,
}
const camera = new THREE.PerspectiveCamera(50, size.width / size.height)
camera.position.z = 3
camera.lookAt(mesh.position) // lock the camera to the mesh
scene.add(camera)

const distanceFromOriginToObject = mesh.position.length()
const cameraPosition = camera.position
const distanceFromAnythingToObject = mesh.position.distanceTo(cameraPosition)
console.log(`
  Distance From Origin To Object: ${distanceFromOriginToObject}\n
  Distance From Camera To Object: ${distanceFromAnythingToObject}
  `)

const canvas = document.getElementById("webgl")

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Canvas element with id "webgl" not found or is not a canvas')
}

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(size.width, size.height)
renderer.render(scene, camera)