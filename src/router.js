import { createWebHistory, createRouter } from "vue-router";

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import CandidateList from "./components/CandidateList.vue";
import Detail from "./components/Detail.vue";

const routes = [
  {
    path: "/", redirect: '/candidates' 
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/candidates",
    name: "CandidateList",
    component: CandidateList
  },
  {
    path: `/candidates?search=''&curPage=1&perpage=2`,
    component: CandidateList
  },
  {
    path: "/candidates/:candidate_id",
    name: "Detail",
    props: true,
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router;