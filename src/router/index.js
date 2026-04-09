import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../views/Jobs.vue')
  },
  {
    path: '/companies',
    name: 'Companies',
    component: () => import('../views/Companies.vue')
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import('../views/Questions.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Messages.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('../views/Resume.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/recruiter/jobs',
    name: 'RecruiterJobs',
    component: () => import('../views/recruiter/JobManagement.vue')
  },
  {
    path: '/recruiter/candidates',
    name: 'CandidateScreening',
    component: () => import('../views/recruiter/CandidateScreening.vue')
  },
  {
    path: '/recruiter/post-job',
    name: 'PostJob',
    component: () => import('../views/recruiter/PostJob.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router