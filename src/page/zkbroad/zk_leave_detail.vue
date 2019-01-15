<template>
	<div style="height:100%" class="apply_detail">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		请假单
		</x-header>
		<!--header,1-->
		<!--div,1-->
		<div style="padding-top:40px">
			<!--Group,1-->
			<group>
				<!--Cell,1-->
				<cell primary="title" value-align="left" :border-intent="false">
					<!--div,4-->
					<div slot="icon">
						<img class="img" src="../../../static/img/tx.png"/>
					</div>
					<!--div,4-->
					<!--div,5-->
					<div slot="title" class="title">
						<span>{{pin}}</span><br />
						<span>{{name}}</span><br />
						<span>{{postName}}</span>
					</div>
					<!--div,5-->
				</cell>
				<!--Cell,1-->
				<!--Cell,2-->
				<cell title="申请内容：" primary="title" value-align="left" :border-intent="false">
					<!--Cell,3-->
					<cell :title="'部门：'+deptName" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,3-->
					<!--Cell,4-->
					<cell :title="'申请假类：'+leaveTypeName" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,4-->
					<!--Cell,5-->
					<cell :title="'开始时间：'+beginDateTime" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,5-->
					<!--Cell,10-->
					<cell :title="'结束时间：'+endDateTime" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,10-->
					<!--Cell,6-->
					<cell :title="'申请天数：'+leaveTimeLong+'天'" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,6-->
					<!--Cell,11-->
					<cell title="申请理由：" primary="title" value-align="left" :border-intent="true">
						<!--div,6-->
						<div slot="value" style="text-align:right">
							<!--文本域,1-->
							<x-textarea readonly v-model="applyReasons" :show-counter="false">
							</x-textarea>
							<!--文本域,1-->
						</div>
						<!--div,6-->
					</cell>
					<!--Cell,11-->
					<!--Cell,8-->
					<cell title="附件：" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,8-->
				</cell>
				<!--Cell,2-->
				<!--Cell,9-->
				<cell title="当前审批人：" :value="appUserName" primary="title" value-align="left" :border-intent="false">
				</cell>
				<!--Cell,9-->
			</group>
			<!--Group,1-->
			<!--通讯,1-->
			<div id="approvalDetail">
			</div>
			<!--通讯,1-->
			<!--div,7-->
			<div data-init="poin_initManage({'id':'approvalDetail','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId','businessId':'#businessId','businessType':'#businessType'}},'getApprovalDetail')">
			</div>
			<!--div,7-->
			<!--xTable,1-->
			<x-table class="table" event-render="loadTable" tdList="approvalTable" :cell-bordered="true"
				:content-bordered="true" full-bordered>
				<thead>
					<tr>
						<!--列head,1-->
						<th>
						审批人
						</th>
						<!--列head,1-->
						<!--列head,2-->
						<th>
						审批意见
						</th>
						<!--列head,2-->
						<!--列head,3-->
						<th>
						审批时间
						</th>
						<!--列head,3-->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in approvalTable">
						<!--列body,1-->
						<td>
						{{item.appUserName}}
						</td>
						<!--列body,1-->
						<!--列body,2-->
						<td>
						{{item.appView}}
						</td>
						<!--列body,2-->
						<!--列body,3-->
						<td>
						{{item.appDate}}
						</td>
						<!--列body,3-->
					</tr>
				</tbody>
			</x-table>
			<!--xTable,1-->	
		</div>
		<!--div,1-->
	</div>
</template>
<script type="text/javascript">
import * as poinMessage from '@/util/poin-common/messageManage.js'
import Format from '@/util/date/format.js'

import { XTable,Group,XButton,Tabbar,XDialog,Flexbox,XTextarea,XHeader,Cell,TabbarItem,FlexboxItem} from 'vux'
export default {
 data () {
  return {
    Format:Format,
    tokenId:'',
    pin:'',
  	name:'',
  	postName:'',
  	businessId:'',
  	businessType:'',
  	leaveTypeName:'',
  	deptName:'',
  	beginDateTime:'',
  	endDateTime:'',
  	leaveTimeLong:'',
  	applyReasons:'',
  	appUserName:'',
    approvalTable:[],
    approvalDetail:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/listAllTaskViewsById"}
  }
 },
components: {
    XTable,
    Group,
    XButton,
    Tabbar,
    XDialog,
    Flexbox,
    XTextarea,
    XHeader,
    Cell,
    TabbarItem,
    FlexboxItem
},
mounted (){
this.tokenId = this.$store.state.user.userInfo
let applyDetail = this.$route.params
	this.pin = applyDetail.pin
	this.name = applyDetail.name
	this.postName = applyDetail.postName
	this.businessId = applyDetail.businessId
	this.businessType = applyDetail.businessType
	this.leaveTypeName = applyDetail.leaveTypeName
	this.deptName = applyDetail.deptName
	this.beginDateTime = this.Format(applyDetail.beginDateTime,'YYYY-MM-DD HH:mm')
	this.endDateTime = this.Format(applyDetail.endDateTime,'YYYY-MM-DD HH:mm')
	this.leaveTimeLong = applyDetail.leaveTimeLong
	this.applyReasons = applyDetail.applyReasons
let $this = this;

	this.$el.querySelectorAll('*[data-init]').forEach(function(el,index){
	var init =el.getAttribute('data-init');
	var message = poinMessage.initMessageKey(init);
	$this.poin_initManage(message[0],message[1],message[2]);
});
},
methods : {
	poin_initManage(messageKey,callback,execBefore){
		messageKey.vue = this;
		poinMessage.messageManage(messageKey,callback,execBefore);
	},
	getApprovalDetail(res,data,MessageObject,error){
		if(res.status==200&&data.retCode==1){
			this.approvalTable = data.listData
			let arr = new Array()
			data.retData.forEach(ele => {
				arr.push(ele.appUserName)
			})
			this.appUserName = arr.join(',')
		}
	}
}
}</script>
<style type="text/css" scoped>
.apply_detail >>> .weui-cells {
	margin-top:0;
	font-size:1.2rem
}
.img {
	height:4rem;
	width:4rem;
	border-radius:50%
}
.title {
	padding-left:1em
}
.table {
	margin-top:20px
}
.table th:nth-child(1){
	width:20%
}
.table th:nth-child(2){
	width:45%
}
.table th:nth-child(3){
	width:35%
}
</style>