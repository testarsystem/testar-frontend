<template>
    <div class="test">
        <div class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input id="title" type="text" v-model="test.title">
                    <label for="title">Title</label>
                </div>                
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="description" class="materialize-textarea" v-model="test.description"></textarea>
                    <label for="description">Description</label>
                </div>
            </div>
        </div>
        <h5>Total: {{test.questions.length}}</h5>
        <Question v-for="(question,index) in test.questions" 
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
        test: {
            type: Object,
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