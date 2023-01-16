import { create } from 'zustand';

interface TodoState {
  todos: any[];
  addTodo: (description: string) => void;
  removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void;
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (description: string) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Math.random() * 1000,
          description,
          completed: false,
        } as any,
      ],
    }));
  },
  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  toggleCompletedState: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? ({ ...todo, completed: !todo.completed } as any) : todo
      ),
    }));
  },
}));
