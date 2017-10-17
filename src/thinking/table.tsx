import React from 'react';
import ReactDOM from 'react-dom';
import {traceThing} from '../Util/Bits';
import {
  FnPassString,
  FnPassBoolean,
  SmartTextField,
} from '../widget/_exports'

interface Product{
  category
  price
  stocked:boolean
  name
}
interface Products{
  products:[Product]
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: 9.99, stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: 29.99, stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: 99.99, stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: 399.99, stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: 199.99, stocked: true, name: 'Nexus 7'}
] as [Product];

interface RowProps{
  product:Product
  key
}
interface CategoryRowProps{
  category
  key
}
class CategoryRow extends React.Component<CategoryRowProps> {
  render() {
    return <tr><th colSpan={2}>{this.props.category}</th></tr>;
  }
}
function categoryRowCode(props:CategoryRowProps){
  return <tr><th colSpan={2}>{props.category}</th></tr>;
}
class Row extends React.Component<RowProps> {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}
function rowCode(props:RowProps){
  var name = props.product.stocked ?
    props.product.name :
    <span style={{color: 'red'}}>
        {props.product.name}
      </span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{props.product.price}</td>
    </tr>
  );
}

class Table extends React.Component<Products> {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product)=>{
      const category=product.category;
      if (category !== lastCategory) {
        rows.push(false?<CategoryRow category={category}
                               key={category} />
        :categoryRowCode({
            category:category,
            key:category
          }));

      }
      rows.push(false?<Row product={product} key={product.name} />
        :rowCode({
          product:product,
          key:product.name
        }));
      lastCategory = category;
    });
    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

interface FilterState{
  filter:string
  inStock:boolean
}
interface SearchBarProps extends FilterState{
  onInStockChange:FnPassBoolean
  onFilterChange:FnPassString
}
class SearchBar extends React.Component<SearchBarProps> {
  onCheckBoxChange=(e)=>{
    this.props.onInStockChange(e.target.checked);
  };
  render() {
    if(false)traceThing('SearchBar',this.props);
    return (
      <div>
        <SmartTextField
          hint={'Search...'}
          startText={this.props.filter}
          onEnter={this.props.onFilterChange}
          isDisabled={()=>true}
        />
        <p><input
          type="checkbox"
          checked={this.props.inStock}
          onChange={this.onCheckBoxChange}
        />Only show products in stock
        </p>
      </div>
    );
  }
}
class FilterableTable extends React.Component<Products,FilterState> {
  constructor(props){
    super(props);
    this.state={
      filter: '',
      inStock:false
    }
  }
  onFilterChange=(filter:string)=>{
    this.setState({
      filter: filter
    });
  };
  onInStockChange=(inStock:boolean)=>{
    this.setState({
      inStock: inStock
    })
  };
  render() {
    const show=[]as[Product];
    this.props.products.forEach((product:Product)=>{
      const filter=this.state.filter,inStock=this.state.inStock;
      var exclude=filter&&!new RegExp(filter,'i').test(product.name)
        ||inStock&&!product.stocked;
      traceThing('FilterableTable',[
        filter,
        inStock,
        product.name
      ]);
      if(!exclude)show.push(product);
    });
    return (
      <div>
        <SearchBar
          onInStockChange={this.onInStockChange}
          onFilterChange={this.onFilterChange}
          filter={this.state.filter}
          inStock={this.state.inStock}/>
        <Table products={show} />
      </div>
    );
  }
}
export function renderTable(){
  ReactDOM.render(
    <FilterableTable products={PRODUCTS} />,
    document.getElementById('root')
  );
}
