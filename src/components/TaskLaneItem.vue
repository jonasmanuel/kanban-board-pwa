<template>
  <div class="card task-lane-item" :style="style">
    <div class="card-block ">
      <h5 class="card-title">
        <span class="text-muted">#{{item.id}}</span>
        {{item.text}}
      </h5>
      <button type="button" :class="archiveButtonClass" @click="archiveItem()">
         <i class="fa fa-archive" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskLaneItem',
  props: ['item'],
  computed: {
    style() {
      return this.item.color ? `background: ${this.item.color}` : '';
    },
    archiveButtonClass() {
      return {
        btn: true,
        hidden: !this.$store.state.items.done.includes(this.item),
        'pull-right': true,
        'archive-button': true
      };
    }
  },
  methods: {
    archiveItem() {
      this.$store.commit('archiveItem', this.item);
    }
  }
};
</script>

<style>
.card.task-lane-item {
  background: #627180;
  border-radius: 0.5em;
  cursor: move;
}
</style>
