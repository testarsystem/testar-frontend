<template>
  <div class="home">
    <h3>Competitions</h3>
    <Loader v-if="isLoading"/>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <CompetitionsCollection 
      :competitions="competitions" 
      v-if="competitions.length > 0 && !isLoading"
      :isBtnEnabled="isBtnEnabled"
      btnText="Participate"
      @btnHandler="btnHandler"
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
import {getDateString} from '../utils/DateUtils'

export default {
  name: 'home',
  components: {
    CompetitionsCollection,
    Alert,
    Loader
  },
  data() {
    return {
      errors: [],
      successes: [],
      isLoading: false
    }
  },
  computed: {
    competitions() {
      return this.$store.state.publics.competitions
    }
  },
  methods: {
    async getCompetitions() {
      this.clearAlerts()
      this.isLoading = true
      const res = await this.$store.dispatch("publics/getAll")
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      })    
    },
    isBtnEnabled({start_time, finish_time}) {
      return Date.now() < new Date(finish_time)
    },
    async btnHandler(competition) {
      this.clearAlerts()
      this.isLoading = true
      console.log(competition.id)
      let res = await this.$store.dispatch("publics/join",competition.id)
      if(res.errors.length < 1)
        if(Date.now() >= new Date(competition.start_time)) {
          this.$router.push(`/competitions/${competition.id}`)
        } else {
          this.successes.push('You were successfully registrated for this competition')
          this.successes.push(`You can participate it on ${competition.start_time}`)
        }       
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      }) 
    },
    clearAlerts() {
      this.errors = []
      this.successes = []
    }
  },
  mounted() {
    this.getCompetitions()
  }
}
</script>
