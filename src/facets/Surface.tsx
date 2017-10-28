import {
  Facets,
  Target,
} from 'facets-js';
import {traceThing} from '../util/export';
export interface Layout{
  build(facets:Facets);
}
export abstract class Surface{
  trace(text){
    if(this.facets.doTrace)console.info('App > '+text);
  }
  constructor(readonly facets:Facets){
    facets.attachOnRetargeted(this.onRetargeted);
  }
  protected times=this.facets.times;
  buildSurface(){
    this.trace('Building surface '+this.times.elapsed());
    this.facets.buildTargeterTree(this.newTargetTree());
    this.trace('Built targets, created targeters');
    this.buildLayout();
    this.trace('Attached and laid out facets');
    this.trace('Surface built '+this.times.elapsed());
  }
  abstract newTargetTree():Target;
  abstract buildLayout();
  protected onRetargeted(){}
}
