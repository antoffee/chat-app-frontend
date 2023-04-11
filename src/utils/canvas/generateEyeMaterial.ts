import { Color, MeshStandardMaterial, Texture } from 'three';

const generateTexture = (color = 'rebeccapurple') => {
    const size = 500;

    // create canvas
    const canvas2 = document.createElement('canvas');
    canvas2.width = size;
    canvas2.height = size;

    // get context
    const context = canvas2.getContext('2d');

    // draw gradient
    context?.rect(0, 0, size, size);
    const gradient = context?.createRadialGradient(
        size / 2,
        size / 2,
        size / 3,
        size / 2,
        size / 2,
        size / 10,
    ) as CanvasGradient;
    // Add three color stops
    gradient.addColorStop(0.5, 'white');
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(0.7, color);
    gradient.addColorStop(1, 'pink');
    gradient.addColorStop(1, 'black');

    if (context && gradient) context.fillStyle = gradient;
    context?.fill();

    return canvas2;
};

export const generateEyeMaterial = (color?: string) => {
    const texture = new Texture(generateTexture(color));

    texture.needsUpdate = true; // important!

    // material
    return new MeshStandardMaterial({
        map: texture,
        opacity: 1,
        emissive: new Color(0, 0, 0),
        emissiveIntensity: 1,
        metalness: 0.7,
    });
};
