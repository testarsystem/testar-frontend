<template>
  <div class="tests">
    <h3>Tests</h3>
    <router-link to="/tests/new" class="btn" id="newTestBtn">New test</router-link>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <TestsCollection :tests="tests" />
  </div>
</template>

<script>
import TestsCollection from "@/components/TestsCollection.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "tests",
  components: {
    TestsCollection,
    Alert
  },
  data() {
    return {
      tests: [
        {
          id: 1,
          title:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae quas, fugiat eos fugit maiores porro temporibus atque mollitia?",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non distinctio aliquid temporibus suscipit consequuntur, eius excepturi nam numquam voluptatem ex fugiat reiciendis velit blanditiis labore quas! Quibusdam, porro. Dolor harum et veniam aspernatur, facere eaque eveniet nemo dolore similique optio? Quae quas, fugiat eos fugit maiores porro temporibus atque mollitia?",
          created: "01/01/2019"
        },
        {
          id: 2,
          title: "My first test",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non distinctio aliquid temporibus suscipit consequuntur, eius excepturi nam numquam voluptatem ex fugiat reiciendis velit blanditiis labore quas! Quibusdam, porro. Dolor harum et veniam aspernatur, facere eaque eveniet nemo dolore similique optio? Quae quas, fugiat eos fugit maiores porro temporibus atque mollitia?",
          created: "01/01/2018"
        }
      ],
      errors: []
    };
  }
};
</script>

<style>
#newTestBtn {
  margin: 0 0 2rem 0;
}
</style>