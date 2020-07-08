// JS
import "./js/";
// VUEX
import { store } from "./store";
//Vue Router
import VueRouter from "vue-router";
// Axios на всякий
import axios from "axios";
import VueAxios from "vue-axios";
// SCSS
import "./assets/scss/main.scss";
window.Vue = require("vue");
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
// Vue components (for use in html)
import NotesList from "./components/NotesList.vue";
import TodoList from "./components/TodoList.vue";
Vue.component(
  "NotesListItem",
  require("./components/NotesListItem.vue").default
);
Vue.component(
  "action-message",
  require("./components/ActionMessage.vue").default
);
Vue.component("TodoListItem", require("./components/TodoListItem.vue").default);
// Vue init
const routes = [
  { path: "/", component: NotesList },
  { path: "/create/:do/:id", name: "create", component: TodoList }
];
const router = new VueRouter({
  routes
});
const app = new Vue({
  el: "#app",
  router,
  store
});
