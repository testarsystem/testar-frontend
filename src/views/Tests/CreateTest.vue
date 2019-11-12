<template>
    <div class="create-test"> 
        <h3>New test</h3>
        <Alert type="danger" v-if="error">{{error}}</Alert>                 
        <Test 
            :test="test"
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
            test: {
                id: 0,
                title: '',
                description: '',
                questions: [
                    {
                        text: '',
                        answers: [
                            {
                                text: '',
                                correct: false
                            },
                            {
                                text: '',
                                correct: false
                            }
                        ]
                    }
                ]
            },
            error: ''
        }
    },
    computed: {
        enableDeleteQuestion() {
            return this.test.questions.length > 1
        },
        enableEdit() {
            return true;
        }
    },
    methods: {
        addQuestion() {
            this.test.questions.push(
                {
                    text: '',
                    answers: [
                        {
                            text: '',
                            correct: false
                        },
                        {
                            text: '',
                            correct: false
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
            this.test.questions[questionIndex].answers.push(
                {
                    text: '',
                    checked: false
                }
            )
        },
        deleteOption(questionIndex, answerIndex) {
            if(this.test.questions[questionIndex].answers.length > 2)
            {
                var toDelete = null
                if(!this.isOptionEmpty(questionIndex,answerIndex))
                    toDelete = confirm(`Are you sure you want to delete the Option ${answerIndex+1} of Question ${questionIndex+1}?`)
                else
                    toDelete = true
                if(toDelete)
                    this.test.questions[questionIndex].answers.splice(answerIndex, 1)
            }
        },
        isOptionEmpty(questionIndex,answerIndex) {
            return this.test.questions[questionIndex].answers[answerIndex].text.length <= 0
        },
        isQuestionEmpty(questionIndex) {
            if(this.test.questions[questionIndex].question.length > 0)
                return false
            var areEmpty = true
            for(var i=0; i<this.test.questions[questionIndex].answers.length; i++) {
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