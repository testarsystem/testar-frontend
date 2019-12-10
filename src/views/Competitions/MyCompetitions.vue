<template>
  <div class="my-competitions">
    <h3>My competitions</h3>
    <router-link to="/tests/" class="btn" id="newCompetitionBtn">New competition</router-link>
    <Loader v-if="isLoading"/>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <Alert type="warning" v-for="warning in warnings" :key="warning">{{warning}}</Alert>
    <CompetitionsCollection 
      :competitions="competitions" 
      v-if="competitions.length > 0 && !isLoading"
      :isTitleBtnEnabled="isTitleBtnEnabled"
      :isLinkEnabled="isLinkEnabled"
      btnText="Delete"
      @linkHandler="linkHandler"
      @editBtnHandler="editCompetitionBtnHandler"
      @deleteBtnHandler="deleteCompetitionBtnHandler"
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
  name: "competitions",
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
      return this.$store.state.competitions.myCompetitions
    }
  },
  methods: {
    async getCompetitions() {
      this.clearAlerts()
      this.isLoading = true
      const res = await this.$store.dispatch("competitions/getMyAll")
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      })  
    },
    isLinkEnabled() {
      return true
    },
    linkHandler(id) {
      this.$router.push(`/competitions/${id}/details`)
    },
    isTitleBtnEnabled({start_time}) {
      return Date.now() < new Date(start_time)
    },
    editCompetitionBtnHandler(id) {
      this.$router.push({path: `/competitions/${id}/edit`, query: { redirect: this.$router.currentRoute.path }})
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


