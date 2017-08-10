import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';

const common = {
  format: 'iife',
  plugins: [
    resolve(),
    commonjs({
      namedExports:{
        'node_modules/date-fns/format': [ 'format' ],
        'node_modules/react/react.js':[
          'Component',
          'createElement',
        ],
      }
    }),
    sourcemaps()
  ]
};
const includeLib = Object.assign({}, common, {
  entry: 'src/main.js',
  dest: 'public/rollup.js',
  sourceMap: true,
});
const extractDate= Object.assign({}, common, {
  entry: 'node_modules/date-fns/format/index.js',
  dest: 'public/date.js',
  moduleName: 'extractDate',
});
const extractReact= Object.assign({}, common, {
  entry: 'node_modules/react/react.js',
  dest: 'public/react.js',
  moduleName: 'extractReact',
});
const excludeLib = Object.assign({}, includeLib, {
  external: [
    'date-fns/format',
  ],
  globals: {
    'date-fns/format': extractDate.moduleName
  }
});

const bundle = includeLib;// includeLib|extractDate|excludeLib
console.log('Bundling to '+bundle.dest);
export default bundle;
