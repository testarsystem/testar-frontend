<template>
    <div class="row question">
        <div class="col card s12">
            <div class="card-content">
                <div class="card-title">
                    <span>Question {{index+1}}</span> 
                    <i class="material-icons small" 
                        @click="deleteQuestion" 
                        :class="{ 'blue-grey-text text-lighten-3' : (!enableDelete || disable) }"
                        v-if="enableEdit"
                    >
                        close
                    </i>
                </div>               
                <div class="s12">
                    <textarea id="questionText" 
                        placeholder="question" 
                        class="materialize-textarea" 
                        v-model="value.text"
                        :disabled="!enableEdit || disable"
                        maxlength="200"
                        @change="inputOnChangeListener">
                    </textarea>
                </div>               
            </div>
            <div class="card-action">              
                <div class="answers">
                    <Answer v-for="(answer,index) in value.answers" 
                        :key="index" 
                        :value="answer" 
                        :index="index"
                        @deleteAnswer="deleteOption"
                        :enableDelete="enableDeleteAnswer"
                        :enableEdit="enableEdit"
                        :disableById="disableById"
                    />
                </div>  
                <div class="add-answer-button" v-if="enableEdit">
                    <div class="btn-floating btn-small" @click="addOption"><i class="material-icons">add</i></div>
                </div>                            
            </div>
        </div>
    </div>
</template>

<script>
import Answer from '@/components/Answer.vue'
export default {
    name: 'question',
    components: {
        Answer
    },
    props: {
        value: {
            type: Object,
            required: true
        },
        index: Number,
        enableDelete: {
            type: Boolean,
            default: false
        },
        enableEdit: {
            type: Boolean,
            default: false
        },
        disableById: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        addOption() {
            this.$emit('addOption',this.index)
        },
        deleteQuestion() {
            if(this.enableDelete && !this.disable)
                this.$emit('deleteQuestion',this.index)
        },
        deleteOption(answerIndex) {
            this.$emit('deleteOption',this.index, answerIndex)
        },
        inputOnChangeListener() {
            this.value.isEdited = true
        }
    },
    computed: {
        enableDeleteAnswer() {
            return this.value.answers.length > 2
        },
        disable() {
            return this.disableById && this.value.id > 0
        }
    }
}
</script>

<style>

.question .add-answer-button {
    text-align: right;
    margin-top: 20px;
}

.question .card-title {
    display: inline;
}

.question .card-title i {
    float: right;  
    color: var(--secondary-color); 
    cursor: pointer;
}
</style>