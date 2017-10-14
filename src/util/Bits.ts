import fn from 'date-fns/format';

export function traceThing(top,thing?){
  if(!thing)console.log(top);
  else console.log((true?(top+': '):"")+JSON.stringify(thing,false?null:(key,value)=>{
    return true&&key==='facets'?'[facets]':value;
  },1))
}

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
  let err=new Error(msg);
  console.log(`Created ${err}...`);
  if(false) throw err;
  else console.log(`..but didn't throw it.`);
}

