<template>
    <div class="create-test"> 
        <h3>New test</h3>
        <Alert type="danger" v-if="error">{{error}}</Alert>
        <div class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input id="title" type="text">
                    <label for="title">Title</label>
                </div>                
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="description" class="materialize-textarea"></textarea>
                    <label for="description">Description</label>
                </div>
            </div>
        </div>
        <h5>Total: {{questions.length}}</h5>          
        <Test 
            :questions="questions" 
            :enableDeleteQuestion="enableDeleteQuestion" 
            :enableEdit="enableEdit" 
            :addQuestion="addQuestion"
            :deleteQuestion="deleteQuestion"
            :addOption="addOption"
            :deleteOption="deleteOption"
        />
        <div class="create-test-button">
            <button class="btn btn-large" id="CreateTestBtn" @click="createTestBtnHandler">Create test</button>
        </div>        
    </div>
</template>

<script>
import Test from '@/components/Test.vue'
import Alert from '@/components/Alert.vue'
export default {
    name: 'newTest',
    components: {
        Test,
        Alert
    },
    data(){
        return {
            questions: [
                {
                    question: '',
                    options: [
                        {
                            text: '',
                            checked: false
                        },
                        {
                            text: '',
                            checked: false
                        }
                    ]
                }
            ],
            error: ''
        }
    },
    computed: {
        enableDeleteQuestion() {
            return this.questions.length > 1
        },
        enableEdit() {
            return true;
        }
    },
    methods: {
        addQuestion() {
            this.questions.push(
                {
                    question: '',
                    options: [
                        {
                            text: '',
                            checked: false
                        },
                        {
                            text: '',
                            checked: false
                        }
                    ]
                }
            )
        },
        deleteQuestion(questionIndex) {  
            if(this.enableDeleteQuestion) 
            {     
                var toDelete = null
                if(!this.isQuestionEmpty(questionIndex))
                    toDelete = confirm(`Are you sure you want to delete the Question ${questionIndex+1}?`)
                else
                    toDelete = true
                if(toDelete)
                    this.questions.splice(questionIndex, 1)
            }
        },
        addOption(questionIndex) {
            this.questions[questionIndex].options.push(
                {
                    text: '',
                    checked: false
                }
            )
        },
        deleteOption(questionIndex, optionIndex) {
            if(this.questions[questionIndex].options.length > 2)
            {
                var toDelete = null
                if(!this.isOptionEmpty(questionIndex,optionIndex))
                    toDelete = confirm(`Are you sure you want to delete the Option ${optionIndex+1} of Question ${questionIndex+1}?`)
                else
                    toDelete = true
                if(toDelete)
                    this.questions[questionIndex].options.splice(optionIndex, 1)
            }
        },
        isOptionEmpty(questionIndex,optionIndex) {
            return this.questions[questionIndex].options[optionIndex].text.length <= 0
        },
        isQuestionEmpty(questionIndex) {
            if(this.questions[questionIndex].question.length > 0)
                return false
            var areEmpty = true
            for(var i=0; i<this.questions[questionIndex].options.length; i++) {
                areEmpty = this.isOptionEmpty(questionIndex,i)
                if(areEmpty == false)
                    break;
            }
            return areEmpty
        },
        createTestBtnHandler() {

        }
    }
}
</script>

<style>
.create-test .add-question-button {
    text-align: right;
    margin-right: calc(.75rem + 22px);  
}

.create-test .add-question-button .btn-floating  {
    background-color: var(--secondary-color);  
}

.create-test .create-test-button {
    text-align: center;
    margin-top: 1rem;
}
</style>