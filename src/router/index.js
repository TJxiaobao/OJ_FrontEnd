import { createRouter, createWebHistory } from "vue-router";
import { unauthorized } from "@/api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "loginView",
      component: () => import("@/views/login-view.vue"),
      children: [
        {
          path: "",
          name: "login",
          component: () => import("@/views/login/index.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/views/register/index.vue"),
        },
      ],
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home-view.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isUnauthorized = unauthorized();
  if (to.name.startsWith("loginView") && !isUnauthorized) {
    next("/home");
  } else if (to.fullPath.startsWith("/home") && isUnauthorized) {
    next("/");
  } else {
    next();
  }
});
export default router;
