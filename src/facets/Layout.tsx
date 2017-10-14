import React from 'react';
import ReactDOM from 'react-dom';
import {Facets,SimpleState} from 'facets-js';
import {SmartTextField} from '../widget/_exports';
import {SimpleTitles,SelectingTitles,Test} from './testReact';
import {traceThing} from '../Util/Bits';
import './Layout.css';
export class Layout{
  constructor(private test:Test){}
  build(facets:Facets){
    if(this.test===Test.Textual) buildTextual(facets);
    else if(this.test===Test.Indexing) buildIndexing(facets);
    else if(this.test===Test.Toggling) buildToggling(facets);
    else if(this.test===Test.Trigger) buildTrigger(facets);
    else if(this.test===Test.All)buildAll(facets);
    else buildSelectingBasic(facets)
  }
}
interface TargetValues{
  title:string
  facets?:Facets
  state?:SimpleState
  live?:boolean
}
class Facet<I extends TargetValues,K extends TargetValues> extends React.Component<I,K>{
  private didMount:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    let updateWithLive:{}=Object.assign({},this.readUpdate(update),{
      live:this.props.facets.isTargetLive(this.props.title)
    });
    if(!this.didMount)
      this.state=Object.assign({}as K,this.props,updateWithLive,);
    else this.setState(updateWithLive);
    if(false)traceThing(this.props.title+'.facetUpdated',updateWithLive)
  };
  componentDidMount(){
    this.didMount=true;
  }
  protected readUpdate(update):{}{
    return {state:update}
  }
}
interface TextualValues extends TargetValues{
  text?:string
  cols?:number
}
interface TogglingValues extends TargetValues{
  set?:boolean
}
interface LabelValues{
  text:string
  disabled:boolean
  target?:string
  style?:any
  classes?:string
}
function LabelRubric (props:LabelValues){
  let htmlFor=props.target,text=props.text,
    className=(props.disabled?'rubricDisabled':'rubric');
  return htmlFor?<label htmlFor={htmlFor} className={className}>
      {text}&nbsp;</label>
    :<span className={className}>
      {text}&nbsp;</span>
}
function LabelText (props:LabelValues){
  return (<span className={props.disabled?'textDisabled':''}>
    {props.text}&nbsp;</span>)
}
class TogglingCheckbox extends Facet<TogglingValues,TogglingValues>{
  protected readUpdate(update):{}{
    return {set:update}
  }
  onChange=(e)=>{
    let set=e.target.checked;
    this.props.facets.updateTargetState(this.props.title,
      set);
    this.setState({
      set:set
    })
  };
  render(){
    return (<span>
      <LabelRubric text={this.props.title} disabled={!this.state.live} target={this.props.title}/>
        <input
          id={this.props.title}
          type="checkbox"
          onChange={this.onChange}
          checked={this.state.set}
          disabled={!this.state.live}
        />
    </span>)
  }
}
function buildIndexing(facets:Facets){
  ReactDOM.render(
    <RowPanel rubric={Test.Indexing}>
      <IndexingDropdown title={SimpleTitles.INDEXING} facets={facets}/>
      <TextualLabel title={SimpleTitles.INDEX} facets={facets}/>
      <TextualLabel title={SimpleTitles.INDEXED} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );
}
function RowPanel(props){
  let children=props.children.map((child)=>{
    return <div className={'panelMount'}>{child}</div>
  });
  return <div className={'panel'}>
    <PanelRubric text={props.rubric} disabled={false} classes={'panelRubric'}/>
    {children}
  </div>
}
function buildAll(facets:Facets){
  let textual1=SimpleTitles.TEXTUAL_FIRST,textual2=SimpleTitles.TEXTUAL_SECOND;
  ReactDOM.render(<div>
      <RowPanel rubric={Test.Textual}>
        <TextualField title={textual1} facets={facets}/>
        <TextualLabel title={textual1} facets={facets}/>
        <TextualField title={textual2} facets={facets} cols={40}/>
        <TextualLabel title={textual2} facets={facets}/>
      </RowPanel>
      <RowPanel rubric={Test.Indexing}>
        <IndexingDropdown title={SimpleTitles.INDEXING} facets={facets}/>
        <TextualLabel title={SimpleTitles.INDEX} facets={facets}/>
        <TextualLabel title={SimpleTitles.INDEXED} facets={facets}/>
      </RowPanel>
      <RowPanel rubric={Test.Toggling}>
        <TogglingCheckbox title={SimpleTitles.TOGGLING} facets={facets}/>
        <TextualLabel title={SimpleTitles.TOGGLED} facets={facets}/>
      </RowPanel>
      <RowPanel rubric={Test.Trigger}>
        <TriggerButton title={SimpleTitles.TRIGGER} facets={facets}/>
        <TextualLabel title={SimpleTitles.TRIGGEREDS} facets={facets}/>
      </RowPanel>
    </div>,
    document.getElementById('root'),
  );
}
class TextualField extends Facet<TextualValues,TextualValues>{
  protected readUpdate(update):{}{
    return {text:update}
  }
  onFieldEnter=(text)=>{
     this.props.facets.updateTargetState(this.props.title,text);
  };
  getStateText=()=>this.state.text;
  render(){
    return (<div  className={'textualField'}>
        <LabelRubric text={this.props.title} disabled={!this.state.live}/>
        <SmartTextField
          getStartText={this.getStateText}
          onEnter={this.onFieldEnter}
          cols={this.props.cols}
          disabled={!this.state.live}
          hint={'Hint'}
        />
      </div>
    );
  }
}
class TextualLabel extends Facet<TextualValues,TextualValues>{
  protected readUpdate(update):{}{
    return {text:update}
  }
  render(){
    let disabled=!this.state.live;
    return (<div>
      <LabelRubric text={this.props.title} disabled={disabled}/>
      &nbsp;
      <LabelText text={this.state.text} disabled={disabled}/>
        </div>)
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
function PanelRubric (props:LabelValues){
  let text=props.text,
    className=props.classes+' '+(props.disabled?'rubricDisabled':'rubric');
  return <div className={className}>
    {text}&nbsp;</div>
}
function buildTextual(facets:Facets){
  let first=SimpleTitles.TEXTUAL_FIRST,second=SimpleTitles.TEXTUAL_SECOND;
  ReactDOM.render(
    <RowPanel rubric={Test.Textual}>
      <TextualField title={first} facets={facets}/>
      <TextualLabel title={first} facets={facets}/>
      <TextualField title={second} facets={facets} cols={40}/>
      <TextualLabel title={second} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );
}
function buildToggling(facets:Facets){
  ReactDOM.render(
    <RowPanel rubric={Test.Toggling}>
      <TogglingCheckbox title={SimpleTitles.TOGGLING} facets={facets}/>
      <TextualLabel title={SimpleTitles.TOGGLED} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );

}
function buildTrigger(facets:Facets){
  ReactDOM.render(
    <RowPanel rubric={Test.Trigger}>
      <TriggerButton title={SimpleTitles.TRIGGER} facets={facets}/>
      <TextualLabel title={SimpleTitles.TRIGGEREDS} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  )
}
interface IndexingValues extends TargetValues{
  selectables?:string[]
  index?:number
}
interface IndexingUiProps{
  selectables:string[]
  disabled:boolean
  selected:string
  rubric:string
}
abstract class IndexingFacet extends Facet<IndexingValues,IndexingValues>{
  protected readUpdate(update){
    return {
      index:update,
      selectables:this.props.facets.getIndexingState(this.props.title).uiSelectables
    }
  }
  indexChanged(index){
    this.props.facets.updateTargetState(this.props.title,index);
  }
  render(){
    let state=this.state;
    return this.renderUi({
      selectables:state.selectables,
      selected:state.selectables[(state as IndexingValues).index],
      disabled:!state.live,
      rubric:this.props.title
    });
  }
  protected abstract renderUi(props:IndexingUiProps);
}
class IndexingDropdown extends IndexingFacet{
  onChange=(e)=>{
    this.indexChanged(e.target.value)
  };
  protected renderUi(props:IndexingUiProps){
    traceThing('IndexingDropdown',props);
    return (<span>
      <LabelRubric text={props.rubric} disabled={props.disabled}/><select
      className={props.disabled?'textDisabled':''}
      disabled={props.disabled}
      onChange={this.onChange}
    >{props.selectables.map((item,index)=>
      item===props.selected?<option selected value={index}>{item}</option>
        :<option value={index}>{item}</option>
    )
    }</select></span>)
  }
}
class IndexingList extends IndexingFacet{
  onClick=(e)=>{
    this.indexChanged(e.target.id);
  };
  onKeyDown=(e)=>{
    alert(e.key)
  };
  protected renderUi(props:IndexingUiProps){
    return (<span>
      <LabelRubric text={props.rubric} disabled={props.disabled}/>
      <div className={'listBox'}
           style={{display:'table'}}
           id={this.props.title}
      >{props.selectables.map((item,index)=>
          <div
            id={index.toString()}
            className={item===props.selected?'listSelected':'listItem'}
            style={{cursor:'default'}}
            tabIndex={-1}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}
          >{item}</div>
        )}</div>
      </span>)
  }
}
function buildSelectingBasic(facets:Facets){
  ReactDOM.render(<RowPanel rubric={Test.SelectingBasic}>
    {false?<IndexingDropdown title={SelectingTitles.SELECT} facets={facets}/>
      :<IndexingList title={SelectingTitles.SELECT} facets={facets}/>}
      <TextualLabel title={SimpleTitles.INDEXED} facets={facets}/>
      <TextualField title={SelectingTitles.EDIT} facets={facets} cols={30}/>
      <TextualLabel title={SelectingTitles.CHARS} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );
}
function buildSelectingPlus(facets:Facets){
  ReactDOM.render(<RowPanel rubric={Test.SelectingPlus}>
      <IndexingList title={SelectingTitles.SELECT} facets={facets}/>
      <TextualField title={SelectingTitles.EDIT} facets={facets} cols={30}/>
      <TriggerButton title={SelectingTitles.UP} facets={facets}/>
      <TriggerButton title={SelectingTitles.DOWN} facets={facets}/>
      <TriggerButton title={SelectingTitles.DELETE} facets={facets}/>
      <TriggerButton title={SelectingTitles.NEW} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );
}
