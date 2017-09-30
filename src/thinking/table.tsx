import React from 'react';
import ReactDOM from 'react-dom';
import {traceThing} from '../Util/Bits';

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
interface SearchBarProps{
  filterText:string
  inStockOnly:boolean
  onFilterTextChange:(string)=>void
  onInStockChange:(boolean)=>void
}
interface FilterState{
  filterText:string
  inStockOnly:boolean
}
class SearchBar extends React.Component<SearchBarProps> {
  handleFilterTextChange=(e)=>{
    this.props.onFilterTextChange(e.target.value);
  };
  handleInStockChange=(e)=>{
    this.props.onInStockChange(e.target.checked);
  };
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..."
         value={this.props.filterText}
         onChange={this.handleFilterTextChange}
        />
        <p>
          <input type="checkbox"
           checked={this.props.inStockOnly}
           onChange={this.handleInStockChange}
          />
          Only show products in stock
        </p>
      </form>
    );
  }
}
class FilterableTable extends React.Component<Products,FilterState> {
  constructor(props){
    super(props);
    this.state={
      filterText:'filterText',
      inStockOnly:false
    }
  }
  handleFilterTextChange=(filterText)=>{
    if(false)window.alert('handleFilterTextChange');
    this.setState({
      filterText: filterText
    });
  };
  handleInStockChange=(inStockOnly)=>{
    if(false)window.alert('handleInStockChange');
    this.setState({
      inStockOnly: inStockOnly
    })
  };
  render() {
    const props:SearchBarProps={
      filterText:this.state.filterText,
      inStockOnly:this.state.inStockOnly,
      onFilterTextChange:this.handleFilterTextChange,
      onInStockChange:this.handleInStockChange
    };
    if(true)traceThing('SearchBarProps',this.state);
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
