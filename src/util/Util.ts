import fn from 'date-fns/format';

function format(time:Date,style:string){
  return fn(time,style);
  return 'early evening';
}
export function tellTheTime(){
  const time=new Date();
  const text=true?'Time is exactly '+format(time,'h:mm:ssa')
    :'Time is about '+format(time,'h:mm');
  if(typeof document==='undefined') console.log(text);
  else{
    document.getElementById('pageTitle').innerText=document.title;
    document.querySelector('#time-now').textContent=text;
    setTimeout(time,1000);
  }
}
export function errorTest (msg?){
  let err=new Error('Hell!');
  console.log(`Created ${err} for ${msg}...`);
  if(false) throw err;
  else console.log(`..but didn't throw it.`);
}

