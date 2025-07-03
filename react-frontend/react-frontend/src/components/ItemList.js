import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(res => setItems(res.data));
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => setItems(items.filter(item => item.id !== id)));
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} - {item.description}
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
