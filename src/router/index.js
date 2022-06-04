import Vue from 'vue'
import VueRouter from 'vue-router'
import UserCenter from "@/views/UserCenter";
import SearchThesis from "@/views/SearchThesis";
import AddThesis from "@/views/AddThesis";
import MyNotes from "@/views/MyNotes";
import ThesisDetail from "@/views/ThesisDetail";
import LoginRegister from "@/views/LoginRegister";
import UserLayout from "@/UserLayout";
import EditThesis from "@/views/EditThesis";
import AdminLayout from "@/AdminLayout";
import AdminSearchThesis from "@/views/AdminSearchThesis";

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
        path: '/user',
        name: 'UserLayout',
        component: UserLayout,
        redirect:'/user/usercenter',
        children:[
            {
                path: 'usercenter',
                name: 'UserCenter',
                component: UserCenter,
            },
            {
                path:'searchthesis',
                name:'SearchThesis',
                component:SearchThesis
            },
            {
                path: 'addthesis',
                name:'AddThesis',
                component: AddThesis
            },
            {
                path:'mynotes',
                name: 'MyNotes',
                component: MyNotes
            },
            {
                path: 'thesisdetail',
                name: 'ThesisDetail',
                component: ThesisDetail
            },
            {
                path: 'editthesis',
                name: 'EditThesis',
                component: EditThesis
            }

        ]
    },
    {
        path:'/admin',
        name:'AdminLayout',
        component: AdminLayout,
        redirect: '/admin/usercenter',
        children: [
            {
              path: 'usercenter',
              name: 'UserCenter',
              component: UserCenter
            },
            {
                path: 'adminsearchthesis',
                name: 'AdminSearchThesis',
                component: AdminSearchThesis
            },
            {
                path: 'addthesis',
                name: 'AddThesis',
                component: AddThesis
            },
            {
                path: 'mynotes',
                name: 'MyNotes',
                component: MyNotes
            }
        ]
    }


]

const router = new VueRouter({
    mode:'history',
    routes
})

export default router