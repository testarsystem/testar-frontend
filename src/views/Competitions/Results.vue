<template>
  <div class="competition-results">
    <div class="title">
      <h3>Results</h3>
    </div>
    <Alert type="danger" v-for="error in errors" :key="error">{{error}}</Alert>
    <Loader v-if="isLoading" />
    <div class="participants-table" v-else>
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
          <tr v-for="participant in participants" :key="participant.id">
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
  name: 'competitionResults',
  components: {
    Alert,
    Loader
  },
  data() {
    return {
      participants: [],
      errors: [],
      isLoading: false
    };
  },
  methods: {
    async getResults(id) {
      this.errors = []
      this.isLoading = true;
      let res = await this.$store.dispatch(
        "publics/getByIdWithParticipants",
        id
      );
      if (res.errors.length < 1) {
          this.participants = res.entity;
      } else
        res.errors.forEach(item => {
          this.errors.push(item.message);
        });
      this.isLoading = false;
    }
  },
  mounted(){
    this.getResults(this.$route.params.id)
  }
}
</script>