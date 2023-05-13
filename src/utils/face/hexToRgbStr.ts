export const hexToRgbString = (hex: string) => {
    const [,r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase()) ?? [];

    const computed = r && b && g;

    return computed ? `rgb(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)})` : undefined;
};
