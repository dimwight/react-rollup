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
  selectables?:string[]
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
class Facet<I extends TargetValues,K extends TargetValues> extends React.Component<I,K>{
  private didMount:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    const updateWithLive:{}=Object.assign({},this.readUpdate(update),{
      live:this.props.facets.isTargetLive(this.props.title)
    });
    if(!this.didMount)
      this.state=Object.assign({}as K,this.props,updateWithLive,);
    else this.setState(updateWithLive);
    traceThing(this.props.title+'.facetUpdated',updateWithLive)
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
    const selectables=this.props.facets.getIndexingState(this.props.title).uiSelectables
    return {index:update,selectables:selectables};
  }
  onChange=(e)=>{
    const value=e.target.value,selectables=this.state.selectables;
    for(let at=0; at<selectables.length; at++){
      if(selectables[at]===value){
        this.setState(then=>{
          this.props.facets.updateTargetState(this.props.title,at);
          return {index:at};
        });
        break;
      }
    }
  };
  render(){
    const selectables=this.state.selectables,
      selected=selectables[(this.state as IndexingValues).index],
      options=selectables.map((item)=>{
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
class LabelRubric extends React.Component<LabelValues>{
  render(){
    return (<span className={
      (this.props.disabled?'captionDisabled':'caption')
    }>
    {this.props.text}&nbsp;</span>)
  }
}
function Panel(props){
  const children=props.children.map((child)=>{
    return <div>{child}</div>
  });
  return <div className={'group'}>
    <LabelRubric text={Test.Textual.toString()} disabled={false}/>
    {children}
  </div>
}
function buildTextual(facets:Facets){
  const first=Titles.TEXTUAL_FIRST,second=Titles.TEXTUAL_SECOND;
  ReactDOM.render(
    <Panel >
      <TextualField title={first} facets={facets}/>
      <TextualLabel title={first} facets={facets}/>
      <TextualField title={second} facets={facets} cols={40}/>
      <TextualLabel title={second} facets={facets}/>
    </Panel>,
    document.getElementById('root'),
  );
}
function buildToggling(facets:Facets){
  ReactDOM.render(
    <Panel>
      <TogglingCheckbox title={Titles.TOGGLING} facets={facets}/>
      <TextualLabel title={Titles.TOGGLED} facets={facets}/>
    </Panel>,
    document.getElementById('root'),
  );

}
function buildIndexing(facets:Facets){
  const indexing=Titles.INDEXING;
  ReactDOM.render(
    <Panel>
      <IndexingDropdown
        title={indexing}
        selectables={facets.getIndexingState(indexing).uiSelectables}
        facets={facets}/>
      <TextualLabel title={Titles.INDEX} facets={facets}/>
      <TextualLabel title={Titles.INDEXED} facets={facets}/>
    </Panel>,
    document.getElementById('root'),
  );
}
function buildTrigger(facets:Facets){
  ReactDOM.render(
    <Panel>
      <TriggerButton title={Titles.TRIGGER} facets={facets}/>
      <TextualLabel title={Titles.TRIGGEREDS} facets={facets}/>
    </Panel>,
    document.getElementById('root'),
  )
}
function buildAll(facets:Facets){
  const textual1=Titles.TEXTUAL_FIRST,textual2=Titles.TEXTUAL_SECOND,
    indexing=Titles.INDEXING;
  ReactDOM.render(<div>
    <Panel>
      <TextualField title={textual1} facets={facets}/>
      <TextualLabel title={textual1} facets={facets}/>
      <TextualField title={textual2} facets={facets} cols={40}/>
      <TextualLabel title={textual2} facets={facets}/>
    </Panel>
    <Panel>
      <IndexingDropdown title={indexing} facets={facets}/>
      <TextualLabel title={Titles.INDEX} facets={facets}/>
      <TextualLabel title={Titles.INDEXED} facets={facets}/>
    </Panel>
    <Panel>
      <TogglingCheckbox title={Titles.TOGGLING} facets={facets}/>
      <TextualLabel title={Titles.TOGGLED} facets={facets}/>
    </Panel>
    <Panel>
      <TriggerButton title={Titles.TRIGGER} facets={facets}/>
      <TextualLabel title={Titles.TRIGGEREDS} facets={facets}/>
    </Panel>
    </div>,
    document.getElementById('root'),
  );
}
