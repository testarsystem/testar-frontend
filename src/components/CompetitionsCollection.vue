<template>
  <ul class="competitions-collection collection">
    <li class="collection-item avatar" v-for="competition in competitions" :key="competition.id">  
      <div class="title">   
        <a :class="{link: isLinkEnabled()}" class="title-text" @click="$emit('linkHandler',competition.id)">
          {{competition.title}}
        </a>
        <!-- <button class="btn btn-small" v-if="isBtnEnabled(competition)" @click="$emit('btnHandler')">{{btnText}}</button>        -->
        <i 
          class="material-icons title-btn ml-auto" 
          v-if="isTitleBtnEnabled(competition)" 
          @click="$emit('editBtnHandler',competition.id)"
        >
          edit
        </i>
        <i 
          class="material-icons title-btn" 
          v-if="isTitleBtnEnabled(competition)" 
          @click="$emit('deleteBtnHandler',competition.id)"
        >
          delete
        </i>
      </div>       
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
      <p class="secondary">
        {{competition.description}}
      </p> 
      <button class="btn btn-small" v-if="isBtnEnabled(competition)" @click="$emit('btnHandler', competition)">{{btnText}}</button>            
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
    isTitleBtnEnabled: {
      type: Function,
      default: ()=>{return false}
    },
    isLinkEnabled: {
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

.competitions-collection .title-btn{
  color: var(--grey);
}

.competitions-collection .ml-auto{
  margin-left: auto;
}

.competitions-collection .title-text {
  font-size: 1.64rem !important;
  line-height: 110%;
  color: #2c3e50;
  margin-right: 1rem;
}

.competitions-collection .title-btn:hover {
  cursor: pointer;
}

.competitions-collection .link:hover{
  text-decoration: underline;
  cursor: pointer;
}

.competitions-collection .content {
  margin: .7rem 0 .5rem 0!important;
}

.competitions-collection .secondary {
  font-size: .9rem !important;
  color: #546e7a ;
  margin: .7rem 0 .5rem 0!important;
}

.competitions-collection .content .col {
  padding: 0 !important;
}

</style>