import THREELIB from 'three-js';
import { UzumakiShader } from './shaders/uzumaki_shader';

const THREE = THREELIB(['EffectComposer', 'ShaderPass', 'CopyShader', 'RenderPass', 'MaskPass']);
const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  // EffectComposer,
  RenderPass,
  Group,
  TextureLoader,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  EffectComposer,
  ShaderPass,
} = THREE;
// import TWEEN from '@tweenjs/tween.js';

const uzumakiShader = new UzumakiShader();

const el = document.getElementById('stage');

const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);

camera.position.z = 10;

const renderer = new WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
el.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const shaderPass = new ShaderPass(uzumakiShader);
composer.addPass(shaderPass);
shaderPass.renderToScreen = true;
shaderPass.enabled = true;

function createImagePlane() {
  return new Promise((resolve) => {
    const group = new Group();
    const loader = new TextureLoader();
    loader.load('/assets/images/flower_1024x1024.jpg', (texture) => {
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // eslint-disable-line

      const geometry = new PlaneBufferGeometry(10, 10);
      const material = new MeshBasicMaterial({
        map: texture,
        side: DoubleSide,
      });
      const mesh = new Mesh(geometry, material);
      group.add(mesh);
      group.visible = true;
      resolve(group);
    });
  });
}

createImagePlane()
  .then((imagePlane) => {
    scene.add(imagePlane);
  });

function render() {
  // renderer.render(scene, camera);
  // camera.position.z -= 0.1;
  shaderPass.uniforms.time.value += 0.01;
  composer.render();
  requestAnimationFrame(render);
}

render();
