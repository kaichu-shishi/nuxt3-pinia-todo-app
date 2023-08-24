import { defineStore } from 'pinia'



export interface Todo {
    id: number
    title: string
    completed: boolean
    content: string
    createdAt: Date
}

// 第一引数にはStoreの一意なID、第二引数にStoreの定義を書く
// 新しいToDoを作成するための一時的な箱
export const useNewTodo = defineStore('newTodo', {
    // データの読み書き
    state: (): Todo => ({
      id: 0,
      title: '',
      completed: false,
      content: '',
      createdAt: new Date(),
    }),
    // 各種メソッド
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

// 作成したToDoを保存していく箱
export const useTodo = defineStore('todo', {
    state: () => ({
      todos: [] as Todo[],
      filter: 'all',
    	id: 0,
    }),
    // 加工したデータの読み取り
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