<template>
  <div class="edit-competition row">
    <div class="col s8 offset-s2">
      <div class="title">
        <h3>Edit competition</h3>
        <button class="btn btn-small" @click="editCompBtnHandler">cancel</button>
      </div> 
      <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert> 
      <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
      <Loader v-if="isLoading"/> 
      <div class="row" v-else>
        <div class="input-field col s12">
          <input type="text" id="title" maxlength="200" v-model="competition.title" @change="inputOnChangeListener"/>
          <label for="title" class="active">Title</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="datepicker" id="start-date" ref="startDate" @change="inputOnChangeListener"/>
          <label for="start-date" class="active">Start date</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="timepicker" id="start-time" ref="startTime" @change="inputOnChangeListener"/>
          <label for="start-time" class="active">Start time</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="datepicker" id="finish-date" ref="finishDate" @change="inputOnChangeListener"/>
          <label for="finish-date" class="active">Finish date</label>
        </div>
        <div class="input-field col s6">
          <input type="text" class="timepicker" id="finish-time" ref="finishTime" @change="inputOnChangeListener"/>
          <label for="finish-time" class="active">Finish time</label>
        </div>
        <div class="input-field col s12">
          <input type="text" min="1" id="duration" v-model="competition.duration" @change="inputOnChangeListener"/>
          <label for="duration" class="active">Duration (hh:mm)</label>
        </div>      
        <div class="input-field col s12">
          <textarea id="description" class="materialize-textarea" v-model="competition.description" @change="inputOnChangeListener"></textarea>
          <label for="description" class="active">Description</label>
        </div>
      </div>
      <div class="update-comp-button" v-if="!isLoading">
        <button class="btn btn-large" @click="updateCompBtnHandler" id="UpdateCompBtn">Update competition</button>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import Flash from 'js-flash-message'
import {toISODate} from '../../utils/DateUtils'
import Loader from '@/components/Loader.vue'
import ActionsEnum from '../../utils/ActionsEnum'

export default {
  name: "editCompetition",
  components: {
    Alert,
    Loader
  },
  data(){
    return {
      competition: {
        test: 0,
        start_time: '',
        finish_time: '',
        duration: '01:00',
        title: '',
        description: '',
        action: ActionsEnum.NONE
      },
      errors: [],
      successes: [],
      isLoading: false
    }
  },
  async mounted() {
    await this.getById(this.$route.params.id)
    if(new Date(this.competition.start_time) - Date.now() > 0) {
    let elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems);
    elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems,{twelveHour: false});
    this.$refs['startDate'].value = this.competition.start_time.slice(4,10) + ',' + this.competition.start_time.slice(10,15)
    this.$refs['finishDate'].value = this.competition.finish_time.slice(4,10) + ',' + this.competition.finish_time.slice(10,15)
    this.$refs['startTime'].value = this.competition.start_time.slice(15,21)
    this.$refs['finishTime'].value = this.competition.finish_time.slice(15,21)
    }else {
        Flash.create({
          type: "warning",
          message: "The competition can't be edited"
        });
        this.$router.push({ path: this.$route.query.redirect || "/my_competitions" }) 
      } 
  },
  methods: {
    inputOnChangeListener() {
      this.competition.action = ActionsEnum.UPDATE
    },
    async getById(id) {
      this.clearAlerts()
      this.isLoading = true
      const res = await this.$store.dispatch('competitions/getById', id)
      this.isLoading = false     
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });      
      this.competition = res.entity                     
    },
    async updateCompBtnHandler() {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to update the competition?')
      if(conf == false)
        return
      this.isLoading = true 
      if(this.competition.action == ActionsEnum.UPDATE) {
        this.competition.start_time = toISODate(this.$refs['startDate'].value + ' ' + this.$refs['startTime'].value)
        this.competition.finish_time = toISODate(this.$refs['finishDate'].value + ' ' + this.$refs['finishTime'].value)
      }
      const res = await this.$store.dispatch('competitions/update', this.competition)
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) { 
        Flash.create({
          type: "success",
          message: "The competition was updated successfully"
        });
        this.$router.push({ path: this.$route.query.redirect || "/my_competitions" })          
      }    
    },
    editCompBtnHandler() {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to cancel competition editting?')
      if(conf == true)
        this.$router.push({ path: this.$route.query.redirect || "/my_competitions" })
    },
    clearAlerts() {
      this.errors = []
      this.successes = []
    }
  }
}
</script>

<style>
.edit-competition .update-comp-button {
  text-align: center;
  margin-top: 1rem;
}

.edit-competition .title {
  display: flex;
}

.edit-competition .title button{
  margin: 2.5rem 0 1.168rem auto;
  background-color: var(--grey);
}
</style>