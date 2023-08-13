/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const envs = {
  LAST_COMPILED: new Date().toLocaleString(),
};

const config: Configuration = {
  entry  : path.join(__dirname, 'src/presentation/index.ts'),
  output : {
    path     : path.join(__dirname, 'build'),
    filename : 'terpel_pos_scaffolding_hexagonal.js',
  },
  mode      : 'production',
  target    : 'node',
  externals : [ nodeExternals() as any ],
  resolve   : {
    plugins    : [ new TsconfigPathsPlugin() as any ],
    extensions : [ '.ts' ],
  },
  plugins: [
    new EnvironmentPlugin(envs),
    new CopyPlugin({
      patterns: [ { from: 'package.json', to: '.' } ],
    }),
  ],
  module: {
    rules: [
      {
        test    : /\.ts$/,
        include : /src/,
        use     : [ { loader: 'ts-loader' } ],
      },
    ],
  },
};

export default config;
