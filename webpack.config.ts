import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import { CustomizeRule, merge, mergeWithRules } from 'webpack-merge';

const resolveFromRoot = (...pathSegments: string[]) => path.resolve(__dirname, ...pathSegments);

const getHTMLCommonProperties = (): HtmlWebpackPlugin.Options => ({
    filename: 'index.html',
    inject: true,
    base: {
        href: '/',
    },
});

const devCssLoaders = [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
            },
        },
    },
    'postcss-loader',
];

const prodCssLoaders = [
    {
        loader: MiniCssExtractPlugin.loader,
    },
    {
        loader: 'css-loader',
        options: {
            modules: {
                auto: true,
                localIdentName: '[hash:base64:7]',
            },
        },
    },
    'postcss-loader',
];

const sassLoader = {
    loader: 'sass-loader',
};

const styleResources = {
    loader: 'style-resources-loader',
    options: {
        patterns: [
            // ? if you want to globaly add style files - do it here
            resolveFromRoot('src', 'theme', 'mixins.scss'),
            resolveFromRoot('src', 'theme', 'text-mixins.scss'),
            resolveFromRoot('src', 'theme', 'breakpoints.scss'),
        ],
    },
};

const commonConfig: Configuration = {
    entry: './src/index.tsx',
    target: 'web',
    plugins: [
        new DotEnv({
            path: resolveFromRoot(`.env`),
            systemvars: false,
            allowEmptyValues: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolveFromRoot('public'),
                    to: resolveFromRoot('build'),
                    globOptions: {
                        ignore: ['**/*.html'],
                    },
                },
            ],
        }),
        new MomentLocalesPlugin({ localesToKeep: ['es-us', 'ru'] }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...devCssLoaders],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [...devCssLoaders, sassLoader, styleResources],
            },
            {
                test: /\.ts(x?)?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.build.json',
                    },
                },
            },
            {
                test: /\.svg$/,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                ],
                            },
                            memo: true,
                            svgProps: {
                                width: '24px',
                                height: '24px',
                            },
                        },
                    },
                    'url-loader',
                ],
            },
            {
                test: /\.js.map$/,
                enforce: 'pre',
                loader: 'source-map-loader',
            },
            // images
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // fonts
            {
                test: /\.(woff|ttf|eot)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
};

export const developmentConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        path: resolveFromRoot('build'),
        publicPath: '/',
    },
    optimization: {
        runtimeChunk: 'single',
    },
    devServer: {
        port: process.env.PORT || 4000,
        hot: true,
        historyApiFallback: true,
        client: {
            overlay: {
                warnings: false,
                errors: true,
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolveFromRoot('public', 'dev.html'),
            ...getHTMLCommonProperties(),
        }),
    ],
} as Configuration);

export const productionConfig: Configuration = mergeWithRules({
    module: {
        rules: {
            test: CustomizeRule.Match,
            use: CustomizeRule.Replace,
        },
    },
})(commonConfig, {
    mode: 'production',
    devtool: false,
    output: {
        path: resolveFromRoot('build'),
        publicPath: '/',
        filename: 'js/[name].[contenthash].js',
        sourceMapFilename: 'js/[name].[contenthash].js.map',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolveFromRoot('public', 'prod.html'),
            ...getHTMLCommonProperties(),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...prodCssLoaders],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [...prodCssLoaders, sassLoader, styleResources],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
} as Configuration);

export const storybookConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        port: process.env.PORT || 4000,
        hot: true,
        historyApiFallback: true,
        liveReload: true,
    },
} as Configuration);
