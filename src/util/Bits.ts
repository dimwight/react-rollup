import fn from 'date-fns/format';

export function traceThing(top,thing?){
  if(!thing)console.log(top);
  else if(top.charAt(0)!='^')
    console.info((true?'':'Facets') + top, JSON.stringify(thing, true ? null : (key, value) => {
      console.log(key)
      return value
    }, 1))
}
/** Swaps an array element with one of its neighbours.
 * @param a the array
 * @param index of the element to be swap
 * @param down the direction of the swap
 */
export function swapArrayElement(a: any[], index: number, down: boolean) {
  traceThing('swapArrayElement', { index: index, down: down })
  const lowerFrom:number = down?index:index+1, upperFrom:number = down?index-1:index,
    lowerTo:number = down ? index-1 : index,upperTo:number = down ? index : index+1;
  const names=['index','lowerFrom','upperFrom','lowerTo','upperTo'];
  [index,lowerFrom,upperFrom,lowerTo,upperTo].forEach((n,at)=>{
    if(n<0||n>=a.length)throw new Error(`Index out of range: ${names[at]}=${n}`)
  })
  traceThing('swapArrayElement', { lowerFrom: lowerFrom, upperFrom: upperFrom,
    lowerTo: lowerTo, upperTo: upperTo })
  const top = a.slice(0, lowerTo), tail = a.slice(upperTo+1),
    shifted = top.concat(a[lowerFrom],a[upperFrom],tail);
  traceThing('swapArrayElement~', false?{top:top,tail:tail}:shifted)
  a.splice(0,a.length,shifted);
  traceThing('swapArrayElement~~', a)
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

