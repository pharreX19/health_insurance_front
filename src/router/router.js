import VueRouter from "vue-router";
import Auth from "../js/auth";
import {
    routes
} from "./routes";
import '../../node_modules/nprogress/nprogress.css';
import NProgress from 'nprogress';
import { store } from "../store";

export const router = new VueRouter({
    routes: routes,
    mode: "history",
    base: process.env.BASE_URL
})


router.beforeEach((to, from, next) => {
    NProgress.start()
    const authorize = to.meta;
    const currentUserRole = new Auth().role;
    console.log('THIS SIS FROM ', Object.keys(currentUserRole).length);
    if (authorize) {
        console.log(authorize);
        if (!currentUserRole) {
            NProgress.done();
            return next({
                path: '/login',
                query: {
                    returnUrl: to.path
                }
            });
        }
    }
    if (authorize.length && !authorize.includes(currentUserRole)) {
        return next({
            path: '/'
        });
    }
    next();
})

// router.beforeResolve((to, from, next) => {
//     if (to.name) {
//         NProgress.start()
//     }
//     next()
// });


router.afterEach(() => {
    NProgress.done()
    console.log(store.state.loading);
});