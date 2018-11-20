export const VERTEX_SHADER = `
precision mediump float;
varying vec2 vUv;
 
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float time;

void main() {
  const float shakeLength = 0.02;
  const float shakeWidth = 0.005;
  const float speed = 2.0;
  
  float offsetX = sin(gl_FragCoord.x * shakeLength + time * speed) * shakeWidth;
  float offsetY = cos(gl_FragCoord.y * shakeLength + time * speed) * shakeWidth;

  vec4 texel = texture2D( tDiffuse, vec2(vUv.x + offsetX , vUv.y + offsetY));
  gl_FragColor = texel;
}
`;

/**
 * @author Nozomi Nohara / http://github.com/ics-nohara
 * Uzumaki
 */
export class UzumakiShader {
  constructor() {
    this.uniforms = {
      tDiffuse: { type: 't', value: null },
      time: { type: 'f', value: 0.0 },
    };
    this.vertexShader = VERTEX_SHADER;
    this.fragmentShader = FRAGMENT_SHADER;
  }
}
