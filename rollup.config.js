import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';

export default {
  entry: 'src/main.js',
  dest: 'public/rollup.js',
  format: 'es',
  sourceMap: true,
  plugins: [
    resolve({
      jsnext: true,
      }
    ),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    sourcemaps(),
    postcss({
      // extract : 'true'
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports:{
        'node_modules/date-fns/index.js': [ 'format' ],
        'node_modules/react/react.js':[
          'Component',
          'createElement',
        ],
        'node_modules/react/react-dom.js':[
            'render'
          ],
        }
    })
  ]
};
