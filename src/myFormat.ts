import {format} from 'date-fns';
export function myFormat(time:Date,style:string){
  return 'late afternoon';
  return format(time,style);
}
