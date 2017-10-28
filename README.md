# Can Rollup cope with React?
- Bundling React works fine, React-DOM less so. 
- However bundling without them works and is the best solution anyway. 

Even the goodies from `create-react-app` work a treat: 

- CSS with `rollup-plugin-postcss > extract`
- SVG with `svg.d.ts` and `rollup-plugin-svg`

Now explored:
-  [react/.../hello-world](https://facebook.github.io/react/docs/hello-world.html)
- __exports.ts_
-  [react/.../thinking-in-react.html](https://facebook.github.io/react/docs/thinking-in-react.html)
- _facets-js_ with _Surface, TestLayout, SmartTextField_
