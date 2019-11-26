<template>
  <div class="create-test">
    <h3>New test</h3>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Loader v-if="isLoading"/>
    <div class="col s12" v-else>
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" v-model="test.title" maxlength="50" @change="inputOnChangeListener"/>
          <label for="title">Title</label>
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
          <label for="description">Description</label>
        </div>
      </div>
    </div>
    <h5 v-if="!isLoading">Total: {{questions.length}}</h5>
    <Test
      v-if="!isLoading"
      :questions="questions"
      :enableDeleteQuestion="enableDeleteQuestion"
      :enableEdit="enableEditTest"
      :addQuestion="addQuestion"
      :deleteQuestion="deleteQuestion"
      :addOption="addOption"
      :deleteOption="deleteOption"
    />
    <div class="create-test-button" v-if="!isLoading">
      <button class="btn btn-large" id="CreateTestBtn" @click="createTestBtnHandler">Create test</button>
    </div>
  </div>
</template>

<script>
import Test from "@/components/Test.vue";
import Alert from "@/components/Alert.vue";
import Flash from "js-flash-message";
import ActionsEnum from '../../utils/ActionsEnum'
import Loader from '@/components/Loader.vue'

export default {
  name: "newTest",
  components: {
    Test,
    Alert,
    Loader
  },
  data() {
    return {
      test: {
        id: 0,
        title: "",
        description: "",
        action: ActionsEnum.CREATE,
      },
      questions: [
        {
          id: 0,
          text: "",
          action: ActionsEnum.CREATE,
          answers: [
            {
              id: 0,
              text: "",
              correct: false,
              action: ActionsEnum.CREATE,
            },
            {
              id: 0,
              text: "",
              correct: false,
              action: ActionsEnum.CREATE,
            }
          ]
        }
      ],
      errors: [],
      deletedQuestions: [],
      isLoading: false
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
      if(this.test.action != ActionsEnum.CREATE)
        this.test.action = ActionsEnum.UPDATE
    },
    addQuestion() {
      this.questions.push({
        id: 0,
        text: "",
        action: ActionsEnum.CREATE,
        answers: [
          {
            id: 0,
            text: "",
            correct: false,
            action: ActionsEnum.CREATE,
          },
          {
            id: 0,
            text: "",
            correct: false,
            action: ActionsEnum.CREATE,
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
        areEmpty = this.isOptionEmpty(questionIndex, i);
        if (areEmpty == false) break;
      }
      return areEmpty;
    },
    async createTestBtnHandler() {
      this.isLoading = true
      this.errors = [];
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
      this.test.id = res.entity.id;
      this.questions = res.entity.questions;
      this.test.action = res.entity.action
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) {
        Flash.create({
          type: "success",
          message: "The test was created successfully"
        });
        this.$router.push("/tests/");
      }
    }
  }
};
</script>

<style>
.create-test .add-question-button {
  text-align: right;
  margin-right: calc(0.75rem + 22px);
}

.create-test .add-question-button .btn-floating {
  background-color: var(--secondary-color);
}

.create-test .create-test-button {
  text-align: center;
  margin-top: 1rem;
}
</style>