<template>
  <div class="test-details">
    <Loader v-if="isLoading" />
    <div class="title" v-else ref="title">
      <h3>{{test.title}}</h3>
      <i class="material-icons title-btn ml-auto" @click="editTestBtnHandler">edit</i>
      <i class="material-icons title-btn" @click="deleteTestBtnHandler">delete</i>
    </div>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
    <div class="row description" v-if="!isLoading">
      <div class="col s12">
        <p style="margin-top: 0px;">{{test.description}}</p>
        <p>
          <b>Created:</b>
          {{test.created}}
        </p>
      </div>
    </div>
    <h5 v-if="!isLoading">Total: {{questions.length}}</h5>
    <Test
      v-if="!isLoading && questions.length > 0"
      :questions="questions"
      :enableCheck="false"
    />
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import Loader from "@/components/Loader.vue";
import Flash from "js-flash-message";
import Test from '@/components/Test.vue'
import ActionsEnum from '../../utils/ActionsEnum'

export default {
  name: "testDetails",
  components: {
    Alert,
    Loader,
    Test
  },
  data() {
    return {
      test: {
        id: 0,
        title: "",
        description: "",
        created: ""
      },
      questions: [],
      errors: [],
      successes: [],
      isLoading: false
    };
  },
  methods: {
    async getById(id) {
      this.clearAlerts();
      this.isLoading = true;
      const res = await this.$store.dispatch("tests/getById", id);
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      this.test.id = res.entity.id;
      this.test.title = res.entity.title;
      this.test.description = res.entity.description;
      this.test.created = res.entity.created;
      if (res.entity.questions) this.questions = res.entity.questions;
      this.isLoading = false;
    },
    editTestBtnHandler() {
      const id = this.test.id
      this.$router.push({path: `/tests/${id}/edit`, query: { redirect: this.$router.currentRoute.path }})
    },
    async deleteTestBtnHandler() {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to delete this test?')
      if(conf == false)
        return
      this.isLoading = true
      this.test.action = ActionsEnum.DELETE
      const res = await this.$store.dispatch('tests/manage', this.test)
      this.test.action = ActionsEnum.NONE
      this.isLoading = false
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
      this.errors = [];
      this.successes = [];
    }
  },
  mounted() {
    this.getById(this.$route.params.id);
  }
};
</script>

<style>
.test-details .title {
  display: flex;
}

.test-details .title-btn {
  color: var(--grey);
  margin: 1.9466666667rem 0 1.168rem 0;
}

.test-details .ml-auto {
  margin-left: auto;
}

.test-details .title-btn:hover {
  cursor: pointer;
}

.test-details .description .col,
.test-details .info .col {
  padding: 0 !important;
}

.test-details .description.row,
.test-details .info.row {
  margin-bottom: 0 !important;
}
</style>