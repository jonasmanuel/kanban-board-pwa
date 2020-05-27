import Vue from 'vue';
import Router from 'vue-router';
import Backlog from '@/components/Backlog';
import Archive from '@/components/Archive';
import KanbanBoard from '@/components/KanbanBoard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/backlog',
      component: Backlog
    },
    {
      path: '/archive',
      component: Archive
    },
    {
      path: '/board',
      component: KanbanBoard
    },
    {
      path: '*',
      redirect: '/board'
    }
  ],
});
