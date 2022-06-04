<template>
    <div class="comment">
        <p class="head" style="font-weight: bold;color: #282936;">
            {{ comment.name}}
            <span
                v-if="comment.subComment && comment.subComment.length && !showCommentDetail"
                @click="showCommentDetail = !showCommentDetail"
             style="color:#444444;font-weight: normal">
                [查看回复]
            </span>
            <span style="color: #444444;font-weight: normal" v-if="showCommentDetail && comment.subComment && comment.subComment.length" @click="showCommentDetail=!showCommentDetail">
              [收起回复]
            </span>

        </p>
        <p style="display: inline-block;width: 90%;color: #282936">{{ comment.content }}</p>
      <el-button style="display: inline-block;color: #aca9a9;" size="small" type="text">删除</el-button>
      <el-button style="display: inline-block;" size="mini" type="text" class="reply" @click="showCommentAdd = !showCommentAdd">回复</el-button>
      <div style="border-bottom: 2px solid #dedcee"></div>

        <CommentAdd
            v-if="showCommentAdd"
            :supId="comment.id"
            @handleCommentAdd="closeCommentAdd"
        />
        <CommentList
            v-show="showCommentDetail"
            v-if="comment.subComment && comment.subComment.length"
            :comments="comment.subComment"
        />
    </div>
</template>

<script>
import CommentAdd from "./CommentAdd.vue";
const CommentList = () => import("./CommentList.vue"); //异步加载组件引入解决循环引用问题
export default {
    name: "CommentItem",
    components: {
        CommentAdd,
        CommentList,
    },
    data() {
        return {
            showCommentAdd: false,
            showCommentDetail: true,
        };
    },
    props: {
        comment: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        showCommentAddFun() {
            this.showCommentAdd = true;
        },
        closeCommentAdd() {
            this.showCommentAdd = false;
        },
    },
    mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.comment {
    margin: 20px;
}
.head {
    color: #aca9a9;
    span {
        cursor: pointer;
    }
}
.reply {
    color: #aca9a9;
    cursor: pointer;
}
</style>
