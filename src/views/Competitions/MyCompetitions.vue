<template>
  <div class="my-competitions">
    <h3>My competitions</h3>
    <Loader v-if="isLoading"/>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <CompetitionsCollection 
      :competitions="competitions" 
      v-if="competitions.length > 0 && !isLoading"
      :isBtnEnabled="isBtnEnabled"
      btnText="Delete"
      @linkHandler="true"
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
      competition: {},
      isLoading: false
    }
  },
  methods: {
    async getCompetitions() {
      this.errors = []
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
    isBtnEnabled({start_time}) {
      return Date.now() < new Date(start_time)
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


