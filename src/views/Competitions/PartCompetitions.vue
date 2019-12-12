<template>
  <div class="part-competitions">
    <h3>Participated competitions</h3>
    <Loader v-if="isLoading"/>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <Alert type="warning" v-for="warning in warnings" :key="warning">{{warning}}</Alert>
    <CompetitionsCollection 
      :competitions="competitions" 
      v-if="competitions.length > 0 && !isLoading"
      btnText="Participate"
      :isBtnEnabled="isBtnEnabled"
      :isLinkEnabled="isLinkEnabled"
      @linkHandler="linkHandler"
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
import Flash from 'js-flash-message'

export default {
  name: "participatedCompetitions",
  components: {
    CompetitionsCollection,
    Alert,
    Loader
  },
  data() {
    return {
      errors: [],
      successes: [],
      warnings: [],
      isLoading: false
    }
  },
  computed: {
    competitions() {
      return this.$store.state.competitions.partCompetitions
    }
  },
  methods: {
    async getCompetitions() {
      this.clearAlerts()
      this.isLoading = true
      const res = await this.$store.dispatch("competitions/getParticipatedAll")
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      })  
    },
    isLinkEnabled() {
      return true
    },
    btnHandler(competition) {
      this.clearAlerts()
      if(Date.now() >= new Date(competition.start_time)) {
        this.$router.push(`/competitions/${competition.id}`)
      } else {
        this.warnings.push('The competition hasn\'t started yet!')
        this.warnings.push(`You can participate it on ${competition.start_time}`)
      }
    },
    linkHandler(id) {
      this.$router.push(`/competitions/${id}/results`)
    },
    isBtnEnabled({start_time, finish_time}) {
      const now = Date.now()
      return now < new Date(finish_time)
    },
    clearAlerts() {
      this.errors = []
      this.successes = []
      this.warnings = []
    }
  },
  mounted() {
    this.getCompetitions()
    const flashes = Flash.get()
    flashes.forEach(flash=>{
      if(flash.type == 'success')
        this.successes.push(flash.message)
      else if(flash.type == 'danger')
        this.errors.push(flash.message)
      else if(flash.type == 'warning')
        this.warnings.push(flash.message)
    })
  }
};
</script>

<style>
#newCompetitionBtn {
  margin: 0 0 2rem 0;
}
</style>


