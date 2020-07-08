<template>
  <div class="notes">
    <div class="notes_title">
      <p class="notes_title_name">Список заметок:</p>
      <div @click="newNote" class="notes_title_add btn">Создать новую заметку</div>
    </div>
    <div class="notes_list">
      <NotesListItem
        v-for="(note, index) in notes"
        :key="`noteItemEl-${index}`"
        :note="note"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NotesList",
  computed: {
    ...mapState(["notes"])
  },
  methods: {
    newNote() {
      this.$router.push({ name: "create", params: { do: "add", id: "-1" } });
    }
  }
};
</script>

<style lang="scss">
.main {
  position: relative;
  background-color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  .notes {
    background-color: white;
    border-radius: 8px;
    min-width: 1440px;
    height: auto;
    color: black;
    padding: 15px;
    margin: 15px 0;
    font-size: 18px;

    &_title_add {
      margin: 20px 10px 10px;
      border-radius: 10px;
      box-shadow: 0 0 20px #eee;
      background-image: linear-gradient(
        to right,
        #f6d365 0%,
        #fda085 51%,
        #f6d365 100%
      );
    }
    &_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.btn {
  user-select: none;
  padding: 20px;
  max-width: 300px;
  min-width: 100px;
  text-align: center;
  transition: 1s;
  background-size: 200% auto;
  color: black;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-position: right center;
  }
}
button {
  -webkit-appearance: none;
}
.fade {
  &-enter-active {
    transition: all 0.5s ease;
  }
  &-leave-active {
    transition: all 0.5s ease;
    position: absolute;
    z-index: -5;
  }
  &-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }
  &-enter {
    opacity: 0;
    transform: translateX(-100px);
  }
}
@media (max-width: 1480px) {
  .main {
    .notes {
      min-width: 1000px;
    }
  }
}
@media (max-width: 1024px) {
  .main {
    height: auto;

    min-height: 100vh;
    .notes {
      min-width: calc(100vw - 30px);
      max-width: calc(100vw - 30px);
    }
  }
}
</style>
