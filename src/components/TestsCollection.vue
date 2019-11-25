<template>
  <ul class="tests-collection collection">
    <li class="collection-item avatar" v-for="test in tests" :key="test.id"> 
      <div class="title">      
      <a :class="{link: isLinkEnabled()}" class="title-text" @click="$emit('linkHandler',test.id)">
        {{test.title}}
      </a>
      <!-- <button class="btn btn-small" v-if="isTitleBtnEnabled(test)" @click="$emit('titleBtnHandler',test.id)">{{titleBtnText}}delete</button> -->
      <i 
        class="material-icons title-btn" 
        v-if="isTitleBtnEnabled(test)" 
        @click="$emit('titleBtnHandler',test.id)"
      >
        delete
      </i>
      </div>
      <p class="secondary">
        {{test.description}}
      </p>      
      <button class="btn btn-small" v-if="isBtnEnabled(test)" @click="$emit('btnHandler', test.id)">{{btnText}}</button>     
    </li>
  </ul> 
</template>

<script>
export default {
  name: 'TestsCollection',
  props: {
    tests: Array,
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
.tests-collection .collection-item.avatar {
  padding: 20px !important;
}

.tests-collection .title {
  display: flex;
}

.tests-collection .title-text {
  font-size: 1.64rem !important;
  line-height: 110%;
  color: #2c3e50;
}

.tests-collection .title-btn {
  margin-left: auto;
  color: var(--grey);
}

.tests-collection .title-btn:hover {
  cursor: pointer;
}

.tests-collection .link:hover{
  text-decoration: underline;
  cursor: pointer;
}

.tests-collection .content, .tests-collection .secondary {
  margin: .5rem 0!important;
}

.tests-collection .secondary {
  margin: .7rem 0 .5rem 0!important;
  font-size: .9rem !important;
  color: #546e7a;
}
</style>