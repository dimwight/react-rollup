import React from 'react';
import ReactDOM from 'react-dom';
import {traceThing} from '../Util/Bits';
import * as tf from '../widget/TextField'

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
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
] as [Product];

interface RowProps{
  product:Product
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
class Table extends React.Component<Products> {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(<CategoryRow category={product.category}
                               key={product.category} />);
      }
      rows.push(<Row product={product} key={product.name} />);
      lastCategory = product.category;
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
  onInStockChange:tf.BooleanFn
  onFilterChange:tf.StringFn
}
class SearchBar extends React.Component<SearchBarProps> {
  onCheckBoxChange=(e)=>{
    this.props.onInStockChange(e.target.checked);
  };
  render() {
    return (
      <div>
        <tf.TextField
          hint={'Search...'}
          startText={this.props.filter}
          onEnter={this.props.onFilterChange}
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
    window.alert(filter)
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
    const props:SearchBarProps={
      filter:this.state.filter,
      inStock:this.state.inStock,
      onFilterChange:this.onFilterChange,
      onInStockChange:this.onInStockChange
    };
    traceThing('SearchBarProps',props);
    return (
      <div>
        <SearchBar{...props} />
        <Table products={this.props.products} />
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
