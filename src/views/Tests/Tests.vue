<template>
  <div class="tests">
    <h3>Tests</h3>
    <router-link to="/tests/new" class="btn" id="newTestBtn">New test</router-link>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <TestsCollection :tests="tests" v-if="tests.length > 0" @startBtnHandler="startBtnHandler"/>
    <div class="substrate" v-else>
      Tests list is empty
    </div>
  </div>
</template>

<script>
import TestsCollection from '@/components/TestsCollection.vue';
import Alert from '@/components/Alert.vue';
import Flash from 'js-flash-message'

export default {
  name: "tests",
  components: {
    TestsCollection,
    Alert
  },
  data() {
    return {
      tests: [],
      errors: [],
      successes: [],
      competition: {}
    }
  },
  methods: {
    async getTests() {
      this.errors = [];
      const res = await this.$store.dispatch("tests/getAll")
      res.errors.forEach(item => {
        this.errors.push(item.message);
      })
      this.tests = res.entity.results
    },
    startBtnHandler(id) {
      this.$router.push(`/tests/${id}/competition`)
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