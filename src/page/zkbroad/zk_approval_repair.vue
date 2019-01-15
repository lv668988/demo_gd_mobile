<template>
	<div style="height:100%" class="approval_detail">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		{{name+'的补刷卡'}}
		</x-header>
		<!--header,1-->
		<!--div,1-->
		<div style="padding-top:40px">
			<!--Group,1-->
			<group>
				<!--Cell,1-->
				<cell primary="title" value-align="left" :border-intent="false">
					<!--div,2-->
					<div slot="icon">
						<img class="img" src="../../../static/img/tx.png"/>
					</div>
					<!--div,2-->
					<!--div,3-->
					<div slot="title" class="title">
						<span>{{pin}}</span><br />
						<span>{{name}}</span><br />
						<span>{{postName}}</span>
					</div>
					<!--div,3-->
					<!--div,4-->
					<div slot="value" style="text-align:right">
						<a @click="isShowApprovalDetail=true">审批详情</a>
					</div>
					<!--div,4-->
				</cell>
				<!--Cell,1-->
				<!--Cell,2-->
				<cell title="申请内容：" primary="title" value-align="left" :border-intent="false" class="applyDetail">
					<!--Cell,3-->
					<cell :title="'部门：'+deptName" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,3-->
					<!--Cell,5-->
					<cell :title="'申请日期：'+checkTime1" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,5-->
					<!--Cell,6-->
					<cell :title="'申请时间：'+checkTime2" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,6-->
					<!--Cell,13-->
					<cell title="申请理由：" primary="title" value-align="left" :border-intent="true">
						<!--div,7-->
						<div slot="value" style="text-align:right">
							<!--文本域,2-->
							<x-textarea readonly v-model="applyReasons" :show-counter="false">
							</x-textarea>
							<!--文本域,2-->
						</div>
						<!--div,7-->
					</cell>
					<!--Cell,13-->
				</cell>
				<!--Cell,2-->
				<!--通讯,3-->
				<div id="approvalPeople">
				</div>
				<!--通讯,3-->
				<!--div,10-->
				<div data-init="poin_initManage({'id':'approvalPeople','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId','leaveIdOrLeaveTypeId':'#repairStr'}},'getApprovalPeople')">
				</div>
				<!--div,10-->
				<!--Cell,14-->
				<cell title="审批人：" :value="approverNameStr" @click.native="showApprover=true" is-link primary="title" value-align="left" :border-intent="true">
				</cell>
				<!--Cell,14-->
				<popup v-model="showApprover" position="bottom" max-height="50%">
        			<group>
						<!--CheckList,1-->
						<checklist title='选择审批人' event-render="loadChecklist" v-model="approver" :options="approverList"
							:check-disabled="true" label-position="right" @on-change="changeApprover">
						</checklist>
						<!--CheckList,1-->
					</group>
				</popup>
				<!--Cell,4-->
				<!--通讯,1-->
				<div id="opinionList">
				</div>
				<!--通讯,1-->
				<!--div,8-->
				<div data-init="poin_initManage({'id':'opinionList','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{}},'getOpinionList')">
				</div>
				<!--div,8-->
				<!--P-Picker,1-->
				<popup-picker title="审批意见：" v-model="applyRemark" :data="applyRemarkList" value-text-align="left"
					@on-change="changeApplyRemark">
				</popup-picker>
				<!--P-Picker,1-->
				<!--文本域,3-->
				<x-textarea show-clear v-model="applyRemarkStr" :show-counter="true" :max="50">
				</x-textarea>
				<!--文本域,3-->				
			</group>
			<!--Group,1-->
			<!--通讯,4-->
			<div id="checkRepair">
			</div>
			<!--通讯,4-->
			<!--通讯,5-->
			<div id="submitApproval">
			</div>
			<!--通讯,5-->
			<!--div,6-->
			<div style="padding:10px">
				<!--按钮,4-->
				<x-button text="结束并生效" :type="types[0]" action-type="button" @click.native="checkRepair2('9','0','结束并生效')">
				</x-button>
				<!--按钮,4-->	
				<!--按钮,5-->
				<x-button text="提交审批" :type="types[1]" action-type="button" @click.native="checkRepair2('1','1','提交审批')">
				</x-button>
				<!--按钮,5-->		
				<!--按钮,6-->
				<x-button text="拒绝" :type="types[2]" action-type="button" @click.native="checkRepair2('0','2','拒绝')">
				</x-button>
				<!--按钮,6-->		
				<!--按钮,7-->
				<x-button text="退回" :type="types[3]" action-type="button" @click.native="checkRepair2('4','3','退回')">
				</x-button>
				<!--按钮,7-->	
			</div>
			<!--div,6-->	
		</div>
		<!--div,1-->
		<!--弹出框,2-->
		<x-dialog v-model="isShowApprovalDetail" class="dialog-demo" :hide-on-blur="false" :scroll="true">
			<!--通讯,2-->
			<div id="approvalDetail">
			</div>
			<!--通讯,2-->
			<!--div,9-->
			<div data-init="poin_initManage({'id':'approvalDetail','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId','businessId':'#businessId','businessType':'#businessType'}},'getApprovalDetail')">
			</div>
			<!--div,9-->
			<!--xTable,2-->
			<x-table event-render="loadTable" tdList="approvalTable" :cell-bordered="true"
				:content-bordered="true" full-bordered>
				<thead>
					<tr>
						<!--列head,4-->
						<th>
						审批人
						</th>
						<!--列head,4-->
						<!--列head,5-->
						<th>
						审批意见
						</th>
						<!--列head,5-->
						<!--列head,6-->
						<th>
						审批时间
						</th>
						<!--列head,6-->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in approvalTable">
						<!--列body,4-->
						<td>
						{{item.appUserName}}
						</td>
						<!--列body,4-->
						<!--列body,5-->
						<td>
						{{item.appView}}
						</td>
						<!--列body,5-->
						<!--列body,6-->
						<td>
						{{item.appDate}}
						</td>
						<!--列body,6-->
					</tr>
				</tbody>
			</x-table>
			<!--xTable,2-->	
			<p style="padding-top:10px;text-align:center;" @click="isShowApprovalDetail=false">
				<!--图标X,2-->
				<x-icon type="ios-close-outline" style="fill:#aaa;"></x-icon>
				<!--图标X,2-->
			</p>				
		</x-dialog>
		<!--弹出框,2-->
	</div>
</template>
<script type="text/javascript">
import * as poinMessage from '@/util/poin-common/messageManage.js'
import Format from '@/util/date/format.js'

import { XTable,Group,XButton,Tabbar,XDialog,XTextarea,PopupPicker,Flexbox,Picker,Popup,Checklist,XHeader,Cell,TabbarItem,FlexboxItem} from 'vux'
export default {
 data () {
  return {
    Format:Format,
  	repairStr:'1',
  	id:'',
    pin:'',
  	name:'',
  	postName:'',
  	businessId:'',
  	businessType:'',
  	approvalOrNot:'',
  	leaveTypeName:'',
  	deptName:'',
  	checkTime1:'',
  	checkTime2:'',
  	applyReasons:'',
  	approver:[],
    approverList:[],
    approverPinStr:'',
    approverNameStr:'',
    showApprover:false,
    applyRemark:[],
    applyRemarkList:[],
    applyRemarkStr:'',
    isShowApprovalDetail:false,
    types:['primary','default','default','default'],
    approvalTable:[],
    checkRepair:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.104:8080","consume":"0","produce":"0","uri":"/flowTask/repairTaskCheck"},
    opinionList:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"get","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/getAppOpinionList"},
    approvalPeople:{"fileName":"RepairApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/repair/findApproverByPage"},
    submitApproval:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.104:8080","consume":"0","produce":"0","uri":"/flowTask/commitTaskRepair"},
    approvalDetail:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/listAllTaskViewsById"}
  }
 },
components: {
    XTable,
    Group,
    XButton,
    Tabbar,
    XDialog,
    XTextarea,
    PopupPicker,
    Flexbox,
    Picker,
    Popup,
    Checklist,
    XHeader,
    Cell,
    TabbarItem,
    FlexboxItem
},
mounted (){
this.tokenId = this.$store.state.user.userInfo
let applyDetail = this.$route.params
	this.id = applyDetail.id
	this.pin = applyDetail.pin
	this.name = applyDetail.name
	this.postName = applyDetail.postName
	this.businessId = applyDetail.businessId
	this.businessType = applyDetail.businessType
	this.leaveTypeName = applyDetail.leaveTypeName
	this.deptName = applyDetail.deptName
	this.checkTime1 = this.Format(applyDetail.checkTime,'YYYY-MM-DD')
	this.checkTime2 = this.Format(applyDetail.checkTime,'HH:mm')
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
	// 通讯——获取审批人
	getApprovalPeople(res,data,MessageObject,error){
		if(res.status==200&&data.retCode==1){
			let arr = new Array()
			data.listData.forEach(ele => {
				arr.push({'key':ele.id,'value':ele.name})
			})
			this.approverList = arr
		}
	},
	// 通讯——获取审批意见
	getOpinionList(res,data,MessageObject,error){
		if(res.status==200&&data.retCode==1){
			let arr1 = new Array()
			let arr2 = new Array()
			data.listData.forEach(ele => {
				arr1.push(ele.name)
			})	
			arr2.push(arr1)
			this.applyRemarkList = arr2
		}
	},
	// 通讯——获取审批节点
	getApprovalDetail(res,data,MessageObject,error){
		if(res.status==200&&data.retCode==1){
			this.approvalTable = data.listData
		}
	},
	checkRepair1(res,data,MessageObject,error){
		if(res.status==200 && data.retCode==1){
			if(data.retData == '1'){
				this.commitTask('结束并生效')
			}else{
				setTimeout(() => {
      				this.$vux.toast.show({
      					type: 'warn',
 						text: '您没有权限批准此单据，请选择审批人！',
 						width: '10em'
					})      
      			}, 500)
			}		
		}
	},
	// 通讯——单据审批
	submitApproval1(res,data,MessageObject,error){
		this.$vux.loading.show({
       		text: 'loading'
     	})
		if(res.status==200 && data.retCode==1){
			setTimeout(() => {
      	  		this.$vux.loading.hide() 
      			this.$vux.toast.show({
 					text: data.retMsg
				})      
      		}, 500)
		}else {
			setTimeout(() => {
      	  		this.$vux.loading.hide() 
      	  		this.$vux.toast.show({
 					type: 'warn',
 					text: data.retMsg
				})    
      		}, 500)   	     
		}
	},
	// 选择审批人
	changeApprover(value,label){
		this.approverPinStr = value.join(',')
		this.approverNameStr = label.join(',')
	},
	// 选择审批意见
	changeApplyRemark(val){
		this.applyRemarkStr = val[0]
	},
	// 单据校验
	checkRepair2(approvalOrNot,index,msg){
		this.approvalOrNot = approvalOrNot
		this.types = ['default','default','default','default']
		this.types[index] = 'primary'
     	if(this.approvalOrNot == '9'){
			this.poin_initManage({
			'id':'checkRepair',
			'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
			'requestFields':{'tokenId':'#tokenId','id':'#id'}
			},'checkRepair1')
		}else{
			this.commitTask(msg)
		}
	},
	commitTask(msg){	
      	let that = this
		this.$vux.confirm.show({
    		title: 'Title',
    		content: '是否'+msg,
    		onConfirm () {
    			that.poin_initManage({
      			'id':'submitApproval',
      			'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      			'requestFields':{'id':'#id','approvalOrNot':'#approvalOrNot','tokenId':'#tokenId','businessId':'#businessId','appView':'#applyRemarkStr','id':'#id'}
      			},'submitApproval1')
    		}
  		})
	}
}
}</script>
<style type="text/css" scoped>
.approval_detail >>> .weui-cells {
	margin-top:0;
	font-size:1.2rem
}
.applyDetail >>> .weui-cell {
	//font-size:1.2rem
}
.img {
	height:4rem;
	width:4rem;
	border-radius:50%
}
.title {
	padding-left:1em
}
.dialog-demo .weui-dialog{
    border-radius: 8px;
  }
</style>