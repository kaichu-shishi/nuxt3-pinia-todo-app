import { defineStore } from 'pinia'



export interface Todo {
    id: number
    title: string
    completed: boolean
    content: string
    createdAt: Date
}

export const useNewTodo = defineStore('newTodo', {
    state: (): Todo => ({
      id: 0,
      title: '',
      completed: false,
      content: '',
      createdAt: new Date(),
    }),
    actions: {
        reset() {
          this.id = 0
          this.title = ''
          this.completed = false
          this.content = ''
          this.createdAt = new Date()
        },
    },
})

export const useTodo = defineStore('todo', {
    state: () => ({
      todos: [] as Todo[],
      filter: 'all',
    	id: 0,
    }),
		getters: {
			getTodoById() {
				return (id: number) => {
					return this.todos.find((todo) => todo.id === id)
				}
			},
		},
    actions: {
      add(todo: Todo) {
        this.todos.push(todo)
      },
      remove(todo: Todo) {
        const index = this.todos.findIndex((t) => t.id === todo.id)
        this.todos.splice(index, 1)
      },
    },
})