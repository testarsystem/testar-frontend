<template>
  <div class="competition-details">
    <Loader v-if="isLoading" />
    <div class="title" v-else ref="title">
      <h3>{{competition.title}}</h3>
      <i
        class="material-icons title-btn ml-auto"
        v-if="isTitleBtnEnabled"
        @click="editCompetitionBtnHandler"
      >edit</i>
      <i
        class="material-icons title-btn"
        v-if="isTitleBtnEnabled"
        @click="deleteCompetitionBtnHandler"
      >delete</i>
    </div>
    <div>
      <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
      <Alert type="success" v-for="success in successes" :key="success">{{success}}</Alert>
      <div class="row info" v-if="!isLoading">
        <div class="col s12 l4">
          <b>Start time</b>
          : {{competition.start_time}}
        </div>
        <div class="col s12 l4">
          <b>Finish time</b>
          : {{competition.finish_time}}
        </div>
        <div class="col s12 l4">
          <b>Duration</b>
          : {{competition.duration}}
        </div>
      </div>
      <div class="row description" v-if="!isLoading">
        <div class="col s12">
          <p>{{competition.description}}</p>
          <p>
            <b>Created:</b>
            {{competition.created}}
          </p>
        </div>
      </div>
    </div>
    <div class="participants-table" v-if="!isLoading">
      <h5>Participants</h5>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Start time</th>
            <th>Finish time</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="participant in competition.participants" :key="participant.id">
            <td>{{participant.user.username}}</td>
            <td>{{participant.start_time}}</td>
            <td>{{participant.end_time}}</td>
            <td>{{participant.points}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import Loader from "@/components/Loader.vue";
import Flash from 'js-flash-message'

export default {
  name: "Competition",
  components: {
    Alert,
    Loader
  },
  data() {
    return {
      competition: {
        id: 0,
        title: "",
        description: "",
        created: "",
        start_time: "",
        finish_time: "",
        duration: "",
        participants: []
      },
      errors: [],
      successes: [],
      isLoading: false,
      stickyTitle: false
    };
  },
  computed: {
    isTitleBtnEnabled() {
      return new Date(this.competition.start_time) - Date.now() > 0
    }
  },
  methods: {
    async getById(id) {
      this.clearAlerts();
      this.isLoading = true;
      let res = await this.$store.dispatch(
        "competitions/getByIdWithParticipants",
        id
      );
      if (res.errors.length < 1) {
        this.competition.id = res.entity.id;
        this.competition.title = res.entity.title;
        this.competition.description = res.entity.description;
        this.competition.created = res.entity.created;
        this.competition.start_time = res.entity.start_time;
        this.competition.finish_time = res.entity.finish_time;
        this.competition.duration = res.entity.duration;
        if (res.entity.participants)
          this.competition.participants = res.entity.participants;
      } else
        res.errors.forEach(item => {
          this.errors.push(item.message);
        });
      this.isLoading = false;
    },
    editCompetitionBtnHandler() {
      const id = this.competition.id
      this.$router.push({path: `/competitions/${id}/edit`, query: { redirect: this.$router.currentRoute.path }})
    },
    async deleteCompetitionBtnHandler() {
      this.clearAlerts()
      const conf = confirm('Are you sure you want to delete this competition?')
      if(conf == false)
        return
      const id = this.competition.id
      this.isLoading = true
      const res = await this.$store.dispatch('competitions/delete', id)
      this.isLoading = false
      res.errors.forEach(item => {
        this.errors.push(item.message);
      });
      if (res.isSuccess) { 
        Flash.create({
          type: "success",
          message: "The competition was deleted successfully"
        });
        this.$router.push("/my_competitions")          
      } 
    },
    clearAlerts() {
      this.errors = []
      this.successes = []
    }
  },
  mounted() {
    this.getById(this.$route.params.id);
  }
};
</script>

<style>
.competition-details .title {
  display: flex;
}

.competition-details .title-btn{
  color: var(--grey);
  margin: 1.9466666667rem 0 1.168rem 0;
}

.competition-details .ml-auto{
  margin-left: auto;
}

.competition-details .title-btn:hover {
  cursor: pointer;
}

.competition-details .description .col,
.competition-details .info .col {
  padding: 0 !important;
}

.competition-details .description.row,
.competition-details .info.row {
  margin-bottom: 0 !important;
}
</style>

