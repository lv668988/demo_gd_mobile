<template>
	<div style="height:100%" class="message">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		消息
		<a slot="right">
			<!--图标,1-->
			<icon type="search" style="font-size:16px">
			</icon>
			<!--图标,1-->
		</a>
		</x-header>
		<!--header,1-->
		<!--通讯,1-->
		<div id="getTestList">
		</div>
		<!--通讯,1-->
		<!--通讯,2-->
		<div id="getOldData">
		</div>
		<!--通讯,2-->
		<!--Mescroll,1-->
		<div id="mescroll" class="mescroll">
			<ul soList="msgList" style="padding:0 30px">
				<li v-for="(item,index) in msgList">
					<span>2018-10-20 08:30:00</span>
					<div class="msgBox" @click="msgDetail(item)">
						<h4>{{item.name}}的请假单需要您审批</h4>
						<p style="text-indent:3em">开始时间：{{item.beginDateTime}}</p>
						<p style="text-indent:3em">结束时间：{{item.endDateTime}}</p>
						<p style="text-indent:3em">请假类型：{{item.leaveName}}</p>
					</div>
				</li>
			</ul>
		</div>
		<!--Mescroll,1-->
	</div>
</template>
<script type="text/javascript">
import '@/util/scroll/mescroll.m.js';
import * as poinMessage from '@/util/poin-common/messageManage.js'

import { FlowState,Icon,XHeader,FlowLine,Flow} from 'vux'
export default {
 data () {
  return {
    time1:'2018-10-09 08:30',
  	time2:'2018-10-10 17:30',
  	leaveType:'出差',
    msgList:[],
    mescroll:null,
    getTestList:{"fileName":"mockRestApi.json","basePath":"{{basePath}}","method":"post","scheme":"{{schemes}}","host":"{{host}}","consume":"0","produce":"0","uri":"/getApplyList"},
    getOldData:{"fileName":"mockRestApi.json","basePath":"{{basePath}}","method":"get","scheme":"{{schemes}}","host":"{{host}}","consume":"0","produce":"0","uri":"/getApplyList1"}
  }
 },
components: {
    FlowState,
    Icon,
    XHeader,
    FlowLine,
    Flow
},
mounted (){
let $this = this;
	this.mescroll = new MeScroll('mescroll', {
		//参数见文档说明，自行添加和修改
		up: {//上拉刷新
		     use:true,
		     page:{size:10},
		     callback:function (page){//上拉刷新回调方法
		       	//平台通讯方式查询数据
		       	$this.poin_initManage(
		       		{'id':'getTestList'},
	       			function after(response,responseData,messageObj){
	       			//通讯后成功赋值给列表数据
	       			   	if(response.ok){
	       			   		$this.msgList = $this.msgList.concat(responseData.getApplyList)
	       			   		$this.mescroll.endSuccess(responseData.getApplyList.length);
	       			   	}
	       			},
	       			function before(messageObj){
	       			   	//通讯前传参
	       			   	messageObj.setData({
	       			   		'offset':page.num-1,
	       			   		'limit':page.size
	       			   	});
	       		 	})		 
		     },
	         empty:{tip:'亲,暂无相关数据哦~' },
		     htmlNodata:'<p class="upwarp-nodata">-- 已经没有数据啦 --</p>',
		     htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
		},
		down:{//下拉加载
		    use:true,
		    callback:function (){//下拉回调方法
	 
		     }
	     }});
},
methods : {
	poin_initManage(messageKey,callback,execBefore){
		messageKey.vue = this;
		poinMessage.messageManage(messageKey,callback,execBefore);
	},
	msgDetail(data){
		this.$router.push({
			name:'zk_message_detail',
			params:data
		})
	}
}
}</script>
<style type="text/css" scoped>
.msgBox {
	padding:4px 30px;
	margin-bottom:20px;
	border:1px solid #ccc;
	border-radius:8px;
	box-shadow:2px 2px 1px #aaa
}
.msgBox h4{
	font-size:20px;
	padding:4px 0;
	color:#666
}
.msgBox p {
	text-indent:3em
}
 /*mescroll滚动的区域,根据需求自行修改 */
  @import '../../styles/mescroll.min.css';
  .mescroll{
        top: 66px;
        bottom: 20px;
        height: auto; 
        position:absolute
  }</style>