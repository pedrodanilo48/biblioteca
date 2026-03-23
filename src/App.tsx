import { useState, useEffect } from 'react';
import type { Item } from './types';

function App() {
  // Inicializamos o estado. Dica: você pode inicializar direto do localStorage 
  // para evitar o "flash" de lista vazia no carregamento.
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('minha-lista-crud');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  // Sincronização automática com localStorage
  useEffect(() => {
    localStorage.setItem('minha-lista-crud', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!inputValue.trim()) return;
    const newItem: Item = {
      id: Date.now(),
      title: inputValue,
      completed: false
    };
    setItems([...items, newItem]);
    setInputValue('');
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Tarefas</h1>
      <div className="flex gap-2 mb-6">
        <input 
          className="border p-2 rounded"
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="O que precisa ser feito?"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addItem}
        >
          Salvar
        </button>
      </div>

      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm">
            <span>{item.title}</span>
            <button 
              className="text-red-500 hover:underline"
              onClick={() => deleteItem(item.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;