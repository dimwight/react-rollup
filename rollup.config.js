import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  dest: 'public/rollup.js',
  entry: 'src/main.js',
  format: 'es',
  plugins: [
    resolve(),
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
    replace({'process.env.NODE_ENV': JSON.stringify( 'development' )}),
    sourcemaps()
  ],
  sourceMap: true
};
