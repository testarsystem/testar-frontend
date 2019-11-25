<template>
  <div class="my-competitions">
    <h3>My competitions</h3>
    <router-link to="/tests/" class="btn" id="newCompetitionBtn">New competition</router-link>
    <Loader v-if="isLoading"/>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <CompetitionsCollection 
      :competitions="competitions" 
      v-if="competitions.length > 0 && !isLoading"
      :isTitleBtnEnabled="isTitleBtnEnabled"
      :isLinkEnabled="isLinkEnabled"
      btnText="Delete"
      @linkHandler="true"
      @titleBtnHandler="deleteCompetitionBtnHandler"
    />
    <div class="substrate" v-if="competitions.length < 1 && !isLoading">
      Competitions list is empty
    </div>
  </div>
</template>

<script>
import CompetitionsCollection from '@/components/CompetitionsCollection.vue'
import Alert from '@/components/Alert.vue'
import Loader from '@/components/Loader.vue'
import Flash from 'js-flash-message'
import {getDateString} from '../../utils/DateUtils'

export default {
  name: "competitions",
  components: {
    CompetitionsCollection,
    Alert,
    Loader
  },
  data() {
    return {
      competitions: [],
      errors: [],
      successes: [],
      isLoading: false
    }
  },
  methods: {
    async getCompetitions() {
      this.clearAlerts()
      this.isLoading = true
      const res = await this.$store.dispatch("competitions/getAll")
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      })
      if(res.entity.results)
        this.competitions = [...res.entity.results]
      this.competitions.forEach( competition => {
        competition.created = getDateString(competition.created)
        competition.start_time = getDateString(competition.start_time)
        competition.finish_time = getDateString(competition.finish_time)
      })     
    },
    isLinkEnabled() {
      return true
    },
    isTitleBtnEnabled({start_time}) {
      return Date.now() < new Date(start_time)
    },
    async deleteCompetitionBtnHandler(id) {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to delete this competition?')
      if(conf == false)
        return
      this.isLoading = true
      const res = await this.$store.dispatch('competitions/delete', id)
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) {
        this.successes.push('The competition was deleted successfully')
      }
    },
    clearAlerts() {
      this.errors = []
      this.successes = []
    }
  },
  mounted() {
    this.getCompetitions()
    const flashes = Flash.get()
    flashes.forEach(flash=>{
      if(flash.type == 'success')
        this.successes.push(flash.message)
    })
  }
};
</script>

<style>
#newCompetitionBtn {
  margin: 0 0 2rem 0;
}
</style>


