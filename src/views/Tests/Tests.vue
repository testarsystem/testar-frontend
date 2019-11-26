<template>
  <div class="tests">
    <h3>Tests</h3>
    <router-link to="/tests/new" class="btn" id="newTestBtn">New test</router-link>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <Loader v-if="isLoading"/>
    <TestsCollection 
      :tests="tests" 
      v-if="!isLoading && tests.length > 0" 
      :isBtnEnabled="isBtnEnabled" 
      :isLinkEnabled="isLinkEnabled" 
      :isTitleBtnEnabled="isTitleBtnEnabled"
      btnText="StartCompetition" 
      @btnHandler="startBtnHandler"
      @linkHandler="linkHandler"
      @titleBtnHandler="deleteTestBtnHandler"
      />
    <div class="substrate" v-if="!isLoading && tests.length < 1">
      Tests list is empty
    </div>
  </div>
</template>

<script>
import TestsCollection from '@/components/TestsCollection.vue';
import Alert from '@/components/Alert.vue';
import Flash from 'js-flash-message'
import Loader from '@/components/Loader.vue'
import ActionsEnum from '../../utils/ActionsEnum'

export default {
  name: "tests",
  components: {
    TestsCollection,
    Alert,
    Loader
  },
  data() {
    return {
      errors: [],
      successes: [],
      competition: {},
      isLoading: false
    }
  },
  computed: {
    tests() {
      return this.$store.state.tests.tests
    }
  },
  methods: {
    async getTests() {
      this.clearAlerts()
      this.isLoading = true
      const res = await this.$store.dispatch("tests/getAll")
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      })  
    },
    startBtnHandler(id) {
      this.$router.push(`/tests/${id}/competition`)
    },
    isBtnEnabled() {
      return true
    },
    isLinkEnabled() {
      return true
    },
    isTitleBtnEnabled() {
      return true
    },
    linkHandler(id) {
      this.$router.push(`/tests/${id}`)
    },
    async deleteTestBtnHandler(id) {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to delete this test?')
      if(conf == false)
        return
      this.isLoading = true
      const res = await this.$store.dispatch('tests/manage', {id, action: ActionsEnum.DELETE})
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) {
        this.successes.push('The test was deleted successfully')
      }
    },
    clearAlerts() {
      this.errors = []
      this.successes = []
    }
  },
  mounted() {
    this.getTests()
    const flashes = Flash.get()
    flashes.forEach(flash=>{
      if(flash.type == 'success')
        this.successes.push(flash.message)
    })
  }
};
</script>

<style>
#newTestBtn {
  margin: 0 0 2rem 0;
}
</style>