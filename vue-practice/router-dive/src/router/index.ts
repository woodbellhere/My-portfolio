import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title: string;
  }
}

const routesMap: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "登录page",
    },
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "索引页",
    },
  },
];

// {
//   path: "/",
//   component: () => import("../components/root.vue"),
//   // redirect: "/user1",
//   redirect: (to) => {
//     return "/user1";
//   },
//   children: [
//     {
//       path: "/user1",
//       components: {
//         default: () => import("../components/A.vue"),
//       },
//     },
//     {
//       path: "/user2",
//       components: {
//         b: () => import("../components/B.vue"),
//         c: () => import("../components/C.vue"),
//       },
//     },
//   ],
// },
// {
//   path: "/",
//   name: "login",
//   component: () => import("../components/login.vue"),
// },
// {
//   path: "/register",
//   // path: 'register/:id
//   name: "register",
//   component: () => import("../components/register.vue"),
// },
// {
//   path: "/",
//   name: "father Route",
//   component: () => import("../components/footer.vue"),
//   children: [
//     {
//       path: "",
//       name: "login",
//       component: () => import("../components/login.vue"),
//     },
//     {
//       path: "register",
//       // path: 'register/:id
//       name: "register",
//       component: () => import("../components/register.vue"),
//     },
//   ],
// },

const router = createRouter({
  history: createWebHistory(),
  routes: routesMap, // short for `routes: routes`
});

export default router;
