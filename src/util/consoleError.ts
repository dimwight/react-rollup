export function errorTest (msg?){
  let err=new Error('Hell!');
  console.log(`Created ${err} for ${msg}...`);
  if(false) throw err;
  else console.log(`..but didn't throw it.`);
}

