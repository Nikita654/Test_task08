<template>
  <div class="todo_list_item">
    <p class="todo_list_name">
      <input v-model="item.status" type="checkbox" />
      <span ref="text" contenteditable="true" @input="onChangeText" v-text="item.name"></span>
      <span class="todo_list_item_del" @click="delItem">/Удалить</span>
      <span v-show="accept" class="todo_list_item_accept" @click="acceptItem">/Принять изменения</span>
      <span
        v-show="accept"
        class="todo_list_item_del"
        @click="acceptItemCanc"
      >/Отменить последнее изменение</span>
    </p>
  </div>
</template>


<script>
export default {
  name: "TodoListItem",
  data() {
    return {
      accept: false,
      textChange: ""
    };
  },
  props: {
    item: Object,
    index: Number
  },
  methods: {
    acceptItem() {
      this.item.name = this.textChange;
      this.accept = false;
    },
    acceptItemCanc() {
      this.$refs.text.innerHTML = this.item.name;
      this.accept = false;
    },
    onChangeText(e) {
      this.accept = true;
      this.textChange = e.target.innerHTML;
    },
    delItem() {
      this.$emit("deleteItem", this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
.todo_list_item {
  margin: 10px 0 10px 30px;
  input {
    cursor: pointer;
  }
  &_del {
    cursor: pointer;
    color: red;
    transition-duration: 0.5s;
    &:hover {
      color: rgb(114, 0, 0);
    }
  }
  &_accept {
    cursor: pointer;
    color: green;
    transition-duration: 0.5s;
    &:hover {
      color: rgb(0, 73, 0);
    }
  }
}
</style>
