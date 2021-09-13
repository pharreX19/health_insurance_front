import { Role } from "../js/helpers";
import { store } from "../store";

export const routes = [
    {
        path: "/login",
        component: () => import("../views/Auth/Login.vue"),
        name: "login",
        meta: {authorize: []}
    },
    {
        path: "/",
        component: () => import("../views/Home/Home.vue"),
        name: "home",
        meta: {authorize: [Role.Admin, Role.Receptionist, Role.User, Role.Employee, Role.Accountant]}
    },
    // {
    //     path: "/companies/:id",
    //     component: () => import("../views/Company/Company.vue"),
    //     name: "company"
    // },
    {
        path: "/companies",
        component: () => import("../views/Company/Companies.vue"),
        name: "companies",
        beforeEnter: (to, from, next) => {
            store.dispatch("company/get_models", 'companies').then(() => next());
            
        },
        meta: {authorize: [Role.Admin]}
    },
    // {
    //     path: "/companies/:id",
    //     component: () => import("../views/Company/Company.vue"),
    //     name: "company",
    //     meta: {authorize: [Role.Admin]}
    // },
    {
        path: "/service-providers",
        component: () => import("../views/ServiceProviders/ServiceProviders.vue"),
        name: "service-providers",
        meta: {authorize: [Role.Admin]}
    },
    {
        path: "/services",
        component: () => import("../views/Service/Services.vue"),
        name: "services",
        meta: {authorize: [Role.Admin, Role.User]}
    },
    {
        path: "/limit-groups",
        component: () => import("../views/ServiceLimitGroup/LimitGroups.vue"),
        name: "limit-groups",
        meta: {authorize: [Role.Admin]}
    },
    {
        path: "/subscribers",
        component: () => import("../views/Subscriber/Subscribers.vue"),
        name: "subscribers",
        meta: {authorize: [Role.Admin]},
        beforeEnter: (to, from, next) => {
            store.dispatch("subscriber/get_models", 'subscribers').then(() => next());
        }
    },
    {
        path: "/subscriber/:id",
        component: () => import("../views/Subscriber/Subscriber.vue"),
        name: "subscriber",
        meta: {authorize: [Role.Admin, Role.User, Role.Receptionist]}
        
    },
    {
        path: "/subscriber/search/:type",
        component: () => import("../views/Subscriber/SubscriberSearch.vue"),
        name: "subscriber-search",
        meta: {authorize: [Role.Admin, Role.User, Role.Receptionist]}
    },
    {
        path: "/subscriptions/type",
        component: () => import("../views/Subscription/SubscriptionPolicySelect.vue"),
        name: "subscription-policy-select",
        meta: {authorize: [Role.Admin, Role.User]}
    },
    {
        path: "/subscriptions/type/:id",
        component: () => import("../views/Subscription/SubscriptionPlanSelect.vue"),
        name: "subscription-plan-select",
        meta: {authorize: [Role.Admin, Role.User]}
    },
    {
        path: "/subscriptions/create",
        component: () => import("../views/Subscription/SubscriptionsCreate.vue"),
        name: "subscriptions-create",
        meta: {authorize: [Role.Admin, Role.User]}
    },
    
    {
        path: "/subscriptions/:id/edit",
        component: () => import("../views/Subscription/SubscriptionsEdit.vue"),
        name: "subscriptions-edit",
        meta: {authorize: [Role.Admin, Role.User]},
        props: {
            id: (route) => route.params.id
        }
    },
    {   
        path: "/subscribers/:id/request-service",
        component: () => import("../views/RequestService/RequestService.vue"),
        name: "request-service",
        meta: {authorize: [Role.Admin, Role.Receptionist]}
    },
    {   
        path: "/policies",
        component: () => import("../views/PolicyPlan/Policies.vue"),
        name: "policy",
        meta: {authorize: [Role.Admin]},
        beforeEnter: (to, from, next) => {
            store.dispatch("policy/get_models", "policies?include=plans.services", true).then(() => next());
        }
    },
    {   
        path: "/policies/:id",
        component: () => import("../views/PolicyPlan/PolicyPlans.vue"),
        name: "policy-view",
        meta: {authorize: [Role.Admin]},
        beforeEnter: (to, from, next) => {
            store.dispatch("plan/get_models", `policies/${to.params.id}?include=plans.serviceLimitGroups`, true).then(() => next());
        }
    },
    // {   
    //     path: "/policies/:id",
    //     component: () => import("../views/Policy/PolicyView.vue"),
    //     name: "policy-view",
    //     meta: {authorize: [Role.Admin]}
    // },
    {   
        path: "/episodes",
        component: () => import("../views/Episode/Episodes.vue"),
        name: "episodes",
        meta: {authorize: [Role.Admin, Role.Accountant]}
    },
    {   
        path: "/roles",
        component: () => import("../views/Role/Roles.vue"),
        name: "roles",
        meta: {authorize: [Role.Admin]}
    },
    {   
        path: "/roles/:id/users",
        component: () => import("../views/Role/RoleUsers.vue"),
        name: "role-users",
        meta: {authorize: [Role.Admin]}
    },
    {
        path: "/catchAll(.*)",
        component: () => import("../views/Subscriber/Subscriber.vue"),
        name: "not-found" ,
        meta: {authorize: []}
    },
]

