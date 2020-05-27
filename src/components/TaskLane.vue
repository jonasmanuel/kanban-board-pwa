<template>
  <div class="card" >
    <h3 class="card-header">{{ title }}</h3>
    <div class="card-body">
      <draggable
        class="item-holder"
        v-model="draggables"
        v-bind="{ group: 'default' }"
        :animation="200"
        ghost-class="ghost-card"
      >
        <div v-for="item in filteredItems" :key="item.id">
          <item :item="item"></item>
        </div>
      </draggable>
    </div>
    <div class="card-footer text-muted">{{itemCount}}</div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import TaskLaneItem from './TaskLaneItem';

export default {
  name: 'TaskLane',
  props: ['items', 'title', 'id', 'filter'],
  components: {
    item: TaskLaneItem,
    draggable: Draggable
  },
  computed: {
    itemCount() {
      if (!this.items) return '';
      if (this.items.length === 1) return '1 task';
      return `${this.items.length} tasks`;
    },
    filteredItems() {
      if (!this.filter || this.filter.length === 0) {
        return this.items;
      }
      return this.items.filter(item => {
        const topic = item.text.match(
          /[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF0-9 ]+:/i
        )[0];
        return this.filter.some(f => topic.toLowerCase().startsWith(f.toLowerCase()));
      });
    },
    draggables: {
      get() {
        return this.items;
      },
      set(items) {
        this.$store.commit('updateItems', {
          items,
          id: this.id
        });
      }
    }
  }
};
</script>

<style>
.card-body > * {
  min-height: 50px;
}

.item-holder {
  max-height: calc(100vh - 390px);
  overflow-y: auto;
}

</style>
