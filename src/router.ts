import Vue from 'vue';
import Router from 'vue-router';
import QuestionnaireCenter from './views/center/questionnaire/Questionnaire.vue'
import TaskCenter from './views/center/task/Task.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/center/questionnaire',
    },
    {
      path: '/center/questionnaire',
      name: 'QuestionnaireCenter',
      component: QuestionnaireCenter
    },
    {
      path: '/center/task',
      name: 'TaskCenter',
      component: TaskCenter
    }
  ]
})
