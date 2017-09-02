# Can Rollup cope with React?
- Bundling React works fine, React-DOM less so. 
- However `excludeLibs`  bundles without them, 
which is the best solution anyway. 

Even the goodies from `create-react-app` work a treat: 

- CSS with `rollup-plugin-postcss > extract`
- SVG with `svg.d.ts` and `rollup-plugin-svg`

Next, [react/docs/../hello-world](https://facebook.github.io/react/docs/hello-world.html)
at last? 
