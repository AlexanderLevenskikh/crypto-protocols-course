const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        shamirProto: './src/shamir/index.ts',
        merklePuzzle: './src/merklePuzzle/index.ts',
        diningCryptographersProblem: './src/diningCryptographersProblem/index.ts',
        zeroKnowledgeProof: './src/zeroKnowledgeProof/index.ts',
        secretSharing: './src/secretSharing/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    useBabel: true,
                    useCache: true,
                    babelCore: '@babel/core',
                    reportFiles: [
                        'src/**/*.{ts,tsx}',
                    ],
                },
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve(__dirname, 'babel.config.js'),
                },
                exclude: /(node_modules)/
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json'],
    },
    target: 'node'
};
