import { Configuration } from 'webpack';
import { storybookConfig } from '../webpack.config';

const config = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-dark-mode',
        'storybook-react-i18next',
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
    webpackFinal: (config: Configuration): Configuration => ({
        ...config,
        module: {
            ...config.module,
            rules: storybookConfig.module?.rules || config.module?.rules || [],
        },
        resolve: storybookConfig.resolve || config.resolve || {},
        plugins: (config.plugins ?? []).concat(storybookConfig.plugins ?? []),
    }),
};

export default config;
