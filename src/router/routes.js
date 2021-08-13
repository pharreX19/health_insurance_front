
export const routes = [
    {
        path: "/login",
        component: () => import("../views/Auth/Login.vue"),
        name: "login"
    },
    {
        path: "/",
        component: () => import("../views/Home/Home.vue"),
        name: "home"
    },
    {
        path: "/companies/:id",
        component: () => import("../views/Company/Company.vue"),
        name: "company"
    },
    {
        path: "/companies",
        component: () => import("../views/Company/Companies.vue"),
        name: "companies"
    },
    {
        path: "/companies/:id",
        component: () => import("../views/Company/Company.vue"),
        name: "company"
    },
    {
        path: "/service-providers",
        component: () => import("../views/ServiceProviders/ServiceProviders.vue"),
        name: "service-providers"
    },
    {
        path: "/services",
        component: () => import("../views/Service/Services.vue"),
        name: "services"
    },
    {
        path: "/limit-groups",
        component: () => import("../views/ServiceLimitGroup/LimitGroups.vue"),
        name: "limit-groups"
    },
    {
        path: "/subscribers",
        component: () => import("../views/Subscriber/Subscribers.vue"),
        name: "subscribers"
    },
    {
        path: "/subscriber/:id",
        component: () => import("../views/Subscriber/Subscriber.vue"),
        name: "subscriber",
        
    },
    {
        path: "/subscriber/search/:type",
        component: () => import("../views/Subscriber/SubscriberSearch.vue"),
        name: "subscriber-search",
    },
    {
        path: "/subscriptions/type",
        component: () => import("../views/Subscription/SubscriptionPolicySelect.vue"),
        name: "subscription-policy-select"
    },
    {
        path: "/subscriptions/type/:id",
        component: () => import("../views/Subscription/SubscriptionPlanSelect.vue"),
        name: "subscription-plan-select"
    },
    {
        path: "/subscriptions/create",
        component: () => import("../views/Subscription/SubscriptionsCreate.vue"),
        name: "subscriptions-create",
    },
    
    {
        path: "/subscriptions/:id/edit",
        component: () => import("../views/Subscription/SubscriptionsEdit.vue"),
        name: "subscriptions-edit",
        props: {
            id: (route) => route.params.id
        }
    },
    {   
        path: "/subscribers/:id/request-service",
        component: () => import("../views/RequestService/RequestService.vue"),
        name: "request-service",
    },
    {   
        path: "/policies",
        component: () => import("../views/Policy/Policy.vue"),
        name: "policy",
    },
    {   
        path: "/policies/:id",
        component: () => import("../views/Policy/PolicyView.vue"),
        name: "policy-view",
    },
    {   
        path: "/episodes",
        component: () => import("../views/Episode/Episodes.vue"),
        name: "episodes",
    },
    {   
        path: "/roles",
        component: () => import("../views/Role/Roles.vue"),
        name: "roles",
    },
    {
        path: "/catchAll(.*)",
        component: () => import("../views/Subscriber/Subscriber.vue"),
        name: "not-found" 
    },
]

