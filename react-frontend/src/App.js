import React, { useState, useEffect } from 'react';
import './App.css'; // we'll style this file separately

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleAddOrUpdate = () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5000/items/${editingId}`
      : 'http://localhost:5000/items';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    })
      .then(res => res.json())
      .then(data => {
        if (editingId) {
          setItems(items.map(item => (item.id === editingId ? data : item)));
        } else {
          setItems([...items, data]);
        }
        setName('');
        setDescription('');
        setEditingId(null);
      });
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/items/${id}`, { method: 'DELETE' })
      .then(() => setItems(items.filter(item => item.id !== id)));
  };

  return (
    <div className="container">
      <h1>📝 Smart Item Manager</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? '🔁 Update Item' : '➕ Add Item'}
        </button>
      </div>

      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item-card">
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(item)}>✏️</button>
              <button onClick={() => handleDelete(item.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
