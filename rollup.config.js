import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import json from '@rollup/plugin-json';
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy'

export default [{
  input: 'src/index.tsx',
  output: [{
    file: "dist/index.js",
    format: 'iife'
  }],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    json(),
    resolve(),
    typescript({target: "es5"}),
    scss(), // will output compiled styles to output.css
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'react-dom': ['render']
      }
    }),
    url({
      limit: 0,
      publicPath: './',
      fileName: '[name][extname]',
      destDir: 'dist'
    }),
    copy({
      targets: [
        { src: 'html/index.html', dest: 'dist' },
      ]
    })
  ]
}];

