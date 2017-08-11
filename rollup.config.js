import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';

const common = {
  format: 'iife',
  plugins: [
    sourcemaps(),
    resolve(),
    commonjs({
      namedExports:{
        'node_modules/date-fns/format': [ 'format' ],
        'node_modules/react/index.js':[
          'Component',
          'createElement',
        ],
        'node_modules/react-dom/index.js':['render'],
      }
    }),
    replace({'process.env.NODE_ENV': JSON.stringify( 'development' )})
  ]
};
const includeLib = Object.assign({}, common, {
  entry: 'src/main.js',
  dest: 'public/main.js',
  sourceMap: true,
});
const extractDate= Object.assign({}, common, {
  entry: 'node_modules/date-fns/format/index.js',
  dest: 'public/date.js',
  moduleName: 'extractDate',
});
const extractReact= Object.assign({}, common, {
  entry: 'node_modules/react/dist/react.js',
  dest: 'public/react.js',
  moduleName: 'extractReact',
});
const extractReactDom= Object.assign({}, common, {
  entry: 'node_modules/react-dom/dist/react-dom.js',
  dest: 'public/react-dom.js',
  moduleName: 'extractReactDom',
});
const excludeLib = Object.assign({}, includeLib, {
  external: [
    'date-fns/format',
    'react',
    'react-dom'
  ],
  globals: {
    'date-fns/format': extractDate.moduleName,
    'react':extractReact.moduleName,
    'react-dom':extractReactDom.moduleName
  }
});

const bundle = excludeLib;
// includeLib|extractDate|extractReact|extractReactDom|excludeLib
console.log('Bundling to '+bundle.dest);
export default bundle;
