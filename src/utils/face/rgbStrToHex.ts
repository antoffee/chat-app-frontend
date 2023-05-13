function componentToHex(c: number) {
    const hex = c.toString(16);

    return hex.length == 1 ? '0' + hex : hex;
}

export const rgbStrToHex = (str: string) => {
    const parsed = str.replace(/(r|g|b|\(|\))/g, '');
    const [r, g, b] = parsed.split(',');

    return '#' + componentToHex(+r) + componentToHex(+g) + componentToHex(+b);
};
