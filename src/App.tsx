import { useState } from 'react'
import './App.css'
import { Item } from './types'

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');

  // CREATE
  const addItem = () => {
    if (!inputValue) return;
    const newItem: Item = {
      id: Date.now(),
      title: inputValue,
      completed: false
    };
    setItems([...items, newItem]);
    setInputValue('');
  };

  // DELETE
  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // UPDATE (Toggle status)
  const toggleComplete = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meu CRUD com Vite</h1>
      
      {/* Input de Criação */}
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button onClick={addItem}>Adicionar</button>

      {/* READ (Listagem) */}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span 
              onClick={() => toggleComplete(item.id)}
              style={{ textDecoration: item.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {item.title}
            </span>
            <button onClick={() => deleteItem(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App