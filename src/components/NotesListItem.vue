<template>
  <div class="notes_item_outer">
    <div class="notes_item">
      <h2 class="notes_item_title">{{note.title}}</h2>
      <ul class="notes_item_list">
        <li
          v-for="(item, index) in note.items.slice(0,count)"
          :key="`notelistli-${index}`"
          class="notes_item_list_el"
        >{{item.name}}</li>
      </ul>
      <div @click="editNote" class="notes_item_edit btn">Изменить</div>
      <div @click="delNote" class="notes_item_del btn">Удалить</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NotesListItem",
  data() {
    return {
      count: 2
    };
  },
  computed: {
    ...mapState(["decision"])
  },
  methods: {
    editNote() {
      this.$router.push({
        name: "create",
        params: { do: "edit", id: this.index }
      });
    },
    delNote() {
      let outer = {
        nameFunc: "delNote",
        arg: this.index
      };
      this.$store.commit("currentDecision", outer);
      this.$store.commit("changeVisibleMessage", true);
    }
  },
  props: {
    note: Object,
    index: Number
  },
  mounted() {
    this.count = window.screen.availWidth < 720 ? 1 : 2;
  }
};
</script>

<style lang="scss" scoped>
.notes_item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  &_outer {
    margin-bottom: 20px;
    transition-duration: 0.5s;
    background-color: #aaa;
    padding: 5px 40px;
    border-radius: 40px;
  }
  &_title {
    padding-right: 40px;
    margin-right: 60px;
    border-right: white dashed 1px;
    line-height: 52px;

    text-overflow: ellipsis;
  }
  &_list {
    &_el {
      list-style-type: disc;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    list-style-type: disc;
  }
  &_del,
  &_edit {
    position: absolute;
    height: 100%;
    top: 0;
    opacity: 0;
    transform: translateX(-100px);
    transition-duration: 1.5s;
  }
  &_edit {
    right: 102px;
    background-image: linear-gradient(
      to right,
      green 0%,
      #84fab0 51%,
      green 100%
    );
  }
  &_del {
    right: 0;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    background-image: linear-gradient(to right, red 0%, orange 51%, red 100%);
  }
  &_outer:hover {
    background-color: #ccc;
    color: #191919;
    .notes_item_del,
    .notes_item_edit {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}
@media (max-width: 720px) {
  .main {
    .notes_item {
      &_title {
        padding-right: 15px;
        margin-right: 25px;
      }
      &_outer {
        padding: 5px 10px;
      }
    }
  }
}
</style>
