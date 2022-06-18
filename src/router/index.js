import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'LoginRegister',
      component:()=>import("@/views/LoginRegister.vue")
    },
    {
        path: '/user',
        name: 'UserLayout',
        component: ()=>import("@/UserLayout.vue"),
        redirect:'/user/usercenter',
        children:[
            {
                path: 'usercenter',
                name: 'UserUserCenter',
                component:()=>import("@/views/UserCenter.vue"),
            },
            {
                path:'searchthesis',
                name:'UserSearchThesis',
                component:()=>import("@/views/SearchThesis.vue")
            },
            {
                path: 'addthesis',
                name:'UserAddThesis',
                component: ()=>import("@/views/AddThesis.vue")
            },
            {
                path:'mynotes',
                name: 'UserMyNotes',
                component: ()=>import("@/views/MyNotes.vue")
            },
            {
                path: 'thesisdetail',
                name: 'UserThesisDetail',
                component: ()=>import("@/views/ThesisDetail.vue")
            },
            {
                path: 'editthesis',
                name: 'UserEditThesis',
                component: ()=>import("@/views/EditThesis.vue")
            }

        ]
    },
    {
        path:'/admin',
        name:'AdminLayout',
        component: ()=>import("@/AdminLayout.vue"),
        redirect: '/admin/usercenter',
        children: [
            {
              path: 'usercenter',
              name: 'AdminUserCenter',
              component: ()=>import("@/views/UserCenter.vue")
            },
            {
                path: 'searchthesis',
                name: 'AdminSearchThesis',
                component: ()=>import("@/views/SearchThesis.vue")
            },
            {
                path: 'addthesis',
                name: 'AdminAddThesis',
                component: ()=>import("@/views/AddThesis.vue")
            },
            {
                path: 'mynotes',
                name: 'AdminMyNotes',
                component: ()=>import("@/views/MyNotes.vue")
            },
            {
                path: 'userlist',
                name: 'UserList',
                component:()=>import("@/views/UserList.vue")
            }
        ]
    }


]

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes,
})

export default router