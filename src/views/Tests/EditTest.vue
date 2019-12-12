<template>
  <div class="edit-test">
    <div class="title">
      <h3>Edit test</h3>
      <button class="btn btn-small" @click="cancelTestBtnHandler">cancel</button>
    </div>  
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <Loader v-if="isLoading"/>
    <div class="col s12" v-else>
      <div class="row">
        <div class="input-field col s12">
          <input id="test-title" type="text" v-model="test.title" maxlength="50" @change="inputOnChangeListener"/>
          <label for="test-title" class="active">Title</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea
            id="description"
            class="materialize-textarea"
            v-model="test.description"
            @change="inputOnChangeListener"
          ></textarea>
          <label for="description" class="active">Description</label>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b>Created:</b> {{test.created}}
        </div>       
      </div>
    </div>
    <h5 v-if="!isLoading">Total: {{questions.length}}</h5>
    <Test
      v-if="!isLoading && questions.length > 0"
      :questions="questions"
      :enableDeleteQuestion="enableDeleteQuestion"
      :enableEdit="enableEditTest"
      :addQuestion="addQuestion"
      :deleteQuestion="deleteQuestion"
      :addOption="addOption"
      :deleteOption="deleteOption"
    />
    <div class="update-test-button" v-if="!isLoading">
      <button class="btn btn-large" id="CreateTestBtn" @click="updateTestBtnHandler">Update test</button>
    </div>
  </div>
</template>

<script>
import Test from '@/components/Test.vue'
import Alert from '@/components/Alert.vue'
import Flash from 'js-flash-message'
import Loader from '@/components/Loader.vue'
import ActionsEnum from '../../utils/ActionsEnum'

export default {
  name: "editTest",
  components: {
    Test,
    Alert,
    Loader
  },
  data() {
    return {
      test: {
        id: 0,
        title: '',
        description: '',
        created: '',
        action: ActionsEnum.NONE
      },
      questions: [],
      errors: [],
      successes: [],
      isLoading: false,
      deletedQuestions: []
    };
  },
  computed: {
    enableDeleteQuestion() {
      return this.questions.length > 1;
    },   
    enableEditTest() {
      return true;
    }
  },
  methods: {
    inputOnChangeListener() {
      this.test.action = ActionsEnum.UPDATE
    },
    addQuestion() {
      this.questions.push({
        id: 0,
        text: '',
        action: ActionsEnum.CREATE,
        answers: [
          {
            id: 0,
            text: '',
            correct: false,
            action: ActionsEnum.CREATE
          },
          {
            id: 0,
            text: '',
            correct: false,
            action: ActionsEnum.CREATE
          }
        ]       
      });
    },
    deleteQuestion(questionIndex) {
      if (this.enableDeleteQuestion) {
        var toDelete = null;
        if (!this.isQuestionEmpty(questionIndex))
          toDelete = confirm(
            `Are you sure you want to delete the Question ${questionIndex + 1}?`
          );
        else toDelete = true
        if (toDelete) {
          if(!this.questions[questionIndex].action || this.questions[questionIndex].action == ActionsEnum.NONE || this.questions[questionIndex].action == ActionsEnum.UPDATE) {            
            this.questions[questionIndex].action = ActionsEnum.DELETE
            this.deletedQuestions.push({...this.questions[questionIndex]})
          }
          this.questions.splice(questionIndex, 1);
        }
      }
    },
    addOption(questionIndex) {
      this.questions[questionIndex].answers.push({
        id: 0,
        text: "",
        checked: false,
        action: ActionsEnum.CREATE
      });
    },
    deleteOption(questionIndex, answerIndex) {
      if (this.questions[questionIndex].answers.length > 2) {
        var toDelete = null;
        if (!this.isOptionEmpty(questionIndex, answerIndex))
          toDelete = confirm(
            `Are you sure you want to delete the Option ${answerIndex +
              1} of Question ${questionIndex + 1}?`
          );
        else toDelete = true;
        if (toDelete) {
          if(!this.questions[questionIndex].answers[answerIndex].action || this.questions[questionIndex].answers[answerIndex].action == ActionsEnum.NONE || this.questions[questionIndex].answers[answerIndex].action == ActionsEnum.UPDATE) {            
            this.questions[questionIndex].answers[answerIndex].action = ActionsEnum.DELETE
            let i = this.deletedQuestions.findIndex(q=> {
              return q.id == this.questions[questionIndex].id
            })
            if(i<0)
              i = this.deletedQuestions.push({id: this.questions[questionIndex].id, answers: []}) - 1
            this.deletedQuestions[i].answers.push(this.questions[questionIndex].answers[answerIndex])
          }
          this.questions[questionIndex].answers.splice(answerIndex, 1)
        }
      }
    },
    isOptionEmpty(questionIndex, answerIndex) {
      return (
        this.questions[questionIndex].answers[answerIndex].text.length <= 0
      );
    },
    isQuestionEmpty(questionIndex) {
      if (this.questions[questionIndex].text.length > 0) return false;
      var areEmpty = true;
      for (var i = 0; i < this.questions[questionIndex].answers.length; i++) {
        areEmpty = this.isOptionEmpty(questionIndex, i)
        if (areEmpty == false) break
      }
      return areEmpty;
    },
    async getById(id) {
      this.clearAlerts()
      this.isLoading = true
      const res = await this.$store.dispatch('tests/getById', id)
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      this.test.id = res.entity.id
      this.test.title = res.entity.title
      this.test.description = res.entity.description
      this.test.created = res.entity.created
      if(res.entity.questions)
        this.questions = res.entity.questions
      this.isLoading = false
    },
    async updateTestBtnHandler() {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to update this test?')
      if(conf == false)
        return
      this.isLoading = true
      this.deletedQuestions.forEach(d=>{
        const i = this.questions.findIndex(q=>{
          return q.id == d.id
        })
        if(i >= 0) {
          this.questions[i].answers = [...this.questions[i].answers,...d.answers]
        }
        else {
          this.questions.push(d)
        }
      })
      this.deletedQuestions = []
      const res = await this.$store.dispatch("tests/manage", {
        ...this.test,
        questions: this.questions
      });
      this.questions = res.entity.questions;
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) { 
        Flash.create({
          type: "success",
          message: "The test was updated successfully"
        });
        this.$router.push({ path: this.$route.query.redirect || "/tests" })          
      }
    },
    cancelTestBtnHandler() {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to cancel test editting?')
      if(conf == true)
        this.$router.push({ path: this.$route.query.redirect || "/tests" })
    },
    clearAlerts() {
      this.errors = []
      this.successes = []
    }
  },
  mounted() {
    this.getById(this.$route.params.id)
  }
};
</script>

<style>
.edit-test .add-question-button {
  text-align: right;
  margin-right: calc(0.75rem + 22px);
}

.edit-test .add-question-button .btn-floating {
  background-color: var(--secondary-color);
}

.edit-test .update-test-button {
  text-align: center;
  margin-top: 1rem;
}

.edit-test .title {
  display: flex;
}

.edit-test .title button{
  margin: 2.5rem 0 1.168rem auto;
  background-color: var(--grey);
}
</style>