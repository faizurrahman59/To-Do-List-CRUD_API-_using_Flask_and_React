import React, { useState } from 'react';
import axios from 'axios';

function ItemForm() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/items', {
      name,
      description: desc
    }).then(() => {
      setName('');
      setDesc('');
      window.location.reload(); // refresh after add
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" required />
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <button type="submit">Add</button>
    </form>
  );
}

export default ItemForm;
