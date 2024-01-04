import { externals } from 'rollup-plugin-node-externals';
import metadata from './metadata.js';
import resolve from '@rollup/plugin-node-resolve';
import UserScriptMetaDataPlugin from '../dist/esm/index.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

// 将 file: URL 转换为路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  input: path.join(__dirname, './src/main.js'),
  plugins: [
    externals(),
    resolve({
      modulePaths: ['../node_modules'],
    }),
    new UserScriptMetaDataPlugin({
      metadata,
      test: /\.js$/,
    }),
  ],
  output: [
    {
      format: 'iife',
      file: path.join(__dirname, './example.user.js'),
    },
  ],
};
