<template>
  <div>
    <h1>普通のToDoApp</h1>

    <h2>タスク追加</h2>
    <!-- v-modelはVue.jsで用意してある、変数とタグの値を同期する機能（双方向データバインディング） -->
    <input v-model="taskName">
    <!-- 「@」はv-onの省略形。 -->
    <button @click="addTask()">追加</button>

    <h2>タスク一覧</h2>
    <!-- 「v-」はディレクティブ。v-forはリアクティブな振る舞いをするfor文。「:」はv-bindの省略形で、リアクティブな変数をHTMLの属性に渡す役割。 -->
    <div v-for="taskName in taskNameList" :key="taskName">
      {{ taskName }}
      <button @click="completeTask(taskName)">完了</button>
    </div>
  </div>

  <hr>
  <hr>
  <hr>

  <!-- piniaを使ったTodoアプリ -->
  <h1>Piniaを使ったToDoアプリ</h1>
  <div>
    <input
      v-model="newTodo.title"
      placeholder="ToDoのタイトル"
    />
    <input
      v-model="newTodo.content"
      placeholder="ToDoの内容"
    />
    <button
      @click.prevent="onCreateTodo"
    >ToDoを追加</button>
    <div v-if="todoState.todos.length > 0">
        <div v-for="todo in todoState.todos" :key="todo.id">
          <p>{{ todo.id }}</p>
          <p>{{ todo.title }}</p>
          <p>{{ todo.content }}</p>
          <p>{{ new Date(todo.createdAt) }}</p>
          <button @click="onRemoveTodo(todo)">削除</button>
        </div>
      </div>
  </div>
</template>





<script setup lang="ts">
/* ========================
普通のToDoアプリ
========================= */
// refによって定数taskNameがリアクティブになる
// リアクティブになると、そのデータが変化した内容が即座にDOMに反映されるようになる（＝DOMが再レンダリングされる）
// ReactでいうならuseStateやuseEffectに該当する
const taskName = ref<string>('')
const taskNameList = ref<string[]>(['vue', 'Vue3', 'Nuxt3']);

const addTask = () => {
  if(taskName.value === '') {
    return;
  }
  taskNameList.value.push(taskName.value);
  taskName.value = '';
}

// taskNameList配列のうち、値がcompletedTaskName以外のものを抽出する
const completeTask = (completedTaskName: string) => {
  taskNameList.value = taskNameList.value.filter((taskName: string) => {
    return completedTaskName !== taskName
  });
}



/* ========================
piniaを使ったToDoアプリ
========================= */
import { Todo, useNewTodo, useTodo } from '~/stores/todo'

const todoState = useTodo()
const newTodo = useNewTodo()
const onCreateTodo = () => {
  todoState.add({
    id: todoState.todos.length + 1,
    title: newTodo.title,
    content: newTodo.content,
    completed: false,
    createdAt: new Date(),
  })
  newTodo.reset()
}
const onRemoveTodo = (todo: Todo) => {
  todoState.remove(todo)
}
</script>