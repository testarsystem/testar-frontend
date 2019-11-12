<template>
    <div class="row question">
        <div class="col card s12">
            <div class="card-content">
                <div class="card-title">
                    <span>Question {{index+1}}</span> 
                    <i class="material-icons small" 
                        @click="deleteQuestion" 
                        :class="{ 'blue-grey-text text-lighten-3' : !enableDelete }"
                        v-if="enableEdit"
                    >
                        close
                    </i>
                </div>               
                <div class="s12">
                    <textarea id="textarea1" 
                        placeholder="question" 
                        class="materialize-textarea" 
                        v-model="value.question"
                        :disabled="!enableEdit">
                    </textarea>
                </div>               
            </div>
            <div class="card-action">              
                <div class="answers">
                    <Answer v-for="(option,index) in value.options" 
                        :key="index" 
                        :value="option" 
                        :index="index"
                        @deleteAnswer="deleteOption"
                        :enableDelete="enableDeleteAnswer"
                        :enableEdit="enableEdit"
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
        }
    },
    methods: {
        addOption() {
            this.$emit('addOption',this.index)
        },
        deleteQuestion() {
            this.$emit('deleteQuestion',this.index)
        },
        deleteOption(optionIndex) {
            this.$emit('deleteOption',this.index, optionIndex)
        }
    },
    computed: {
        enableDeleteAnswer() {
            return this.value.options.length > 2
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