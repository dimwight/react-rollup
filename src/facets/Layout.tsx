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
  };
  componentDidMount(){
    this.didMount=true;
    const props=this.props;
    traceThing(props.title+'.componentDidMount',this.state)
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
      <p>{this.props.title}
        <input
          type="checkbox"
          onChange={this.onChange}
          checked={this.state.set}
          disabled={!this.state.live}
        />
      </p>
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
    return (<span>
      <span className={'caption'}>{this.props.title}</span>&nbsp;
      <select
        disabled={!this.state.live}
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
        <span className={'caption'}>{this.props.title}</span>&nbsp;
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
    return (<span>
      <span className={'caption'}>{this.props.title}</span>
      &nbsp;{this.state.text}
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
function buildTrigger(facets:Facets){
  ReactDOM.render(
    <div>
      <div><TriggerButton title={Titles.TRIGGER} facets={facets}/></div>
      <div><TextualLabel title={Titles.TRIGGEREDS} facets={facets}/></div>
    </div>,
    document.getElementById('root'),
  )
}
function buildToggling(facets:Facets){
  ReactDOM.render(
    <span>
      <TogglingCheckbox title={Titles.TOGGLING} facets={facets}/>
      <TextualLabel title={Titles.TOGGLED} facets={facets}/>
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
function buildAll(facets:Facets){
  const first=Titles.TEXTUAL_FIRST,second=Titles.TEXTUAL_SECOND,
    indexing=Titles.INDEXING;
  ReactDOM.render(<div>
    <div className={'spaced'}>
      <div><TextualField title={first} facets={facets}/></div>
      <div><TextualLabel title={first} facets={facets}/></div>
      <div><TextualField title={second} facets={facets} cols={40}/></div>
      <div><TextualLabel title={second} facets={facets}/></div>
    </div>
      <div className={'spaced'}>
        <IndexingDropdown
          title={indexing}
          selectables={facets.getIndexingState(indexing).uiSelectables}
          facets={facets}/>
      <div><TextualLabel title={Titles.INDEX} facets={facets}/></div>
      <div><TextualLabel title={Titles.INDEXED} facets={facets}/></div>
      </div>
      <div className={'spaced'}>
      <TogglingCheckbox title={Titles.TOGGLING} facets={facets}/>
      <TextualLabel title={Titles.TOGGLED} facets={facets}/>
    </div>
    </div>,
    document.getElementById('root'),
  );
}
