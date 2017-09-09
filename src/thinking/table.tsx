import React from 'react';
import ReactDOM from 'react-dom';

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

interface ProductRowProps{
  product:Product
}
interface ProductCategoryRowProps{
  category
  key
}
class ProductCategoryRow extends React.Component<ProductCategoryRowProps> {
  render() {
    return <tr><th colSpan={2}>{this.props.category}</th></tr>;
  }
}
class ProductRow extends React.Component<ProductRowProps> {
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

class ProductTable extends React.Component<Products> {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product)=>{
      if (product.category !== lastCategory)
        rows.push(<ProductCategoryRow category={product.category}
                                      key={product.category} />);
      else rows.push(<ProductRow product={product} key={product.name} />);
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
  filterText
  inStockOnly:boolean
}
interface SearchBarProps extends FilterState{
  filterText
  inStockOnly:boolean
  onFilterTextInput
  onInStockInput
}
class SearchBar extends React.Component<SearchBarProps>{
  handleFilterTextInputChange=(e)=>{
    this.props.onFilterTextInput(e.target.value);
  };
  handleInStockInputChange=(e)=>{
    this.props.onInStockInput(e.target.checked);
  };
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}
class FilterableProductTable extends React.Component<Products,FilterState> {
  constructor(props){
    super(props);
    this.state={
      filterText:'',
      inStockOnly:false
    };
  }
  handleFilterTextInput=(filterText)=>{
    this.setState({
      filterText: filterText
    });
  };
  handleInStockInput=(inStockOnly)=>{
    // window.alert();
    this.setState({
      inStockOnly: inStockOnly
    })
  };
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
        />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}
export function table(){
  ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
  );
}
