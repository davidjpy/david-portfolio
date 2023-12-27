uniform sampler2D uPhotoTexture;
uniform sampler2D uArtTexture;
uniform sampler2D uDisplacementTexture;
uniform float _rot;
uniform float uDisplacementFactor;
uniform float uEffectFactor;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(uDisplacementTexture, uv);
    vec2 distortedPosition1 = vec2(uv.x - (1.0 - uDisplacementFactor) * (disp.r * uEffectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x + uDisplacementFactor * (disp.r * uEffectFactor), uv.y);

    vec4 artTexture = texture2D(uArtTexture, distortedPosition1);
    vec4 photoTexture = texture2D(uPhotoTexture, distortedPosition2);
    vec4 finalTexture = mix(photoTexture, artTexture, uDisplacementFactor);
    gl_FragColor = finalTexture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}