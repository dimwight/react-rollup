import React from 'react';
import ReactDOM from 'react-dom';
import {Facets,SimpleState} from 'facets-js';
import {SmartTextField} from '../widget/_exports';
import {Titles,Test} from './testReact';
import {traceThing} from '../Util/Bits';
import './Layout.css';
export class Layout{
  constructor(private test:Test){}
  build(facets:Facets){
    if(this.test===Test.Textual) buildTextual(facets);
    else if(this.test===Test.Indexing) buildIndexing(facets);
    else if(this.test===Test.Toggling) buildToggling(facets);
    else if(this.test===Test.Trigger) buildTrigger(facets);
    else buildAll(facets);
  }
}
interface TargetValues{
  title:string
  facets?:Facets
  state?:SimpleState
  live?:boolean
}
interface TextualValues extends TargetValues{
  text?:string
  cols?:number
}
interface TogglingValues extends TargetValues{
  set?:boolean
}
interface IndexingValues extends TargetValues{
  selectables:string[]
  index?:number
}
interface LabelValues{
  text:string
  disabled:boolean
}
class LabelText extends React.Component<LabelValues>{
  render(){
    return (<span className={this.props.disabled?'textDisabled':''}>
    {this.props.text}&nbsp;</span>)
  }
}
class LabelRubric extends React.Component<LabelValues>{
  render(){
    return (<span className={
      (this.props.disabled?'captionDisabled':'caption')
    }>
    {this.props.text}&nbsp;</span>)
  }
}
class Facet<I extends TargetValues,K extends TargetValues> extends React.Component<I,K>{
  private didMount:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    const stateWithLive:{}=Object.assign({},this.readUpdate(update),{
      live:this.props.facets.isTargetLive(this.props.title)
    });
    if(!this.didMount)
      this.state=Object.assign({}as K,this.props,stateWithLive,);
    else this.setState(stateWithLive);
    traceThing(this.props.title+'.facetUpdated',stateWithLive)
  };
  componentDidMount(){
    this.didMount=true;
  }
  protected readUpdate(update):{}{
    return {state:update}
  }
}
class TogglingCheckbox extends Facet<TogglingValues,TogglingValues>{
  protected readUpdate(update):{}{
    return {set:update}
  }
  onChange=(e)=>{
    const set=e.target.checked;
    this.props.facets.updateTargetState(this.props.title,
      set);
    this.setState({
      set:set
    })
  };
  render(){
    return (<span>
      <LabelRubric text={this.props.title} disabled={!this.state.live}/>
        <input
          type="checkbox"
          onChange={this.onChange}
          checked={this.state.set}
          disabled={!this.state.live}
        />
    </span>)
  }
}
class IndexingDropdown extends Facet<IndexingValues,IndexingValues>{
  protected readUpdate(update){
    return {index:update};
  }
  onChange=(e)=>{
    const indexables=(this.props as IndexingValues).selectables;
    const value=e.target.value;
    for(let at=0; at<indexables.length; at++){
      if(indexables[at]===value){
        this.setState(then=>{
          this.props.facets.updateTargetState(this.props.title,at);
          return {index:at};
        });
        break;
      }
    }
  };
  render(){
    const indexables=(this.props as IndexingValues).selectables,
      selected=indexables[(this.state as IndexingValues).index],
      options=indexables.map((item)=>{
      return item===selected?<option selected>{item}</option>
        :<option>{item}</option>
    });
    const disabled=!this.state.live;
    return (<span>
      <LabelRubric text={this.props.title} disabled={disabled}/>
      <select
        className={disabled?'textDisabled':''}
        disabled={disabled}
        onChange={this.onChange}
      >{options}</select>
    </span>);
  }
}
class TextualField extends Facet<TextualValues,TextualValues>{
  protected readUpdate(update):{}{
    return {text:update}
  }
  onFieldEnter=(text)=>{
     this.props.facets.updateTargetState(this.props.title,text);
  };
  render(){
    return (<span>
        <LabelRubric text={this.props.title} disabled={!this.state.live}/>
        <SmartTextField
          startText={this.state.text}
          onEnter={this.onFieldEnter}
          cols={this.props.cols}
          disabled={!this.state.live}
        />
      </span>
    );
  }
}
class TextualLabel extends Facet<TextualValues,TextualValues>{
  protected readUpdate(update):{}{
    return {text:update}
  }
  render(){
    const disabled=!this.state.live;
    return (<span>
      <LabelRubric text={this.props.title} disabled={disabled}/>
      &nbsp;
      <LabelText text={this.state.text} disabled={disabled}/>
        </span>)
  }
}
class TriggerButton extends Facet<TargetValues,TargetValues>{
  protected readUpdate(update):{}{
    return {}
  }
  onClick=()=>{
    this.props.facets.updateTargetState(this.props.title,'No state!');
  };
  render(){
    return (<button
      onClick={this.onClick}
      disabled={!this.state.live}
    >{this.props.title}
    </button>)
  }
}
function buildTextual(facets:Facets){
  const first=Titles.TEXTUAL_FIRST,second=Titles.TEXTUAL_SECOND;
  ReactDOM.render(
    <div>
      <div><TextualField title={first} facets={facets}/></div>
      <div><TextualLabel title={first} facets={facets}/></div>
      <div><TextualField title={second} facets={facets} cols={40}/></div>
      <div><TextualLabel title={second} facets={facets}/></div>
    </div>,
    document.getElementById('root'),
  );
}
function buildToggling(facets:Facets){
  ReactDOM.render(
    <span>
      <TogglingCheckbox title={Titles.TOGGLING} facets={facets}/>
      <div><TextualLabel title={Titles.TOGGLED} facets={facets}/></div>
    </span>,
    document.getElementById('root'),
  );

}
function buildIndexing(facets:Facets){
  const indexing=Titles.INDEXING;
  ReactDOM.render(
    <span>
      <div><IndexingDropdown
        title={indexing}
        selectables={facets.getIndexingState(indexing).uiSelectables}
        facets={facets}/></div>
      <div><TextualLabel title={Titles.INDEX} facets={facets}/></div>
      <TextualLabel title={Titles.INDEXED} facets={facets}/>
    </span>,
    document.getElementById('root'),
  );
}
function buildTrigger(facets:Facets){
  ReactDOM.render(
    <div>
      <div><TriggerButton title={Titles.TRIGGER} facets={facets}/></div>
      <div><TextualLabel title={Titles.TRIGGEREDS} facets={facets}/></div>
    </div>,
    document.getElementById('root'),
  )
}
function Group(props){
  const children=props.children.map((child)=>{
    return <div>{child}</div>
  });
  return <div className={'group'}>
    {children}
    </div>
}
function buildAll(facets:Facets){
  const first=Titles.TEXTUAL_FIRST,second=Titles.TEXTUAL_SECOND,
    indexing=Titles.INDEXING;
  ReactDOM.render(<div>
    <Group>
      <TextualField title={first} facets={facets}/>
      <TextualLabel title={first} facets={facets}/>
      <TextualField title={second} facets={facets} cols={40}/>
      <TextualLabel title={second} facets={facets}/>
    </Group>
      <div className={'group'}>
        <IndexingDropdown
          title={indexing}
          selectables={facets.getIndexingState(indexing).uiSelectables}
          facets={facets}/>
      <div><TextualLabel title={Titles.INDEX} facets={facets}/></div>
      <div><TextualLabel title={Titles.INDEXED} facets={facets}/></div>
      </div>
      <div className={'group'}>
      <div><TogglingCheckbox title={Titles.TOGGLING} facets={facets}/></div>
      <TextualLabel title={Titles.TOGGLED} facets={facets}/>
    </div>
    <div className={'group'}>
      <div><TriggerButton title={Titles.TRIGGER} facets={facets}/></div>
      <div><TextualLabel title={Titles.TRIGGEREDS} facets={facets}/></div>
    </div>
    </div>,
    document.getElementById('root'),
  );
}
