import Vue from 'vue'
import Vuex from 'vuex'
import {
    deepFind
} from '../utils/index'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {//state相当于data，专门保存共享数据的
        comments: [{
            id: '1',
            name: '天理要尝蛆',
            time: '1641645103',
            content: '刚刚唉',
            sup: null,
            subComment: [{
                id: '4',
                name: '鸦青云厘',
                time: '1641652303',
                content: '一个赞，好拉',
                subComment: [{
                    id: '7',
                    name: 'Alanleica',
                    time: '1641652303',
                    content: '吃了几斤澳洲淡水小龙虾',
                    subComment: [],
                    sup: '4'
                }, ],
                sup: '1'
            },

                {
                    id: '7',
                    name: 'Alanleica',
                    time: '1641652303',
                    content: '吃了几斤澳洲淡水小龙虾',
                    subComment: [{
                        id: '4',
                        name: '鸦青云厘',
                        time: '1641652303',
                        content: '一个赞，好拉',
                        subComment: [],
                        sup: '7'
                    }, ],
                    sup: '1'
                },
                {
                    id: '6',
                    name: '氵无名灬氏',
                    time: '1641652303',
                    content: '很快惹',
                    subComment: [],
                    sup: '1'
                }
            ]
        },
            {
                id: '2',
                sup: null,
                name: 'Ryan_Geeks',
                time: '1641627103',
                content: '吃本草纲目[妙啊]',
                subComment: [{
                    id: '5',
                    name: '谋杀夏洛克',
                    time: '1641652303',
                    content: '这龙虾看爽了 为你投个币[歪嘴]',
                    subComment: [],
                    sup: '2'
                }]
            },
            {
                id: '3',
                sup: null,
                name: '是设计师橙子',
                time: '1641616303',
                content: '好了好了不掉帧了',
                subComment: []
            }
        ],
        directions:[
            {
                value:1,
                label:"其他",
                children:[
                    {
                        value:1,
                        label:"其他",
                        children:[
                            {
                                value:1,
                                label:"其他",
                                //children:null
                            }
                        ]
                    }
                ]
            },
            {
                value:2,
                label:"工业技术",
                children:[
                    {
                        value:2,
                        label:"自动化技术",
                        children:[
                            {
                                value:2,
                                label:"计算机技术",
                                //children:null
                            },
                            {
                                value:3,
                                label:"自动化技术及设备",
                                //children:null
                            },
                            {
                                value:4,
                                label:"自动化基础理论",
                                //children:null
                            },
                            {
                                value:5,
                                label:"遥感技术",
                                //children:null
                            }
                        ]
                    },
                    {
                        value:3,
                        label:"电子技术",
                        children:[
                            {
                                value:6,
                                label:"通信",
                                //children:null
                            },
                            {
                                value:7,
                                label:"微电子学",
                                //children:null
                            }
                        ]
                    }
                ]
            }
        ]
    },
    mutations: {//用于保存修改共享数据的方法
        addComment(state, data) {
            console.log(data)
            if (data.sup) {
                let commentSup = deepFind(state.comments, data.sup)
                console.log('commentSup', commentSup)
                commentSup.subComment.unshift(data)
            } else {
                state.comments.unshift(data)
            }
        },
        addDirections(state,data){
            state.directions=data;
        }
    },
    actions: {},
    modules: {}
})