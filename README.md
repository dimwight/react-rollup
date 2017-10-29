# Can Rollup cope with React?
- Bundling React works fine, React-DOM less so. 
- However bundling without them works and is the best solution anyway. 

Even the goodies from `create-react-app` work a treat: 

- CSS with `rollup-plugin-postcss > extract`
- SVG with `svg.d.ts` and `rollup-plugin-svg`

Explored:
-  [react/.../hello-world](https://facebook.github.io/react/docs/hello-world.html)
- _exports.ts_ etc
-  [react/.../thinking-in-react.html](https://facebook.github.io/react/docs/thinking-in-react.html)
