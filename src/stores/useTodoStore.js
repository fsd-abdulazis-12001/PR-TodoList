import { create } from 'zustand'
import {v4 as uuidv4} from 'uuid';
uuidv4();


const useTodoStore = create((set) => ({
  todos: [],
  deleteMultipleTodos: (ids) => set((state) => ({
    todos: state.todos.filter(todo => !ids.includes(todo.id))
  })),
  addTodo: (task) => set((state) => ({
    todos: [...state.todos, { id: uuidv4(), taskname: task , type: "todo",completed: false, isEditing: false }]
   
  })),
  changeTodoType: (id, type) => set((state) => ({
    todos: state.todos.map(todo => todo.id === id ? {...todo, type} : todo)
  }))
  ,
 
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
 

  editTodo: (id,finaltext) => set((state) => ({
    todos: state.todos.map(todo => todo.id === id ? {
      ...todo, taskname: finaltext
    } : todo)
  })),
  cleanTodos: () => set(() => ({
    todos: []
  })),
}));

export default useTodoStore;
