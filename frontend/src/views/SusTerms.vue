<template>
  <v-row no-gutters class="pa-3" align="center">
    <h1>Suspicious Follower Terms</h1>
    <img :src="require('@/assets/anneSus.png')" alt="anneSus" class="ml-2" />
    <v-spacer />
    <v-btn
      @click="home"
      rounded="false"
      color="primary"
      class="mr-2"
      icon
      size="small"
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-row>
  <v-row justify="center">
    <v-col cols="3">
      <v-row>
        <v-spacer />
        <v-btn
          @click="add"
          append-icon="mdi-plus-circle-outline"
          color="secondary"
          >Add Term</v-btn
        >
      </v-row>
      <v-row class="mt-5">
        <v-table theme="light" class="table">
          <tbody>
            <tr v-if="!terms.length" class="no-data">
              <td>No Data</td>
            </tr>
            <tr v-for="(term, i) in sortedTerms" :key="i">
              <td>
                <v-text-field v-if="editing === i" v-model="term.name" />
                <template v-else>{{ term.name }}</template>
              </td>
              <td class="text-right actions">
                <v-icon @click="edit(i)" class="mr-2">mdi-pencil</v-icon>
                <v-icon @click="remove(i)">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-row>
    </v-col>
  </v-row>
  <v-dialog v-model="addDialog">
    <v-card theme="light" min-width="400">
      <v-card-title>Add Term</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="selectedTerm.name"
          flat
          autofocus
          placeholder="New Term"
          single-line
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red" @click="addDialog = false">Cancel</v-btn>
        <v-btn color="blue" @click="confirmAdd">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="deleteDialog">
    <v-card theme="light" min-width="400">
      <v-card-title>Delete Term?</v-card-title>
      <v-card-text>
        Are you sure you want to delete the term:
        <span class="bold">{{ selectedTerm.name }}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red" @click="deleteDialog = false">No</v-btn>
        <v-btn color="green" @click="confirmRemove">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="editDialog">
    <v-card theme="light" min-width="400">
      <v-card-title>Edit Term</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="selectedTerm.name"
          flat
          autofocus
          placeholder="New Term"
          single-line
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red" @click="editDialog = false">Cancel</v-btn>
        <v-btn color="green" @click="confirmEdit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { api } from '@/plugins/axios';

export default {
  name: 'SusTerms',
  data() {
    return {
      terms: [],
      editing: null,
      addDialog: false,
      deleteDialog: false,
      editDialog: false,
      selectedTerm: {},
    };
  },
  computed: {
    sortedTerms() {
      if (!this.terms.length) return [];
      return [...this.terms].sort((a, b) => {
        const c = a.name.toLowerCase();
        const d = b.name.toLowerCase();
        if (c < d) return -1;
        if (c > d) return 1;
        return 0;
      });
    },
  },
  mounted() {
    api.get('/terms').then(({ data }) => {
      this.terms = data;
    });
  },
  methods: {
    home() {
      this.$router.push('/');
    },
    add() {
      this.addDialog = true;
    },
    confirmAdd() {
      api
        .post('/terms', this.selectedTerm)
        .then(({ data }) => {
          this.terms.push(data);
        })
        .finally(() => {
          this.resetDialogs();
        });
    },
    remove(index) {
      this.selectedTerm = { ...this.sortedTerms[index] };
      this.deleteDialog = true;
    },
    confirmRemove() {
      api
        .delete(`/terms/${this.selectedTerm._id}`)
        .then(() => {
          const index = this.terms.findIndex(
            (x) => x._id === this.selectedTerm._id,
          );
          this.terms.splice(index, 1);
        })
        .finally(() => {
          this.resetDialogs();
        });
    },
    edit(index) {
      this.selectedTerm = { ...this.sortedTerms[index] };
      this.editDialog = true;
    },
    confirmEdit() {
      api
        .put(`/terms/${this.selectedTerm._id}`, this.selectedTerm)
        .then(() => {
          const index = this.terms.findIndex(
            (x) => x._id === this.selectedTerm._id,
          );
          this.terms[index] = this.selectedTerm;
        })
        .finally(() => {
          this.resetDialogs();
        });
    },
    resetDialogs() {
      this.addDialog = false;
      this.deleteDialog = false;
      this.editDialog = false;
      this.selectedIndex = -1;
      this.selectedTerm = {};
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
}

img {
  height: 32px;
  width: 32px;
}

.bold {
  font-weight: bold;
}

.actions .v-icon {
  cursor: pointer;
}

.no-data {
  background: #2d2d2d;
  color: white;
  text-align: center;
}
</style>
