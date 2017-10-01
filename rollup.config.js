import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';

const common = {
  format: 'iife',
  plugins: [
    postcss({extract: true,}),
    svg(),
    sourcemaps(),
    resolve(),
    commonjs(),
    // replace({'process.env.NODE_ENV': JSON.stringify( 'development' )})
  ]
};

const entry = 'src/facets/main.js';
const main = Object.assign({}, common, {
  entry: entry,
  dest: 'public/index.js',
  sourceMap: true,
  external: [
    'facets-js',
    'react',
    'react-dom'
  ],
  globals: {
    'facets-js': 'Facets',
    'react':'React',
    'react-dom':'ReactDOM'
  },
});

const bundle = main;
console.log('Bundling '+bundle.entry+' to '+bundle.dest+', format='+bundle.format);

export default bundle;
