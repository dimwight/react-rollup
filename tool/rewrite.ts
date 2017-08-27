import * as fs from 'fs';

const path='src/welcome/Welcome.js';
console.log('Rewriting path='+path);
const text=fs.readFileSync(path,).toString();
const replace=text.replace(
  'var __extends = (this && this.__extends) || (function () {',
  'var __extends = (function () {'
);
if(false)console.log(replace);
fs.writeFileSync(path,replace);
