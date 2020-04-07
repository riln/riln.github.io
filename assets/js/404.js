import * as THREE from './node_modules/three/build/three.module.js';
import { EffectComposer } from './node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './node_modules/three/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from './node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { ShaderPass } from './node_modules/three/examples/jsm/postprocessing/ShaderPass.js';
// import { FXAAShader } from './node_modules/three/examples/jsm/shaders/FXAAShader.js';
import { FilmPass } from './node_modules/three/examples/jsm/postprocessing/FilmPass.js';


let height = $(window).height();
let width = $(window).width();
let speed = 1440;
const heightSegments = 40;
const widthSegments = 120;
const quality = 0;

const earthAxialTilt = .40905;
const atmosphereHeight = 100000;
const earthRadius = 6371000;

const moonRadius = 1737000;
// const moonOrbitalRadius = 384109000 / 45;
const moonOrbitalRadius = 384109000;
const moonOrbitalPeriod = 2360591.5;
const librationPeriod = 440000; // `anomalisticMonth = 2380713.065`
const librationAmplitude = 0.04389 * Math.PI;
// const moonInclination = .014291667 * Math.PI;
// const moonAxialTilt = 0;

const cameraDistance = earthRadius + 42500000;

const astronomicalUnit = 149597870700;
const siderealDay = 86164.090530833;
const solarDay = 86400;
const sunRadius = 696342000;
const meanCalendarYear = 365.2425;
let sunRotationSpeed = 2 * Math.PI * speed / (solarDay * meanCalendarYear);

const cloudsMovementSpeed = .24;
const cloudsMovementAmplitude = .0096;
const cloudsHeight = atmosphereHeight * .3;

let time = 0;

let found = false;

let angularDisplacements = {
  camera: {
    polar: Math.PI / 2,
    azimuthal: Math.PI / 2
  },
  earth: 1.994814213 * Math.PI,
  moon: {
    orbital: 1.002515895061111 * Math.PI,
    rotation: -Math.PI / 2
  },
  sun: 1.504156944 * Math.PI,
  celestialSphere: 0
};


let locationSetTime = 0;

window.setLocation = setLocation;

function setLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCameraLocation);
  }
}

function setCameraLocation(location) {
  locationSetTime = Date.now() / 1000;
  angularDisplacements.camera = {
    polar: 2 * Math.PI * (90 - location.coords.latitude) / 360,
    azimuthal: Math.PI / 2 + 2 * Math.PI * location.coords.longitude / 360
  };
  found = true;
  camera.rotation.z = 0;
  speed = 1;
  sunRotationSpeed = 2 * Math.PI / (solarDay * meanCalendarYear);
}

function loadTexture(path, quality) {
  let pathParts = path.split('.');
  pathParts = [pathParts.slice(0, -1).join(''), pathParts[pathParts.length - 1]];
  const qualityPart = isNaN(quality) ? '' : `-${Math.pow(2, quality)}k`;
  return new THREE.TextureLoader().load(`/assets/images/${pathParts[0]}${qualityPart}.${pathParts[1]}`);
}


let renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  physicallyCorrectLights: true
});
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0);
const container = document.getElementById('earth');
container.appendChild(renderer.domElement);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(45, width / height, 1, astronomicalUnit + sunRadius * 2);
scene.add(camera);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), .5, .008, .95));
// composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), .25, .001, .2));

// const filmPass = new FilmPass(.04, 0, 0, 0);
// filmPass.renderToScreen = true;
// composer.addPass(filmPass);

// let fxaaPass = new ShaderPass(FXAAShader);
// let pixelRatio = renderer.getPixelRatio();
// fxaaPass.material.uniforms['resolution'].value.x = 1 / ( container.offsetWidth * pixelRatio );
// fxaaPass.material.uniforms['resolution'].value.y = 1 / ( container.offsetHeight * pixelRatio );
// composer.addPass(fxaaPass);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  height = $(window).height();
  width = $(window).width();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  // pixelRatio = renderer.getPixelRatio();
  // fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio );
  // fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio );
  renderer.setSize(width, height);
  composer.setSize(width, height);
}


scene.add(new THREE.AmbientLight(0x04040b));
// scene.add(new THREE.AmbientLight(0x808080));


const moonMap = loadTexture('moon/surface/moon-surface.jpg');
const moonBumpMap = loadTexture('moon/bump/moon-bump.png');
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonMap,
  bumpMap: moonBumpMap,
  bumpScale: 23200,
  roughness: 183
});
let moon = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, widthSegments, heightSegments), moonMaterial);
moon.position.z = moonOrbitalRadius / 50;
scene.add(moon);


let sunLight = new THREE.PointLight(0xcfccb9);
scene.add(sunLight);

let sun = new THREE.Mesh(new THREE.SphereGeometry(sunRadius, widthSegments, heightSegments),
    new THREE.MeshBasicMaterial({ color: 0xfffffb }));
scene.add(sun);


const earthMap = loadTexture('earth/surface/earth-surface.jpg', quality);
const earthDisplacementMap = loadTexture('earth/displacement/earth-displacement.png', quality);
const earthNormalMap = loadTexture('earth/normal/earth-normal.png', quality);
const earthSpecularMap = loadTexture('earth/specular/earth-specular.png', quality);
const earthEmissiveMap = loadTexture('earth/emissive/earth-emissive.png', quality);
const earthMaterial = new THREE.MeshPhysicalMaterial({
  map: earthMap,
  displacementMap: earthDisplacementMap,
  displacementScale: 20000,
  normalMap: earthNormalMap,
  roughnessMap: earthSpecularMap,
  roughness: .5,
  clearcoatRoughness: .5,
  clearcoat: 1,
  emissiveMap: earthEmissiveMap,
  emissive: 0xecc497,
  emissiveIntensity: .5
});
let earth = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, widthSegments, heightSegments), earthMaterial);
scene.add(earth);


const cloudsMap = loadTexture('earth/clouds/earth-clouds.png', quality);
const cloudsBumpMap = loadTexture('earth-clouds-bump.png');
const cloudsMaterial = new THREE.MeshPhongMaterial({
  transparent: true,
  map: cloudsMap,
  specular: 0xffffff,
  color: 0xfff7ef,
  emissive: 0x010101,
  shininess: 10,
  normalMap: cloudsBumpMap,
  normalScale: new THREE.Vector2(.4, .4),
  depthTest: false
});
let clouds = new THREE.Mesh(new THREE.SphereGeometry(earthRadius + cloudsHeight, widthSegments, heightSegments), cloudsMaterial);
// clouds.rotation.y = Math.PI * 1.7;
earth.add(clouds);


const earthAtmosphereMaterial = new THREE.SpriteMaterial({
  color: 0x51b4ff,
  map: new THREE.TextureLoader().load( '/assets/images/glow.png' ),
  opacity: .02
});
let earthAtmosphere = new THREE.Sprite(earthAtmosphereMaterial);
const atmosphereScale = earthRadius * 2 + atmosphereHeight * 12.8;
earthAtmosphere.scale.set(atmosphereScale, atmosphereScale, 0);
// earth.add(earthAtmosphere);


// let coord = new THREE.Mesh(
//   new THREE.SphereGeometry(earthRadius + 3000000, 8, 6),
//   new THREE.MeshBasicMaterial({
//     color: 0xffffff,
//     wireframe: true,
//     // depthTest: false
// }));
// coord.rotation.y = 0.523598767;
// earth.add(coord);


function update() {
  time = Date.now() / 1000;

  earth.rotation.y = 2 * Math.PI * time * speed / siderealDay + angularDisplacements.earth;

  const moonRotationSpeed = 2 * Math.PI * speed / moonOrbitalPeriod;
  moon.position.x = moonOrbitalRadius * Math.sin(moonRotationSpeed * time + angularDisplacements.moon.orbital);
  moon.position.y = moon.position.x * Math.sin(earthAxialTilt);
  moon.position.z = moonOrbitalRadius * Math.cos(moonRotationSpeed * time + angularDisplacements.moon.orbital);
  moon.rotation.y = moonRotationSpeed * time + angularDisplacements.moon.rotation + librationAmplitude * Math.sin(time * speed / librationPeriod) / 2;

  clouds.rotation.x = clouds.rotation.y = Math.sin(time * cloudsMovementSpeed) * cloudsMovementAmplitude;
  clouds.rotation.z = Math.cos(time * cloudsMovementSpeed) * cloudsMovementAmplitude;

  sunLight.position.x = sun.position.x = astronomicalUnit * Math.sin(sunRotationSpeed * time + angularDisplacements.sun);
  sunLight.position.y = sun.position.y = sun.position.x * Math.sin(earthAxialTilt);
  sunLight.position.z = sun.position.z = astronomicalUnit * Math.cos(sunRotationSpeed * time + angularDisplacements.sun);

  if (found) {
    const cameraRotationSpeed = 2 * Math.PI * speed / siderealDay;
    const cameraPolarAngle = angularDisplacements.camera.polar;
    const cameraAzimuthalAngle = cameraRotationSpeed * time + angularDisplacements.camera.azimuthal + angularDisplacements.earth;
    camera.position.x = cameraDistance * Math.sin(cameraPolarAngle) * Math.sin(cameraAzimuthalAngle);
    camera.position.y = cameraDistance * Math.cos(cameraPolarAngle);
    camera.position.z = cameraDistance * Math.sin(cameraPolarAngle) * Math.cos(cameraAzimuthalAngle);
    camera.lookAt(0, 0, 0);
  } else {
    camera.position.x = cameraDistance * Math.sin(sunRotationSpeed * time + angularDisplacements.sun - Math.PI / 3);
    camera.position.z = cameraDistance * Math.cos(sunRotationSpeed * time + angularDisplacements.sun - Math.PI / 3);
    camera.lookAt(0, 0, 0);
    if (camera.position.z >= 0) {
      camera.rotation.z = earthAxialTilt;
    } else {
      camera.rotation.z = earthAxialTilt + Math.PI;
    }
  }
  camera.updateProjectionMatrix();
}

function render() {
  requestAnimationFrame(render);
  // renderer.render(scene, camera);
  composer.render();
  update();
}

render();
