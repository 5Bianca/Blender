import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

const joinButton = document.getElementById("join-button");
const welcomePage = document.querySelector(".overlay");
const scenePage = document.querySelector(".scene-container");
const sceneCanvas = document.getElementById("scene-canvas");

joinButton.addEventListener("click", () => {
  welcomePage.style.display = "none";
  scenePage.style.display = "block";

  const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
  const controls = new OrbitControls(camera, renderer.domElement);
  let mesh;

  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.background = new THREE.Color(0xea5e5ff);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x333399, 1.0));
  camera.position.set(10, 8, 10);
  
  const addLight = (color, intensity, position) => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position.x, position.y, position.z);
  scene.add(light);
  return light;
};

addLight(0xffffff, 1, { x: -3, y: 10, z: -10 }).castShadow = true;
addLight(0xffffff, 1, { x: 0, y: 20, z: 0 });

  new GLTFLoader().load(
    "https://rawcdn.githack.com/5Bianca/Blender/e6cfceeb25e30af159e8958c4317aba1a0c6e23c/ground5.glb",
    ({ scene: model }, animations) => {
      model.scale.setScalar(0.4);
      model.position.set(10, -0.5, 0);
      camera.lookAt(model.position);
      controls.target.copy(model.position);
      scene.add(model);
    }
  );

new GLTFLoader().load(
  "https://rawcdn.githack.com/5Bianca/Blender/e6cfceeb25e30af159e8958c4317aba1a0c6e23c/cinema.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(0.08);
    model.position.set(75, -0.5, 0);
    model.rotateY(Math.PI / 2);
    camera.lookAt(model.position);
    controls.target.copy(model.position);
    scene.add(model);
  }
);

new GLTFLoader().load(
  "https://rawcdn.githack.com/5Bianca/Blender/e6cfceeb25e30af159e8958c4317aba1a0c6e23c/HelpBuilding1.glb",
  ({ scene: model }, animations) => {
    model.scale.setScalar(0.4);
    model.position.set(-50, -0.5, 0);
    camera.lookAt(model.position);
    controls.target.copy(model.position);
    scene.add(model);
  }
);

const loadBuilding = (url, position, rotation) => {
  new GLTFLoader().load(url, ({ scene: model }, animations) => {
    model.scale.setScalar(0.);
    model.position.copy(position);
    model.rotation.y = THREE.MathUtils.degToRad(rotation);
    scene.add(model);
  });
};

[
  [new THREE.Vector3(40, 0, -30), 0],
  [new THREE.Vector3(10, 0, -30), 0],
  [new THREE.Vector3(-20, 0, -30), 0],
  [new THREE.Vector3(-20, 0, 30), 180],
  [new THREE.Vector3(10, 0, 30), 180],
  [new THREE.Vector3(40, 0, 30), 180]
].forEach(([position, rotation]) =>
  loadBuilding(
    "https://rawcdn.githack.com/5Bianca/Blender/220629b627f8485b943586b3b51ee49c4bc747cf/bottombuildingspecialty4.glb",
    position,
    rotation
  )
);

[
  [new THREE.Vector3(40, 0, -30), 0],
  [new THREE.Vector3(10, 0, -30), 0],
  [new THREE.Vector3(-20, 0, -30), 0],
  [new THREE.Vector3(-20, 0, 30), 180],
  [new THREE.Vector3(10, 0, 30), 180],
  [new THREE.Vector3(40, 0, 30), 180]
].forEach(([position, rotation]) =>
  loadBuilding(
    "https://rawcdn.githack.com/5Bianca/Blender/220629b627f8485b943586b3b51ee49c4bc747cf/topbuildingspecialty2.glb",
    position,
    rotation
  )
);
  
  
  new GLTFLoader().load("https://rawcdn.githack.com/5Bianca/Blender/e6cfceeb25e30af159e8958c4317aba1a0c6e23c/person.glb", ({ scene: model }, animations) => {
    scene.add(model);
    model.scale.setScalar(1.1);
    model.position.set(12, 0, 0);
    camera.position.set(0, 10, 10);
    camera.lookAt(model.position);
    controls.target.copy(model.position);
    mesh = model;
    scene.add(mesh);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (mesh) mesh.rotation.y = controls.getAzimuthalAngle();
    renderer.render(scene, camera);
  }

  controls.addEventListener("change", () => {
    camera.lookAt(mesh.position);
    controls.target.copy(mesh.position);
  });

  document.addEventListener('keydown', (event) => {
    const speed = 0.5;
    switch (event.key) {
      case 'ArrowUp': mesh.position.z -= speed; break;
      case 'ArrowDown': mesh.position.z += speed; break;
      case 'ArrowLeft': mesh.position.x -= speed; break;
      case 'ArrowRight':mesh.position.x += speed;break;
      case "Escape":
        scenePage.style.display = "none";
        welcomePage.style.display = "block";
        break;
    }
    camera.position.set(mesh.position.x, mesh.position.y + 8, mesh.position.z + 8);
    camera.lookAt(mesh.position);
  });

  animate();
});