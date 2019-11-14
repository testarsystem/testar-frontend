<template>
  <div class="edit-test">
    <div class="title">
      <h3>Edit test</h3>
      <button class="btn" @click="deleteTestBtnHandler">delete</button>
    </div>  
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="test-title" type="text" v-model="test.title" maxlength="50" :disabled="enableEdit" @change="inputOnChangeListener"/>
          <label for="test-title" class="active">Title</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea
            id="description"
            class="materialize-textarea"
            v-model="test.description"
            :disabled="enableEdit"
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
    <h5>Total: {{questions.length}}</h5>
    <Test
      :questions="questions"
      :enableDeleteQuestion="enableDeleteQuestion"
      :enableEdit="enableEditTest"
      :addQuestion="addQuestion"
      :deleteQuestion="deleteQuestion"
      :addOption="addOption"
      :deleteOption="deleteOption"
      :disableById="disableById"
    />
    <div class="update-test-button">
      <button class="btn btn-large" id="CreateTestBtn" @click="updateTestBtnHandler">Update test</button>
    </div>
  </div>
</template>

<script>
import Test from "@/components/Test.vue";
import Alert from "@/components/Alert.vue";
import operationResult from "../../store/OperationResult";
import Flash from "js-flash-message";
import {getDateString} from '../../utils/DateUtils'

export default {
  name: "editTest",
  components: {
    Test,
    Alert
  },
  data() {
    return {
      test: {
        id: 0,
        title: '',
        description: '',
        created: ''
      },
      questions: [],
      errors: [],
      successes: []
    };
  },
  computed: {
    enableDeleteQuestion() {
      return this.questions.length > 1;
    },
    disableById() {
      return false;
    },
    enableEdit() {
      return this.disableById && this.test.id > 0;
    },
    enableEditTest() {
      return true;
    }
  },
  methods: {
    inputOnChangeListener() {
      this.test.isEdited = true
    },
    addQuestion() {
      this.questions.push({
        id: 0,
        text: "",
        answers: [
          {
            id: 0,
            text: "",
            correct: false
          },
          {
            id: 0,
            text: "",
            correct: false
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
        else toDelete = true;
        if (toDelete) this.questions.splice(questionIndex, 1);
      }
    },
    addOption(questionIndex) {
      this.questions[questionIndex].answers.push({
        id: 0,
        text: "",
        checked: false
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
        if (toDelete)
          this.questions[questionIndex].answers.splice(answerIndex, 1);
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
    async getById(id) {
      this.clearAlerts()
      const res = await this.$store.dispatch('tests/getById', id)
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      this.test.id = res.entity.id
      this.test.title = res.entity.title
      this.test.description = res.entity.description
      this.test.created = getDateString(res.entity.created)
      this.questions = res.entity.questions
    },
    async updateTestBtnHandler() {
      this.clearAlerts()
      const res = await this.$store.dispatch("tests/update", {
        ...this.test,
        questions: this.questions
      });
      this.questions = res.entity.questions;
      this.test.isEdited = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) {
        this.successes.push('The test was successfully updated')
      }
    },
    async deleteTestBtnHandler() {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to delete this test?')
      if(conf == false)
        return
      const res = await this.$store.dispatch('tests/delete', this.test.id)
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) {
        Flash.create({
          type: "success",
          message: "The test was deleted successfully"
        });
        this.$router.push("/tests/");
      }
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
}
</style>