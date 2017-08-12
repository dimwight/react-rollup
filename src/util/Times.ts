export class Times{
  public static minute:number;
  public static minutes():number{
    if(Times.minute==null) Times.minute=1000*60;
    return Times.minute;
  };

  public static HOUR:number;
  public static HOUR_$LI$():number{
    if(Times.HOUR==null) Times.HOUR=Times.minutes()*60;
    return Times.HOUR;
  };

  public static times:boolean=false;
  public static nanoTime:boolean=true;
  public static resetWait:number=1000;
  static then:number=0;
  static start:number=0;
  static restarted:boolean=false;
  static debug:boolean=false;
  /*private*/
  static newMillis():number{
    return Date.now();
  }
  public static setResetWait(wait:number){
    if(Times.debug) console.log("Times.setResetWait: wait=",wait);
    Times.start=Times.newMillis();
    Times.times=true;
    Times.resetWait=wait;
  }
  public static elapsed():number{
    const now:number=Times.newMillis();
    if(now-Times.then>Times.resetWait){
      Times.start=now;
      Times.restarted=true;
      if(Times.debug) console.log("Times: reset resetWait="+Times.resetWait);
    }else Times.restarted=false;
    return (Times.then=now)-Times.start;
  }
  public static printElapsed(msg:string){
    if(!Times.times){
      Times.start=Times.then=Times.newMillis();
      if(Times.debug) console.log("Times.printElapsed: times=",Times.times);
      return;
    }
    const elapsed:number=Times.elapsed(),
      elapsedText:string=(""+elapsed),
      toPrint:string=(Times.restarted?"\n":"")+elapsedText+(msg!=null?":\t"+msg:"");
  }
}