<template>
  <ul class="competitions-collection collection">
    <li class="collection-item avatar" v-for="competition in competitions" :key="competition.id">  
      <div class="title">   
        <a class="test-title" @click="$emit('linkHandler')">
          {{competition.title}}
        </a>
        <button class="btn btn-small" v-if="isBtnEnabled(competition)" @click="$emit('btnHandler')">{{btnText}}</button>
      </div> 
      <p class="secondary">
        <!-- {{competition.created}} -->
      </p>
      <div class="content row">
        <div class="col s12 l4">
          <b>Start time</b>: {{competition.start_time}} 
        </div>
        <div class="col s12 l4">
          <b>Finish time</b>: {{competition.finish_time}} 
        </div>
        <div class="col s12 l4">
          <b>Duration</b>: {{competition.duration}} 
        </div>
      </div>         
    </li>
  </ul> 
</template>

<script>
export default {
  name: 'CompetitionsCollection',
  props: {
    competitions: Array,
    isBtnEnabled: {
      type: Function,
      default: ()=>{return false}
    },
    btnText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.competitions-collection .collection-item.avatar {
  padding: 20px !important;
}

.competitions-collection .title {
  display: flex;
}

.competitions-collection .title button{
  margin-left: auto;
}

.competitions-collection .test-title {
  font-size: 1.64rem !important;
  line-height: 110%;
  color: #2c3e50;
  margin-right: 1rem;
}

.competitions-collection .test-title:hover{
  text-decoration: underline;
  cursor: pointer;
}

.competitions-collection .content, .competitions-collection .secondary {
  margin: .5rem 0 1rem 0!important;
}

.competitions-collection .secondary {
  font-size: .9rem !important;
  color: #546e7a ;
}

.competitions-collection .content .col {
  padding: 0 !important;
}

</style>