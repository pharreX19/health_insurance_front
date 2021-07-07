export const routes = [
    {
        "path": "/",
        "component": () => import("../views/Dashboard.vue"),
        "name": "dashboard"
    },
    {
        "path": "/companies/:id",
        "component": () => import("../views/Company/Company.vue"),
        "name": "company"
    },
    {
        "path": "/companies",
        "component": () => import("../views/Company/Companies.vue"),
        "name": "companies"
    },
]

