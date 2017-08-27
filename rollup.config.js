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

const o = Object;
const libDateFormat= o.assign({}, common, {
  entry: 'node_modules/date-fns/format/index.js',
  dest: 'public/rollupDateFormat.js',
  moduleName: 'libDateFormat',
});
const libReact= o.assign({}, common, {
  entry: 'node_modules/react/dist/react.js',
  dest: 'public/rollupReact.js',
  moduleName: 'React',
});
const libReactDom= o.assign({}, common, {
  entry: 'node_modules/react-dom/dist/react-dom.js',
  dest: 'public/rollupReactDom.js',
  moduleName: 'ReactDOM',
});
const includeLibs = o.assign({}, common, {
  entry: 'src/index.js',
  dest: 'public/index.js',
  sourceMap: true,
});
const excludeLibs = o.assign({}, includeLibs, {
  format: 'es',
  external: [
    'date-fns/format',
    'react',
    'react-dom'
  ],
  globals: {
    'date-fns/format': libDateFormat.moduleName,
    'react':libReact.moduleName,
    'react-dom':libReactDom.moduleName
  }
});

const bundle = excludeLibs;
// libDateFormat|libReact|libReactDom|includeLibs|excludeLibs
console.log('Bundling '+bundle.entry+' to '+bundle.dest+', format='+bundle.format)

export default bundle;
