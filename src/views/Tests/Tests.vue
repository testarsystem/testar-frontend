<template>
  <div class="tests">    
    <h3>Tests</h3>
    <router-link to="/tests/new" class="waves-effect waves-light btn">New test</router-link>
      <TestsCollection :tests="tests"/>  
  </div>
</template>

<script>
import TestsCollection from '@/components/TestsCollection.vue'

export default {
  name: 'tests',
  components: {
    TestsCollection
  },
  data(){
    return {
      tests: [
        {
          id: 1,
          title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae quas, fugiat eos fugit maiores porro temporibus atque mollitia?',
          description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non distinctio aliquid temporibus suscipit consequuntur, eius excepturi nam numquam voluptatem ex fugiat reiciendis velit blanditiis labore quas! Quibusdam, porro. Dolor harum et veniam aspernatur, facere eaque eveniet nemo dolore similique optio? Quae quas, fugiat eos fugit maiores porro temporibus atque mollitia?',
          date: '01/01/2019'
        },
        {
          id: 2,
          title: 'My first test',
          description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non distinctio aliquid temporibus suscipit consequuntur, eius excepturi nam numquam voluptatem ex fugiat reiciendis velit blanditiis labore quas! Quibusdam, porro. Dolor harum et veniam aspernatur, facere eaque eveniet nemo dolore similique optio? Quae quas, fugiat eos fugit maiores porro temporibus atque mollitia?',
          date: '01/01/2018'
        }
      ]
    }
  }
}
</script>