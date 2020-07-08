<template>
  <div
    @click.self.prevent="canceledAction"
    :class="{'message_hide':!visibleMessage}"
    class="message_outer"
  >
    <div class="message">
      <h2 class="message_title">Согласны?</h2>
      <div class="message_choose">
        <div @click="confirmAction" class="message_choose_da btn">Да</div>
        <div @click="canceledAction" class="message_choose_net btn">Нет</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ActionMessage",
  computed: {
    ...mapState(["visibleMessage", "decision", "notes"])
  },
  methods: {
    confirmAction() {
      if (this.decision.nameFunc != "") {
        this.$store.commit(this.decision.nameFunc, this.decision.arg);
        if (
          (this.decision.nameFunc == "delNote" || "addNotes") &&
          this.$router.match(location).hash != "#/"
        ) {
          this.$router.push("/");
        }
        let outer = {
          nameFunc: "",
          arg: []
        };
        this.$store.commit("currentDecision", outer);
        localStorage.setItem("notes", JSON.stringify(this.notes));
      }
      this.$store.commit("changeVisibleMessage", false);
    },
    canceledAction() {
      this.$store.commit("changeVisibleMessage", false);
    }
  },
  mounted() {
    let notes = localStorage.getItem("notes");
    if (
      notes != null &&
      notes != NaN &&
      notes != undefined &&
      notes != "undefined"
    ) {
      notes = JSON.parse(notes);
      this.$store.commit("newNotes", notes);
    } else {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  min-width: 250px;
  max-width: 320px;
  height: auto;
  color: black;
  padding: 15px;
  font-size: 18px;
  transition-duration: 0.5s;
  &_outer {
    z-index: 10;
    left: 0;
    top: 0;
    position: absolute;
    transition-duration: 0.5s;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.6);
  }
  &_hide {
    z-index: -10;
    opacity: 0;
  }
  &_choose {
    display: flex;
    justify-content: center;
    &_net,
    &_da {
      width: 150px;
      border-radius: 10px;
      margin: 0 5px;
    }
    &_da {
      background-image: linear-gradient(
        to right,
        #f6d365 0%,
        #fda085 51%,
        #f6d365 100%
      );
    }
    &_net {
      background-image: linear-gradient(to right, red 0%, orange 51%, red 100%);
    }
  }
  &_title {
    text-align: center;
    font-size: 20px;
    line-height: 24px;
    margin: 15px 0;
  }
}
</style>
