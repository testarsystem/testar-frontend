<template>
  <div class="competition">
    <Loader v-if="isLoading" />
    <div class="title" v-else ref="title">
      <h3>{{competition.title}}</h3>
      <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
      <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
      <div class="row info" v-if="!isLoading && !stickyTitle">
        <div class="col s12 l4">
          <b>Start time</b>
          : {{competition.start_time}}
        </div>
        <div class="col s12 l4">
          <b>Finish time</b>
          : {{competition.finish_time}}
        </div>
        <div class="col s12 l4">
          <b>Duration</b>
          : {{competition.duration}}
        </div>
      </div>
      <div class="row description" v-if="!isLoading && !stickyTitle">
        <div class="col s12">
          <p>{{competition.description}}</p>
        </div>
      </div>
      <div class="times" v-if="!isLoading">
        <h5>Total: {{test.questions.length}}</h5>
        <h5>Time: {{displayTime}}</h5>
      </div>
    </div>
    <Test
      v-if="!isLoading && test.questions.length > 0 && !competition.completed"
      :questions="test.questions"
      :enableDeleteQuestion="enableDeleteQuestion"
      :enableEdit="enableEditTest"
      :enableCheck="!timer.timeIsOff"
      :checkOption="submit"
    />
    <div class="complete-button" v-if="!isLoading && !competition.completed">
      <button class="btn btn-large" id="CompleteBtn" @click="completeBtnHandler">Complete</button>
    </div>
    <div class="row test" v-if="!isLoading && completed.id">
      <div class="col s12 card">
        <div class="card-content">
          <span class="card-title">Report</span>
          <p>
            <b>Start time:</b> {{completed.start_time}}<br>
            <b>Finish time:</b> {{completed.end_time}}<br>
            <b>Score:</b> {{completed.points}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Test from "@/components/Test.vue";
import Alert from "@/components/Alert.vue";
import operationResult from "../../store/OperationResult";
import Loader from "@/components/Loader.vue";
import { convertTimeToSeconds } from "../../utils/DateUtils";
export default {
  name: "Competition",
  components: {
    Test,
    Alert,
    Loader
  },
  data() {
    return {
      competition: {
        id: 0,
        title: "",
        description: "",
        created: "",
        start_time: "",
        finish_time: "",
        duration: "",
        completed: false
      },
      completed: {
        start_time: '',
        end_time: '',
        points: '',
        id: null
      },
      test: {
        questions: []
      },
      errors: [],
      successes: [],
      isLoading: false,
      stickyTitle: false,
      timer: {
        timeLeft: 0,
        timeIsOff: false,
        intervalTimer: null,
        stopTime: null
      }
    };
  },
  computed: {
    enableDeleteQuestion() {
      return false;
    },
    enableEditTest() {
      return false;
    },
    displayTime() {
      let hours = parseInt(this.timer.timeLeft / 3600);
      let minutes = parseInt((this.timer.timeLeft % 3600) / 60);
      let seconds = (this.timer.timeLeft % 3600) % 60;
      return `${hours < 0 ? "-" : ""}${
        Math.abs(hours) < 10 ? "0" : ""
      }${Math.abs(hours)}:${minutes < 0 ? "-" : ""}${
        Math.abs(minutes) < 10 ? "0" : ""
      }${Math.abs(minutes)}:${seconds < 0 ? "-" : ""}${
        Math.abs(seconds) < 10 ? "0" : ""
      }${Math.abs(seconds)}`;
    }
  },
  methods: {
    async getById(id) {
      this.clearAlerts();
      this.isLoading = true;
      let res = await this.$store.dispatch("competitions/getById", id);
      if (res.errors.length < 1) {
        res.errors = await this.start(
          id,
          res.entity.finish_time,
          res.entity.duration
        );
        if (res.errors.length < 1) {
          this.competition.id = res.entity.id;
          this.competition.title = res.entity.title;
          this.competition.description = res.entity.description;
          this.competition.created = res.entity.created;
          this.competition.start_time = res.entity.start_time;
          this.competition.finish_time = res.entity.finish_time;
          this.competition.duration = res.entity.duration;
          if (res.entity.test) this.test = res.entity.test;
        } else
          res.errors.forEach(item => {
            this.errors.push(item.message);
          });
      } else {
        res.errors.forEach(item => {
          this.errors.push(item.message);
        });
      }
      this.isLoading = false;
    },
    async start(id, finish_time, duration) {
      let res = { errors: [] };
      const stopTime = localStorage.getItem("stopTime");
      let compId = localStorage.getItem("id");
      if (compId) {
        compId = window.atob(compId);
      }
      if (compId == id && stopTime) {
        this.timer.stopTime = window.atob(stopTime);
        this.timer.timeLeft = Math.round(
          (this.timer.stopTime - Date.now()) / 1000
        );
      } else {
        res = await this.$store.dispatch("competitions/start", id);
        if (res.errors.length < 1) {
          this.timer.stopTime = this.countStopTime(finish_time, duration);
          localStorage.setItem("stopTime", window.btoa(this.timer.stopTime));
          localStorage.setItem("id", window.btoa(id));
          this.timer.timeLeft = Math.round(
            (this.timer.stopTime - Date.now()) / 1000
          );
        }
      }
      return res.errors;
    },
    async completeBtnHandler() {
      this.clearAlerts();
      this.isLoading = true;
      const res = await this.$store.dispatch(
        "competitions/finish",
        this.competition.id
      );
      this.isLoading = false;
      if (res.errors.length > 0)
        res.errors.forEach(item => {
          this.errors.push(item.message);
        });
      else {
        if (res.errors.length < 1) {
          clearInterval(this.timer.intervalTimer);
          localStorage.removeItem("id");
          localStorage.removeItem("stopTime");
          this.successes.push(`Your score is ${res.entity.points}`);
          this.competition.completed = true
          this.completed = res.entity
        }
      }
    },
    clearAlerts() {
      this.errors = [];
      this.successes = [];
    },
    handleScroll(event) {
      if (!this.isLoading) {
        const title = this.$refs["title"];
        const sticky = title.offsetTop - 50;
        if (!this.competition.completed && window.pageYOffset > sticky && window.pageYOffset > 50) {
          this.stickyTitle = true;
          title.classList.add("sticky");
          title.classList.add("container");
        } else {
          this.stickyTitle = false;
          title.classList.remove("sticky");
          title.classList.remove("container");
        }
      }
    },
    startTimer() {
      if (!this.timer.timeIsOff && this.timer.timeLeft > 0) {
        this.timer.intervalTimer = setInterval(() => {
          this.timer.timeLeft = Math.round(
            (this.timer.stopTime - Date.now()) / 1000
          );
          if (this.timer.timeLeft < 1) {
            this.timer.timeIsOff = true;
            clearInterval(this.timer.intervalTimer);
          }
        }, 1000);
      } else {
        this.timer.timeIsOff = true;
      }
    },
    countStopTime(finish_time, duration) {
      const finishRemain = new Date(finish_time) - Date.now();
      const durationRemain = convertTimeToSeconds(duration) * 1000;
      return Math.min(Math.max(finishRemain, 0), durationRemain) + Date.now();
    },
    async submit(question, answer, id) {
      let res = {
        errors: []
      };
      let ansIndex = -1;
      let qIndex = this.test.questions.findIndex(q => {
        return q.id == question;
      });
      if (qIndex >= 0) {
        ansIndex = this.test.questions[qIndex].answers.findIndex(a => {
          return a.id == answer;
        });
      }
      if (id) {
        res = await this.$store.dispatch("competitions/deleteSubmit", {
          id: this.competition.id,
          answer: id
        });
        if (ansIndex >= 0)
          this.test.questions[qIndex].answers[ansIndex].submit = null;
      } else {
        res = await this.$store.dispatch("competitions/submit", {
          id: this.competition.id,
          question,
          answer
        });
        if (ansIndex >= 0)
          this.test.questions[qIndex].answers[ansIndex].submit = res.entity.id;
      }
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
    }
  },
  async mounted() {
    await this.getById(this.$route.params.id);
    this.startTimer();
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
.competition .description .col,
.competition .info .col {
  padding: 0 !important;
}

.competition .description.row,
.competition .info.row {
  margin-bottom: 0 !important;
}

.competition .complete-button {
  text-align: center;
  margin-top: 1rem;
}

.competition .times {
  display: flex;
}

.competition .times h5:nth-child(2) {
  margin-left: auto;
}

.competition .sticky {
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding-bottom: 10px;
}

.sticky + .test {
  padding-top: 160px;
}
</style>