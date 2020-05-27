<template>
  <div class="board">
    <div>
      Topic:
      <vue-select multiple taggable v-model="filter" :options="topics" />
    </div>
    <div class="row">
      <div class="col-md">
        <task-lane id="todo" title="Todo" :items="todoItems" :filter="filter"></task-lane>
      </div>
      <div class="col-md">
        <task-lane id="inProgress" title="In progress" :items="inProgressItems" :filter="filter"></task-lane>
      </div>
      <div class="col-md">
        <task-lane id="done" title="Done" :items="doneItems" :filter="filter"></task-lane>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import TaskLane from './TaskLane';

export default {
  name: 'KanbanBoard',
  props: ['filter'],
  components: {
    'task-lane': TaskLane,
    'vue-select': vSelect
  },
  computed: {
    topics() {
      const allItems = Object.values(this.$store.state.items).reduce((all, current) =>
        all.concat(current)
      , []);
      const allTopics = allItems
        .map(
          item =>
            item.text.match(/([A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF0-9 ]+):/i)[0].replace(':', '')
        )
        .filter(item => item.length > 0);
      return Array.from(new Set(allTopics));
    },
    ...mapState({
      todoItems: s => s.items.todo,
      inProgressItems: s => s.items.inProgress,
      doneItems: s => s.items.done
    })
  }
};
</script>

