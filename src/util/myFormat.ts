import format from 'date-fns/format';
export default function (time:Date,style:string){
  return format(time,style);
  return 'late afternoon';
}
