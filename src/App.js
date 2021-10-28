import { useState } from 'react';

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return(
      <form>
        <input 
          type='text' 
          value={filterText} 
          onChange={ e => onFilterTextChange(e.target.value)}
          placeholder='Search...' />
        <label>
          <input 
            type='checkbox' 
            checked={inStockOnly} 
            onChange={(e) => {onInStockOnlyChange(e.target.checked)}} />
          {" "}
          Only show products in stock
        </label>
      </form>      
  );
}

function ProductCategoryRow({category}) {
  return(
    <tr>
      <th colSpan='2'>
        {category}
      </th>
    </tr>
  );

}

function ProductRow({product}) {
  const name = product.stocked ? product.name : 
    <span style={{ color:'red' }}>
      {product.name}
    </span>
  
  return(
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if(product.name.indexOf(filterText) === -1)
      return;
    if(inStockOnly && product.stocked === false)
      return;
    if(sortBy === 'Name') {
      if(sortOrder === 'I') {
        products.sort((a,b) => {
          var keyA = a.name;
          var keyB = b.name;
          if(keyA < keyB)
            return -1;
          if(keyB < keyA)
            return 1;
          return 0;
        })
      }
      if(sortOrder === 'D') {
        products.sort((a,b) => {
          var keyA = a.name;
          var keyB = b.name;
          if(keyA < keyB)
            return 1;
          if(keyB < keyA)
            return -1;
          return 0;
        })
      }
    }
    if(sortBy === 'Price') {
      if(sortOrder === 'I') {
        products.sort((a,b) => {
          var keyA = a.price;
          var keyB = b.price;
          if(keyA < keyB)
            return -1;
          if(keyB < keyA)
            return 1;
          return 0;
        })
      }
      if(sortOrder === 'D') {
        products.sort((a,b) => {
          var keyA = a.price;
          var keyB = b.price;
          if(keyA < keyB)
            return 1;
          if(keyB < keyA)
            return -1;
          return 0;
        })
      }
    }
    
    if(product.category !== lastCategory) {
      rows.push(
      <ProductCategoryRow 
        category={product.category} 
        key={product.category + '-' + product.name} />
      );
    }
    rows.push(
    <ProductRow 
      product={product} 
      key={product.name} />
      );
    lastCategory = product.category;
  });

  return(
    <table>
      <thead>
        <tr>
          <th><span 
            onClick={() => {
              setSortBy('Name');
              if(sortOrder === null)
                setSortOrder('I');
              else if(sortOrder === 'I')
                setSortOrder('D');
              else
                setSortOrder('I')
            }}>
              Name{ sortBy==='Name' ? (sortOrder==='I' ? '↑' : '↓') : '' }
              </span></th>
          <th><span 
            onClick={() => {
              setSortBy('Price');
              if(sortOrder === null)
                setSortOrder('I');
              else if(sortOrder === 'I')
                setSortOrder('D');
              else
                setSortOrder('I')
            }}>
              Price{ sortBy==='Price' ? (sortOrder==='I' ? '↑' : '↓') : '' }
              </span></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return(
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Fruits", price: "$8", stocked: true, name: "Strawberry"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function App() {
  return(
      <FilterableProductTable products={PRODUCTS} />
  );
}



export default App;