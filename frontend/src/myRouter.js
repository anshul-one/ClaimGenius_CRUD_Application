import { createWebHistory, createRouter } from "vue-router";
import TablePage from "./pages/TablePage.vue";
import FormPage from "./pages/FormPage.vue";

const routes = [
  { path: "/", component: TablePage },
  { path: "/form", component: FormPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
