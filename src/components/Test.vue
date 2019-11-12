<template>
    <div class="test">
        <Question v-for="(question,index) in questions" 
            :key="index" 
            :value="question" 
            :index="index"
            :enableDelete="enableDeleteQuestion"
            :enableEdit="enableEdit"
            @deleteQuestion="deleteQuestion"
            @addOption="addOption"
            @deleteOption="deleteOption"
        />
        <div class="add-question-button" v-if="enableEdit">
            <div class="btn-floating btn-meduim" @click="addQuestion"><i class="material-icons">add</i></div>
        </div>
    </div>
</template>

<script>
import Question from '@/components/Question.vue'
export default {
    name: 'test',
    components: {
        Question
    },
    props: {
        questions: {
            type: Array,
            required: true
        },
        enableDeleteQuestion: {
            type: Boolean,
            default: false
        },
        enableEdit: {
            type: Boolean,
            default: false
        },
        addQuestion: {
            type: Function,
            default: ()=>{}
        },
        deleteQuestion: {
            type: Function,
            default: ()=>{}
        },
        addOption: {
            type: Function,
            default: ()=>{}
        },
        deleteOption: {
            type: Function,
            default: ()=>{}
        }
    }
}
</script>