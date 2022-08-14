import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const inputDir = path.resolve(__dirname, '..', 'src', 'theme');
const outputDir = path.resolve(__dirname, '..', 'src', 'theme');

type VariableInfo = { name: string; hex: string; rgb: string };

const convertToRGB = (str: string) => {
    const aRgbHex = str.match(/.{1,2}/g) ?? [];

    return [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];
};

const getGroupedVars = (file: string) =>
    file
        .match(/--.+:.+;/gm)
        ?.map((variable) => {
            const [name, value] = variable.split(': ');

            return [name, value.replace(/[#;]/g, '')];
        })
        .map(([name, value]) => ({ name, hex: value, rgb: convertToRGB(value).join(', ') }))
        .reduce<Record<string, VariableInfo[]>>((accum, variable) => {
            const group = variable.name.replace('--', '').replace(/-[0-9]+/, '');

            return { ...accum, [group]: [...(accum[group] ?? []), variable] };
        }, {});

const processFile = (groupedVars: Record<string, VariableInfo[]>) =>
    Object.entries(groupedVars).reduce(
        (accum, [groupName, variables]) =>
            accum +
            `
    /** ${groupName.toUpperCase()} **/

    ${variables.reduce(
        (accum, { name, rgb }) =>
            accum +
            `
        ${name}-rgb: ${rgb};
        ${name}: rgb(var(${name}-rgb));`,
        '',
    )}
        `,
        '',
    );

const lintGeneratedFiles = () =>
    new Promise((resolve, reject) => {
        exec(`yarn prettier --write "${outputDir}/**/*"`, (error, stdout, stderror) => {
            if (error) {
                reject(error);
            }

            if (stderror) {
                reject(stderror);
            }

            resolve(undefined);
        });
    });

const filePaths = fs.readdirSync(path.resolve(inputDir)).filter((fileName) => !!fileName.match(/(.draft)/));

const files = filePaths.map((fileName) => ({
    fileName,
    content: fs.readFileSync(path.resolve(inputDir, fileName), { encoding: 'utf-8' }),
}));

files
    .map(({ fileName, content }) => [fileName, processFile(getGroupedVars(content) ?? {})])
    .forEach(([fileName, content]) => {
        const filePath = path.resolve(outputDir, fileName);

        const fileTheme = fileName.match(/dark/gi) ? 'dark' : 'light';
        const fileContent =
            fileTheme === 'dark'
                ? `:root .dark, :root.dark {
            ${content}
        }
        `
                : `:root {
            ${content}
        }
        `;
        fs.writeFile(filePath.replace('.draft', ''), fileContent, { encoding: 'utf-8', flag: 'w+' }, console.error);
    });

lintGeneratedFiles().catch(console.error);
