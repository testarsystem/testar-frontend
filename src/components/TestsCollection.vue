<template>
  <ul class="tests-collection collection">
    <li class="collection-item avatar" v-for="test in tests" :key="test.id">      
      <router-link class="title" :to="`/Tests/${test.id}`">
        {{test.title}}
      </router-link>
      <p class="secondary">
        {{test.created}}
      </p>
      <p class="content">
        {{test.description}}
      </p>      
      <a class="btn btn-small" @click="$emit('startBtnHandler', test.id)">Start competition</a>     
    </li>
  </ul> 
</template>

<script>
export default {
  name: 'TestsCollection',
  props: {
    tests: Array
  }
}
</script>

<style>
.tests-collection .collection-item.avatar {
  padding: 20px !important;
}

.tests-collection .title {
  font-size: 1.64rem !important;
  line-height: 110%;
  color: #2c3e50;
}

.tests-collection .title:hover{
  text-decoration: underline;
  cursor: pointer;
}

.tests-collection .content, .tests-collection .secondary {
  margin: .5rem 0 1rem 0!important;
}

.tests-collection .secondary {
  margin: .5rem 0 !important;
  font-size: .9rem !important;
  color: #546e7a ;
}
</style>