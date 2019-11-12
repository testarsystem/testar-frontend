<template>
  <ul class="tests-collection collection">
    <li class="collection-item avatar" v-for="test in tests" :key="test.Id">      
      <div class="title">
        {{test.title}}
      </div>
      <p class="secondary">
        {{test.date}}
      </p>
      <p class="content">
        {{test.description}}
      </p>      
      <a class="btn btn-small">Start competition</a>
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
}

.tests-collection .title:hover{
  text-decoration: underline;
  cursor: pointer;
}

.tests-collection {
  margin: 2rem 0 1rem 0;
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