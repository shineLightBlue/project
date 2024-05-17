<template>
  <div>
    <li :class="{ editing: editing }">
      <div class="view">
        <input type="checkbox" class="toggle" />
        <label v-text="todo.text" @dblclick="editing = true"></label>
        <button class="destroy"></button>
      </div>
      <input :value="todo.text" class="edit" v-show="editing" />
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editing: false,
    };
  },
  props: {
    todo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>

<style></style>
