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

float wave(vec2 uv, vec2 emitter, float speed, float phase) {
  float dst = distance(uv, emitter);
  return pow((0.5 + 0.5 * sin(dst * phase - time * speed)), 2.0);
}

void main() {
  vec2 position = ( gl_FragCoord.xy / 250.0 );
  float w = wave(position, vec2(0.0, 0.4), 4.5, 13.0);
  w += wave(position, vec2(0.6, 0.11), 3.7, 9.0);
  w += wave(position, vec2(2.4, 0.8), 5.3, 9.0);
  w += wave(position, vec2(-1.4, 0.84), 6.7, 12.0);
  w += wave(position, vec2(2.42, 2.61), 9.2, 12.0);
  //  w += wave(position, vec2(0.39, 0.46), 10.0, 150.0);
  //  w += wave(position, vec2(0.51, 0.484), 10.0, 150.0);
  //  w += wave(position, vec2(0.732, 0.91), 10.0, 150.0);

  w *= 0.116 * 0.04;

  vec4 texel = texture2D(tDiffuse, vUv + w);
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
