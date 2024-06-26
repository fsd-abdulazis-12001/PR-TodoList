import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useTodoStore = create((set, get) => ({
  todos: [],
  selectedTodos: [],
  editingId: null,
  filter: 'all',
  
  deleteMultipleTodos: (ids) => set((state) => ({
    todos: state.todos.filter(todo => !ids.includes(todo.id)),
    selectedTodos: state.selectedTodos.filter(id => !ids.includes(id))
  })),
  
  addTodo: (task) => set((state) => ({
    todos: [...state.todos, { id: uuidv4(), taskname: task, type: 'todo', completed: false }]
  })),
  
  changeTodoType: (id, type) => set((state) => ({
    todos: state.todos.map(todo => todo.id === id ? { ...todo, type } : todo)
  })),
  
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  editTodo: (id, finaltext) => set((state) => ({
    todos: state.todos.map(todo => todo.id === id ? { ...todo, taskname: finaltext } : todo)
  })),
  
  setEditingId: (id) => set((state)=>({...state, editingId : id})),
  
  handleSelectTodo: (id) => set((state) => ({
    selectedTodos: state.selectedTodos.includes(id)
      ? state.selectedTodos.filter(todoId => todoId !== id)
      : [...state.selectedTodos, id]
  })),
  
  setFilter: (type) => set((state) => ({...state, filter: type})),
 


  handleTodoFilterChange: (id, newtype) => set((state) => ({
    todos: state.todos.map(todo => todo.id === id ? { ...todo, type : newtype } : todo)
  })),
  filteredTodos: () => {
    const todos  = get().todos;
    const filter  = get().filter;
    if (filter === 'all') return todos;
    return todos.filter(todo => todo.type === filter);
  }
 
}));

export default useTodoStore;
