import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
let mesh;

renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xeA5E5FF);
scene.add(new THREE.HemisphereLight(0xffffff, 0x333399, 1.0));
camera.position.set(0.5, 8, 30);

const addLight = (color, intensity, position) => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position.x, position.y, position.z);
  scene.add(light);
  return light;
}

addLight(0xffffff, 1, { x: -3, y: 10, z: -10 }).castShadow = true;
addLight(0xffffff, 1, { x: 0, y: 20, z: 0 });

const loadBuilding = (url, position, rotation, ) => {
  new GLTFLoader().load(url, ({ scene: model }, animations) => {
    model.scale.setScalar(1.0);
    camera.lookAt(model.position);
    controls.target.copy(model.position);
    model.position.copy(position);
    model.rotation.y = THREE.Math.degToRad(rotation);
    scene.add(model);

  });
};
new GLTFLoader().load("https://raw.githack.com/5Bianca/Blender/main/ground.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(0.4);
    model.position.set(10, -0.5, 0);
    camera.lookAt(model.position);
    controls.target.copy(model.position);
    scene.add(model);
   
  }
);

[
  [new THREE.Vector3(40, 0, -30), 0],
  [new THREE.Vector3(10, 0, -30), 0],
  [new THREE.Vector3(-20, 0, -30), 0],
  [new THREE.Vector3(-20, 0, 30), 180],
  [new THREE.Vector3(10, 0, 30), 180],
  [new THREE.Vector3(40, 0, 30), 180]
].forEach(([position, rotation]) => loadBuilding("https://raw.githack.com/5Bianca/Blender/main/Building1.glb", position, rotation));



new GLTFLoader().load("https://raw.githack.com/5Bianca/Blender/main/person.glb",
  ({ scene: model }, animations) => {
    scene.add(model);

    model.scale.setScalar(1.1);
    model.position.x = 13;
    model.position.y = -0.5;
    model.position.z = 0;

    camera.lookAt(model.position);

    controls.target.copy(model.position);

    mesh = model;
  }
);


document.addEventListener('keydown', (event) => {
  const speed = 0.5;
  switch (event.key) {
    case 'ArrowUp': mesh.position.z -= speed; break;
    case 'ArrowDown':  mesh.position.z += speed; break;
    case 'ArrowLeft': mesh.position.x -= speed; break;
    case 'ArrowRight':mesh.position.x += speed;break;
  }
});

const animate = () => {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
};


animate();
document.body.appendChild(renderer.domElement);
