import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

import { createSpinner } from 'nanospinner';
import fetch from 'node-fetch';
import rimraf from 'rimraf';

const generatorTemplate = 'typescript-axios';

const outputDir = path.resolve(__dirname, '..', 'src', 'generated');

const apiURLs = [''];

const apiURL = 'swagger-docs';

const unusedGeneratedFiles = [
    '.npmignore',
    '.swagger-codegen-ignore',
    'git_push.sh',
    'package.json',
    'README.md',
    'tsconfig.json',
    '.gitignore',
];

const unusedGeneratedDirs = ['.swagger-codegen'];

const addIgnoreComments = (apiOutputDir: string) => {
    const filesToUpdate = fs.readdirSync(apiOutputDir);
    filesToUpdate.forEach((file) => {
        const filePath = path.join(apiOutputDir, file);

        const stats = fs.statSync(filePath);

        if (stats.isFile() && path.extname(file) === '.ts') {
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(filePath, '// @ts-nocheck\n' + content, 'utf8');
        } else if (stats.isDirectory()) {
            addIgnoreComments(filePath);
        }
    });
};

const prepareAxiosGeneratedFiles = (apiURL: string, apiOutputDir: string) => {
    const apiBase = fs.readFileSync(path.resolve(apiOutputDir, 'base.ts'), {
        encoding: 'utf-8',
    });

    fs.writeFileSync(
        path.resolve(apiOutputDir, 'base.ts'),
        apiBase
            // .replace(`BASE_PATH = "//${targetEnv}.enauda.com/${apiURL}"`, `BASE_PATH = "/${apiURL}"`)
            .replace(
                `import globalAxios, { AxiosRequestConfig, AxiosInstance } from 'axios';`,
                `import { AxiosRequestConfig, AxiosInstance } from 'axios';\nimport { axiosInstance } from "api/axios";`,
            )
            .replace('globalAxios', 'axiosInstance'),
    );

    addIgnoreComments(apiOutputDir);
};

const fetchSwaggerJson = async () =>
    await (await fetch(`https://don-vadimon.online/swagger-json`)).text();

// ? install this generator for script work. Version - 3.0.34
// ? https://swagger.io/docs/open-source-tools/swagger-codegen/
const generateApiClient = async () => {
    const apiJSON = await fetchSwaggerJson();

    const apiJSONFilename = path.resolve(__dirname, `${apiURL}.json`);

    const apiOutputDir = path.resolve(outputDir);

    rimraf(apiOutputDir, fs, console.error);

    fs.writeFileSync(apiJSONFilename, apiJSON, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
        exec(
            `swagger-codegen generate -i ${apiJSONFilename} -l ${generatorTemplate} -o ${apiOutputDir}`,
            (error, stdout, stderr) => {
                fs.unlinkSync(apiJSONFilename);

                if (error) {
                    reject(error);
                }

                if (stderr) {
                    reject(stderr);
                }

                unusedGeneratedDirs.forEach((dirname) =>
                    rimraf(path.resolve(apiOutputDir, dirname), fs, console.error),
                );

                unusedGeneratedFiles.forEach((filename) => fs.unlinkSync(path.resolve(apiOutputDir, filename)));

                resolve(prepareAxiosGeneratedFiles(apiURL, apiOutputDir));
            },
        );
    });
};

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

const spinner = createSpinner('Generating API clients');
spinner.start();

Promise.all(apiURLs.map(() => generateApiClient()))
    .then(() => spinner.success({ text: 'API client generated' }))
    .then(() => spinner.start({ text: 'Linting generated files' }))
    .then(lintGeneratedFiles)
    .then(() => spinner.success({ text: 'Files linted successfully' }))
    .catch((error) => spinner.error({ text: String(error) }));
