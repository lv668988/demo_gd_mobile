import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//用ui组件
import zk_home from  '../page/zkbroad/zk_home.vue'
import zk_approval from  '../page/zkbroad/zk_approval.vue'
import zk_approvals_detail from  '../page/zkbroad/zk_approvals_detail.vue'
import zk_apply_leave from  '../page/zkbroad/zk_apply_leave.vue'
import zk_apply_repair from  '../page/zkbroad/zk_apply_repair.vue'
import zk_message from  '../page/zkbroad/zk_message.vue'
import zk_message_detail from  '../page/zkbroad/zk_message_detail.vue'
import zk_leave_detail from  '../page/zkbroad/zk_leave_detail.vue'
import zk_repair_detail from  '../page/zkbroad/zk_repair_detail.vue'
import zk_crj_detail from  '../page/zkbroad/zk_crj_detail.vue'
import zk_apply_crj from  '../page/zkbroad/zk_apply_crj.vue'
import zk_approval_repair from  '../page/zkbroad/zk_approval_repair.vue'
import zk_approval_crj from  '../page/zkbroad/zk_approval_crj.vue'
import zk_approval_leave from  '../page/zkbroad/zk_approval_leave.vue'
import login from  '../page/zkbroad/login.vue'
export default new Router({
	mode:'history',
  //路由配置
  routes: [
    {
       path:'/login',
       component:login,
       name:'login'
    },
    {
       path:'/zk_approval_leave',
       component:zk_approval_leave,
       name:'zk_approval_leave'
    },
    {
       path:'/zk_approval_crj',
       component:zk_approval_crj,
       name:'zk_approval_crj'
    },
    {
       path:'/zk_approval_repair',
       component:zk_approval_repair,
       name:'zk_approval_repair'
    },
    {
       path:'/zk_apply_crj',
       component:zk_apply_crj,
       name:'zk_apply_crj'
    },
    {
       path:'/zk_crj_detail',
       component:zk_crj_detail,
       name:'zk_crj_detail'
    },
    {
       path:'/zk_repair_detail',
       component:zk_repair_detail,
       name:'zk_repair_detail'
    },
    {
       path:'/zk_leave_detail',
       component:zk_leave_detail,
       name:'zk_leave_detail'
    },
    {
       path:'/zk_message_detail',
       component:zk_message_detail,
       name:'zk_message_detail'
    },
    {
       path:'/zk_message',
       component:zk_message,
       name:'zk_message'
    },
    {
       path:'/zk_apply_repair',
       component:zk_apply_repair,
       name:'zk_apply_repair'
    },
    {
       path:'/zk_apply_leave',
       component:zk_apply_leave,
       name:'zk_apply_leave'
    },
    {
       path:'/zk_approvals_detail',
       component:zk_approvals_detail,
       name:'zk_approvals_detail'
    },
    {
       path:'/zk_approval',
       component:zk_approval,
       name:'zk_approval',
       meta: {
           keepAlive: false // 不需要缓�?????????
       }
    },
    {
       path:'/',
       component:zk_home,
       name:'zk_home',
       meta: {
           keepAlive: false // 不需要缓�?????????
       }
    }]
  })
