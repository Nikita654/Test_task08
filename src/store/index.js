import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    visibleMessage: false,
    notes: [
      {
        id: 0,
        title: "Квартира",
        items: [
          {
            name: "Помыть посуду",
            status: false
          },
          {
            name: "Убрать вещи по своим местам",
            status: false
          }
        ]
      },
      {
        id: 1,
        title: "Дача",
        items: [
          {
            name: "Протереть пыль",
            status: false
          },
          {
            name: "Помыть полы",
            status: false
          }
        ]
      },
      {
        id: 2,
        title: "Дом",
        items: [
          {
            name: "Прибрать обувь",
            status: false
          },
          {
            name: "Погладить одежду",
            status: false
          }
        ]
      }
    ],
    decision: {}
  },
  getters: {
    getNote: state => id => {
      let index = -1;
      index = state.notes.findIndex(el => el.id == id);
      if (index != -1) {
        return state.notes[index];
      }
    }
  },
  mutations: {
    newNotes(state, notes) {
      state.notes = notes;
    },
    saveNote(state, note) {
      let index = -1;
      index = state.notes.findIndex(el => el.id == note.id);
      if (index != -1) {
        state.notes[index] = note;
      }
    },
    delNote(state, id) {
      let index = -1;
      index = state.notes.findIndex(el => el.id == id);
      if (index != -1) {
        state.notes.splice(index, 1);
      }
    },
    deleteNoteItem(state, note) {
      let index = -1;
      index = state.notes.findIndex(el => el.id == note.id);
      if (index != -1) {
        state.notes[index].items.splice(note.index, 1);
      }
    },
    addNotes(state, note) {
      state.notes.push(note);
      console.log(state.notes);
    },
    currentDecision(state, outer) {
      state.decision = outer;
    },
    changeVisibleMessage(state, status) {
      state.visibleMessage = status;
    }
  },
  actions: {}
});
