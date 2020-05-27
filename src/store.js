import Vue from 'vue';
import Vuex from 'vuex';
import localStoragePlugin from './plugins/localStorage';

Vue.use(Vuex);

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)},100%,30%)`;
}

/* eslint-disable no-param-reassign */
function assignColor(state, item) {
  const topics = item.text.match(/[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF0-9 ]+:/i);
  if (topics) {
    const topic = topics[0];
    if (!state.colors[topic]) {
      state.colors[topic] = getRandomColor();
    }
    item.color = state.colors[topic];
  }
}


/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  plugins: [localStoragePlugin],
  state: {
    items: {
      todo: [],
      inProgress: [],
      done: [],
      archive: []
    },
    colors: {},
    nextId: 1
  },
  mutations: {
    addItem(state, item) {
      assignColor(state, item);
      state.items.todo.push(Object.assign(item, { id: state.nextId }));
      state.nextId += 1;
    },

    updateItems(state, { items, id }) {
      state.items[id] = items;
      items.status = id;
    },

    removeItem(state, item) {
      [state.items.todo, state.items.inProgress, state.items.done, state.items.archive].forEach(
        array => {
          const indexInArray = array.findIndex(i => i.id === item.id);
          if (indexInArray > -1) {
            array.splice(indexInArray, 1);
          }
        }
      );
    },
    archiveItem(state, item) {
      [state.items.todo, state.items.inProgress, state.items.done].forEach(
        array => {
          const indexInArray = array.findIndex(i => i.id === item.id);
          if (indexInArray > -1) {
            array.splice(indexInArray, 1);
            state.items.archive.push(item);
          }
        }
      );
    },
    initializeStore() {
      let data = localStorage.getItem('boardState');
      if (data) {
        data = JSON.parse(data);
        data.items.todo.forEach(item => { assignColor(data, item); item.status = 'todo'; });
        data.items.inProgress.forEach(item => { assignColor(data, item); item.status = 'inProgress'; });
        data.items.done.forEach(item => { assignColor(data, item); item.status = 'done'; });
        this.replaceState(Object.assign(this.state, data));
        if (!data.items.archive) {
          data.items.archive = [];
        }
      }
    }
  }
});
