<template>
  <div class="create-competition row">
    <div class="col s8 offset-s2">
      <h3>New competition</h3>
      <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>  
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="title" maxlength="200" v-model="competition.title"/>
          <label for="title" class="active">Title</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="datepicker" id="start-date" ref="startDate"/>
          <label for="start-date">Start date</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="timepicker" id="start-time" ref="startTime"/>
          <label for="start-time">Start time</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="datepicker" id="finish-date" ref="finishDate"/>
          <label for="finish-date">Finish date</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="timepicker" id="finish-time" ref="finishTime"/>
          <label for="finish-time">Finish time</label>
        </div>
        <div class="input-field col s12">
          <input type="text" min="1" id="duration" v-model="competition.duration"/>
          <label for="duration" class="active">Duration (hh:mm)</label>
        </div>      
        <div class="input-field col s12">
          <textarea id="description" class="materialize-textarea" v-model="competition.description"></textarea>
          <label for="description" class="active">Description</label>
        </div>
      </div>
      <div class="create-comp-button">
          <button class="btn btn-large" @click="createCompBtnHandler" id="CreateCompBtn">Start</button>
        </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import Flash from 'js-flash-message'
import {toISODate} from '../../utils/DateUtils'

export default {
  name: "newCompetition",
  components: {
    Alert
  },
  data(){
    return {
      competition: {
        test: 0,
        start_time: '',
        finish_time: '',
        duration: '  :  ',
        title: '',
        description: ''
      },
      errors: []
    }
  },
  mounted() {
    let elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems);
    elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems,{twelveHour: false});
    this.getById(this.$route.params.id)
  },
  methods: {
    async getById(id) {
      this.errors = []
      const res = await this.$store.dispatch('tests/getById', id)
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      this.competition.test = res.entity.id
      this.competition.title = res.entity.title
      this.competition.description = res.entity.description
    },
    async createCompBtnHandler() {
      this.errors = []
      this.competition.start_time = toISODate(this.$refs['startDate'].value + ' ' + this.$refs['startTime'].value)
      this.competition.finish_time = toISODate(this.$refs['finishDate'].value + ' ' + this.$refs['finishTime'].value)
      const res = await this.$store.dispatch('competitions/create', this.competition)
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if(res.isSuccess) {
        Flash.create({
          type: "success",
          message: "The competition was started successfully"
        });
        this.$router.push({name: 'myCompetitions'})
      }      
    }
  }
}
</script>

<style>
.create-competition .create-comp-button {
  text-align: center;
  margin-top: 1rem;
}
</style>