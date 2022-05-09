<template>
  <v-container>
    <v-row>
        <v-btn @click="back" append-icon="mdi-home" color="primary">Home</v-btn>
        <v-spacer />
        <v-btn @click="add" append-icon="mdi-add" color="blue">Add Term</v-btn>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="10">
        <v-table theme="light">
          <thead>
          <tr>
            <th class="text-left">
              Term
            </th>
            <th class="text-right">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(term, i) in sortedTerms"
            :key="i"
          >
            <td>
              <v-text-field
                v-if="editing === i"
                v-model="term.name"
                @focusout="save(i)"
                @keyup.enter="save(i)"
              />
              <template v-else>{{term.name}}</template>
            </td>
            <td class="text-right">
              <v-icon @click="remove(i)">mdi-delete</v-icon>
              <v-icon @click="edit(i)">mdi-pencil</v-icon>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {api} from '@/plugins/axios';

export default {
  name: "SusTerms",
  data() {
    return {
      terms: [],
      editing: null,
    }
  },
  computed: {
    sortedTerms() {
      return [...this.terms].sort((a, b) => {
        const c = a.toLowerCase();
        const d = b.toLowerCase();
        if (c < d) return -1;
        if (c > d) return 1;
        return 0;
      })
    }
  },
  mounted() {
    api.get('/terms').then(({data}) => {
      this.terms = data;
    })
  },
  methods: {
    back() {
      this.$router.push('/');
    },
    add() {
      this.terms.push({})
      this.editing = this.terms.length - 1;
    },
    remove(index) {
      this.terms.splice(index, 1)
    },
    edit(index) {
      this.editing = index;
    },
    save(index) {
      console.log('saving index', index)
      if (this.terms[index].name === undefined) {
        this.remove(index);
      }
      this.editing = null;
    }
  }
}
</script>

<style scoped>

</style>
