<template>
  <div class="top">
    <section class="todoapp">
      <header class="header">
        <input placeholder="Todo List" class="new-todo" />
      </header>
      <section class="main">
        <input type="checkbox" class="toggle-all" id="toggle-all" />
        <label for="toggle-all" />
        <ul class="todo-list">
          <todo
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :todo="todo"
          />
        </ul>
      </section>
    </section>
    <dialog-box :visible.sync="dialogVisible"></dialog-box>
  </div>
  <!-- dialog-box的遮罩层和显示层都设置了固定定位，并且显示层的z-index比遮罩层大 -->
  <!-- top设置固定定位后，由于top的层级比遮罩层小，因此会被遮罩层盖住 top里面的元素z-index失效-->
</template>

<script>
import dialogBox from "./dialogBox.vue";

import Todo from "./Todo.vue";
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.done),
  completed: (todos) => todos.filter((todo) => todo.done),
};
const defalutList = [
  { text: "star this repository", done: false },
  { text: "fork this repository", done: false },
  { text: "follow author", done: false },
  { text: "vue-element-admin", done: true },
  { text: "vue", done: true },
  { text: "element-ui", done: true },
  { text: "axios", done: true },
  { text: "webpack", done: true },
];
export default {
  data() {
    return {
      dialogVisible: true,
      visibility: "all",
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: defalutList,
    };
  },
  components: { Todo, dialogBox },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
  },
};
</script>

<style lang="scss">
.top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.todoapp {
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  background: #fff;
}
.new-todo {
  position: relative;
  border: 1px solid #999;
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  margin: 0;
  // border: 0;
  line-height: 1.4em;
  padding: 10px 16px 16px 60px;
}
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main {
  position: relative;
  border-top: 1px solid #e6e6e6;
}
.toggle-all {
  text-align: center;
  border: none;
  // /* Mobile Safari */
  opacity: 0;
  position: absolute;
}
.toggle-all + label {
  width: 60px;
  height: 34px;
  // background-color: aqua;
  position: absolute;
  top: -52px;
  left: -13px;
  transform: rotate(90deg);
}
.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}
.todo-list li {
  position: relative;
  font-size: 24px;
}
.todo-list li .destroy {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  font-size: 30px;
  display: none;
  transition: color 0.2s ease-out;
  margin: auto 0;
  cursor: pointer;
}
.todo-list li .destroy:after {
  content: "×";
}
.todo-list li:hover .destroy {
  display: block;
}
.todo-list li .destroy:hover {
  color: #af5b5e;
}
.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}
.todo-list li.editing .view {
  display: none;
}
.todo-list li .toggle {
  width: 40px;
  margin: auto 0;
}
.todo-list li .toggle + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 36px;
}
.todo-list li .toggle:checked + label {
  background-size: 36px;
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}
</style>
