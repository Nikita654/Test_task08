<template>
  <div class="todo_list">
    <div class="todo_title">
      <p class="todo_title_name">
        Название заметки:
        <input v-model="title" placeholder="Имя заметки" type="text" />
      </p>
      <div @click="backNotes" class="todo_title_back btn">Вернуться на главную</div>
    </div>
    <div class="todo_list_name">
      <p class="todo_list_name">Список пунктов заметки:</p>
      <TodoListItem v-for="(item, index) in noteItems"
      :key="`noteItem-${index}`"
      :item="item"
      :index="index"
      @deleteItem="delTodoItem"
      />
    </div>
    <div class="todo_list_add">
      <p>
        Новый пункт:
        <input type="text" @keyup.enter="addNewItem" v-model="todoItemName" placeholder="Имя нового пункта" />
        <button @click="addNewItem" class="todo_list_btn">Добавить пункт</button>
      </p>
    </div>
    <div v-if="$route.params.do=='edit'" class="todo_list_control">
      <div @click="editNoteSave" class="todo_list_control_edit btn">Сохранить изменения</div>
      <div @click="editNoteCanc" class="todo_list_control_canceled btn">Отменить изменения</div>
      <div @click="deletNote" class="todo_list_control_canceled btn">Удалить заметку</div>
    </div>
    <div v-if="$route.params.do=='add'" class="todo_list_control">
      <div @click="addNewNote" class="todo_list_control_edit btn">Добавить новую заметку</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "TodoList",
  data() {
    return {
      title: "",
      todoItemName: "",
      noteItems:[],
      reverseTitle:'',
      reverseItems:[],
    };
  },
  computed:{
    ...mapState(
            ['notes']),
    currentNote() {
    return this.$store.getters.getNote(this.$route.params.id);
    },
  },  
  methods: {
      editNoteCanc(type){
        this.$store.commit('changeVisibleMessage',true);
        let note={
            id:this.$route.params.id,
            title: this.reverseTitle,
            items:this.reverseItems,
        }
        let outer={
            nameFunc:"saveNote",
            arg:note
        }
        this.$store.commit('currentDecision',outer);
      },
      editNoteSave(){
          if(this.title!=""&&this.noteItems.length!=0){
        this.$store.commit('changeVisibleMessage',true);
        let note={
            id:this.$route.params.id,
            title: this.title,
            items:this.noteItems,
        }
        let outer={
            nameFunc:"saveNote",
            arg:note
        }
        this.$store.commit('currentDecision',outer);
        }
      },
      deletNote(){
          let outer={
            nameFunc:"delNote",
            arg:this.$route.params.id
        }
        this.$store.commit('currentDecision',outer);
        this.$store.commit('changeVisibleMessage',true);
      },
      delTodoItem(ind){
        if(this.currentNote!=undefined){
         let noteDel={
             id:this.$route.params.id,
             index:ind
         }
        this.$store.commit('deleteNoteItem',noteDel); 
        }else{
            this.noteItems.splice(ind,1);
        }
      },
    backNotes() {
        
      if(this.currentNote!=undefined){
          let note={
            id:this.$route.params.id,
            title: this.reverseTitle,
            items:this.reverseItems,
        }
          this.$store.commit('saveNote',note)
      }
      this.$router.push("/");
    },
    addNewItem(){
        if(this.todoItemName!=''){
            let item={
                name:this.todoItemName,
                status: false,
            }
        this.noteItems.push(item);
        this.todoItemName="";
        }
    },
    addNewNote(){
        if(this.title!=""&&this.noteItems.length!=0){
        this.$store.commit('changeVisibleMessage',true);
        let note={
            id:this.notes.length,
            title: this.title,
            items:this.noteItems,
        }
        let outer={
            nameFunc:"addNotes",
            arg:note
        }
        this.$store.commit('currentDecision',outer);
        //this.$store.commit('addNotes',note);
        }
    }
  },
  watch: {
    // 'lng'(val){
    //}
  },
  mounted() {
      if(this.currentNote!=undefined){
          this.title=this.currentNote.title;
          this.noteItems=this.currentNote.items;
          this.reverseTitle=this.currentNote.title;
          this.currentNote.items.forEach((el,ind) => {
              this.reverseItems[ind]={
                  name:'',
                  status:''
              }
              this.reverseItems[ind].name=el.name;
              this.reverseItems[ind].status=el.status;     
          });
          
      }
    
  }
};
</script>

<style lang="scss" scoped>
input {
  border-bottom: solid 1px black;
  cursor: pointer;
}
.todo {
  &_list {
    background-color: white;
    border-radius: 8px;
    min-width: 1440px;
    height: auto;
    color: black;
    padding: 15px;
    margin: 15px 0;
    font-size: 18px;
    &_btn {
      user-select: none;
      padding: 7px 10px;
      max-width: 300px;
      min-width: 100px;
      text-align: center;
      transition: 1s;
      background-size: 200% auto;
      color: black;
      font-size: 16px;
      border-radius: 8px;
      margin-left: 20px;
      cursor: pointer;
      background-image: linear-gradient(
        to right,
        green 0%,
        #84fab0 51%,
        green 100%
      );
      &:hover {
        background-position: right center;
      }
    }
    &_add {
      margin-top: 20px;
    }
    &_control {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      &_edit,
      &_canceled {
        margin: 0 5px;
        border-radius: 8px;
      }
      &_edit {
        background-image: linear-gradient(
          to right,
          green 0%,
          #84fab0 51%,
          green 100%
        );
      }
      &_canceled {
        background-image: linear-gradient(
          to right,
          red 0%,
          orange 51%,
          red 100%
        );
      }
    }
  }
  &_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &_title_back {
    border-radius: 10px;
    box-shadow: 0 0 20px #eee;
    background-image: linear-gradient(
      to right,
      #f6d365 0%,
      #fda085 51%,
      #f6d365 100%
    );
  }
  &_list_add {
    span {
      color: green;
      cursor: pointer;
      transition-duration: 0.5s;
      &:hover {
        color: rgb(0, 73, 0);
      }
    }
  }
}
@media (max-width: 1480px){
  .main{
    .todo {
  &_list{
     min-width: 1000px;
    }}
  }
}
@media (max-width: 1024px){
  .main{
    .todo {
  &_list{
     min-width: calc(100vw - 30px);
     max-width: calc(100vw - 30px);
    }}
  }
}
@media (max-width: 720px){
  .main{
    .todo {
    &_list_btn{
        margin: 20px auto 10px auto;
        text-align: center;
        display: block;
        padding: 20px;
    }
    &_list_control{
      display: block;
      .btn{
        margin-bottom: 20px;
      }
    }
  &_title{
     display: block;
     &_name{
         margin-bottom: 15px;
     }
    }}
  }
}
</style>
