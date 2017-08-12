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
const rollupDateFormat= Object.assign({}, common, {
  entry: 'node_modules/date-fns/format/index.js',
  dest: 'public/rollupDateFormat.js',
  moduleName: 'rollupDateFormat',
});
const rollupReact= Object.assign({}, common, {
  entry: 'node_modules/react/dist/react.js',
  dest: 'public/rollupReact.js',
  moduleName: 'rollupReact',
});
const rollupReactDom= Object.assign({}, common, {
  entry: 'node_modules/react-dom/dist/react-dom.js',
  dest: 'public/rollupReactDom.js',
  moduleName: 'rollupReactDom',
});
const includeLibs = Object.assign({}, common, {
  entry: 'src/main.js',
  dest: 'public/index.js',
  sourceMap: true,
});
const excludeLibs = Object.assign({}, includeLibs, {
  external: [
    'date-fns/format',
    'react',
    'react-dom'
  ],
  globals: {
    'date-fns/format': rollupDateFormat.moduleName,
    'react':false?rollupReact.moduleName:'React',
    'react-dom':false?rollupReactDom.moduleName:'ReactDOM'
  }
});

const bundle = excludeLibs;
// rollupDateFormat|rollupReact|rollupReactDom|includeLibs|excludeLibs
console.log('Bundling to '+bundle.dest);
export default bundle;
