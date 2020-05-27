<template>
  <div class='backlog-view'>
    <div class='card' v-for='item in archiveItems' :key='item.id'>
      <div class='card-block' :style='style(item)'>
        <h5 class='card-title' >
          <span class='text-muted'>#{{item.id}}</span>
          {{item.text}}
          <button
            type='button'
            class='close-button pull-right'
            @click='removeItem(item)'
          >
            <span>&times;</span>
          </button>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  name: 'Archive',
  computed: mapState({
    archiveItems: s => s.items.archive
  }),
  methods: {
    style(item) {
      return item.color ? `background: ${item.color}` : '';
    },

    removeItem(item) {
      this.$store.commit('removeItem', item);
    }
  }
};
</script>
