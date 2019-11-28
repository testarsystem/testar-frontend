<template>
  <div class="competition-details">
    <Loader v-if="isLoading" />
    <div class="title" v-else ref="title">
      <h3>{{competition.title}}</h3>
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
          <p><b>Created:</b> {{competition.created}}</p>
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
    }
  },
  methods: {
    async getById(id) {
      // this.clearAlerts();
      this.isLoading = true;
      let res = await this.$store.dispatch("competitions/getByIdWithParticipants", id);
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
    }
  },
  mounted(){
    this.getById(this.$route.params.id)
  }
}
</script>

<style>
.competition-details .description .col,
.competition-details .info .col {
  padding: 0 !important;
}

.competition-details .description.row,
.competition-details .info.row {
  margin-bottom: 0 !important;
}
</style>

