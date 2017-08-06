import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import replace from 'rollup-plugin-replace';

export default {
  dest: 'public/rollup.js',
  entry: 'src/main.js',
  format: 'es',
  plugins: [
    babel({
      // babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        // [ 'es2015', { modules: false } ],
        // 'stage-0',
        'react'
      ]
      // plugins: [ 'external-helpers' ]
    }),
    cjs({
      include: 'node_modules/**',
      namedExports:{
        'node_modules/date-fns/index.js': [ 'format' ],
        'node_modules/react/react.js':[
          'Component',
          'createElement',
        ],
        }
    }),
    replace({'process.env.NODE_ENV': JSON.stringify( 'production' )}),
    resolve(),
    sourcemaps()
  ],
  sourceMap: true
};
