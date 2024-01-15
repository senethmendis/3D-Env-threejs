import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

const preLoader = new THREE.LoadingManager();
preLoader.onStart = () => {
  console.log("Start");
};
preLoader.onLoad = () => {
  console.log("Loading");
};
preLoader.onProgress = () => {
  console.log("Start");
};
preLoader.onError = () => {
  console.log("Errot !!!");
};

//textures
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("/texture/color.jpg");
const matcapTexture = textureLoader.load("/texture/mat2.png");
const bump = textureLoader.load("/texture/bump.jpg");
const displacement = textureLoader.load("/texture/displacementMap.jpg");

//cude tex
const cudeTextureLoad = new THREE.CubeTextureLoader();

const evnTexture = cudeTextureLoad.load([
  "/texture/env/px.png",
  "/texture/env/nx.png",
  "/texture/env/py.png",
  "/texture/env/ny.png",
  "/texture/env/pz.png",
  "/texture/env/nz.png",
]);

scene.background = evnTexture;
//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial();

// material.map = colorTexture;
// material.bumpMap = bump;
// material.displacementMap = displacement;
// material.shininess = 200;
// material.specular = new THREE.Color("green");
// material.matcap = matcapTexture;
// material.color = new THREE.Color("red");
// material.transparent = true;
// material.opacity = 0.1;
// material.side = THREE.DoubleSide;
// material.visible = false;
material.metalness = 0.9;
material.roughness = 0;
material.envMap = evnTexture;

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
