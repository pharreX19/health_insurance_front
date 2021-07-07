import VueRouter from "vue-router";
import { routes } from "./routes";

export const router = new VueRouter({
    routes: routes,
    mode: "history",
    base: process.env.BASE_URL
})

