<template>
	<div style="height:100%" class="approval_detail">
		<!--header,2-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		{{name+'的出入境'}}
		</x-header>
		<!--header,2-->
		<!--div,7-->
		<div style="padding-top:40px">
		<!--Group,2-->
		<group>
			<!--Cell,47-->
			<cell primary="title" value-align="left" :border-intent="false">
				<!--div,18-->
				<div slot="icon">
					<img class="img" src="../../../static/img/tx.png"/>
				</div>
				<!--div,18-->
				<!--div,19-->
				<div slot="title" class="title">
					<span>{{pin}}</span><br />
					<span>{{name}}</span><br />
					<span>{{postName}}</span>
				</div>
				<!--div,19-->
				<!--div,20-->
				<div slot="value" style="text-align:right">
					<a @click="isShowApprovalDetail=true">审批详情</a>
				</div>
				<!--div,20-->
			</cell>
			<!--Cell,47-->
			<!--Cell,25-->
			<cell title="姓名：" :value="name" primary="title" value-align="right" :border-intent="false">
			</cell>
			<!--Cell,25-->
			<!--Cell,26-->
			<cell title="性别：" :value="sex" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,26-->
			<!--Cell,27-->
			<cell title="出生日期：" :value="birthDay" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,27-->
			<!--Cell,28-->
			<cell title="身份证号码：" :value="identityCard" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,28-->
			<!--Cell,29-->
			<cell title="工作单位：" :value="deptName" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,29-->
			<!--Cell,30-->
			<cell title="现任职务：" :value="postName" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,30-->
			<!--Cell,40-->
			<cell title="婚姻状况：" :value="marital" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,40-->
			<!--Cell,31-->
			<cell title="联系方式（至少填写一项）："  is-link :border-intent="true" :arrow-direction="showPhone ? 'down' : 'null'"
			@click.native="showPhone = !showPhone">
			</cell>
			<!--Cell,31-->
			<div v-if="showPhone" class="phone">
				<!--XInput,1-->
				<x-input v-model="phone_Mobile" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,12-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,12-->
						手机号
					</div>
				</x-input>
				<!--XInput,1-->
				<!--XInput,2-->
				<x-input v-model="phone_Work" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,13-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,13-->
						办公电话
					</div>
				</x-input>
				<!--XInput,2-->
				<!--XInput,3-->
				<x-input v-model="phone_Family" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,14-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,14-->
						家庭电话
					</div>
				</x-input>
				<!--XInput,3-->			
  			</div>
			<!--Cell,41-->
			<cell title="直系亲属姓名：" :value="relativesName" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,41-->
			<!--Cell,42-->
			<cell title="直系亲属工作单位：" :value="relativesCompany" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,42-->
			<!--Cell,32-->
			<cell title="直系亲属联系方式（至少填写一项）：" is-link :border-intent="true" :arrow-direction="showRelativesPhone ? 'down' : 'null'"
			@click.native="showRelativesPhone = !showRelativesPhone">
			</cell>
			<!--Cell,32-->
			<div v-if="showRelativesPhone" class="phone">
				<!--XInput,6-->
				<x-input  v-model="relativesPhone_Mobile" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,15-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,15-->
						手机号
					</div>
				</x-input>
				<!--XInput,6-->
				<!--XInput,7-->
				<x-input v-model="relativesPhone_Work" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,16-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,16-->
						办公号码
					</div>
				</x-input>
				<!--XInput,7-->
				<!--XInput,8-->
				<x-input v-model="relativesPhone_Family" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,17-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,17-->
						家庭号码
					</div>
				</x-input>
				<!--XInput,8-->			
  			</div>
			<!--Cell,43-->
			<cell title="前往国家（地区）：" :value="exitAddress" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,43-->
			<!--文本域,1-->
			<x-textarea title="出境原因（请详细填写）：" :readonly="true" v-model="exitReason" :show-counter="true" :max="200" placeholder="">
			</x-textarea>
			<!--文本域,1-->
			<!--Cell,33-->
			<cell title="出境请假类型："  is-link  :border-intent="true" :arrow-direction="showLeaveType ? 'down' : 'null'"
				@click.native="showLeaveType = !showLeaveType">
			</cell>
			<!--Cell,33-->
			<template v-if="showLeaveType">
				<!--Checker,1-->
				<checker v-model="exitLeaveType" :radio-required="true" default-item-class="default-item-class"
					selected-item-class="default-item-class-selected" type="radio" class="exitLeaveType">
					<!--item,1-->
					<checker-item value="出差" @click.native="showLeaveType_other=false">
					出差
					</checker-item>
					<!--item,1-->
					<!--item,2-->
					<checker-item value="事假" @click.native="showLeaveType_other=false">
					事假
					</checker-item>
					<!--item,2-->
					<!--item,3-->
					<checker-item value="年休假" @click.native="showLeaveType_other=false">
					年休假
					</checker-item>
					<!--item,3-->
					<!--item,4-->
					<checker-item value="其他" @click.native="showLeaveType_other=true">
					其他
					</checker-item>
					<!--item,4-->
				</checker>
				<!--Checker,1-->
				<!--XInput,10-->
				<x-input v-if="showLeaveType_other" :readonly="true" v-model="exitLeaveType_other" type="text"
					title="其他：" placeholder=""
					style="">
				</x-input>
				<!--XInput,10-->
			</template>
			<!--Cell,44-->
			<cell title="预计出境日期：" :value="estExitDate" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,44-->
			<!--Cell,45-->
			<cell title="预计入境日期：" :value="estEntryDate" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,45-->
			<!--Cell,34-->
			<cell title="申请事项：" is-link :border-intent="true" :arrow-direction="showZyEvent ? 'down' : 'null'"
			@click.native="showZyEvent = !showZyEvent">
			</cell>
			<!--Cell,34-->
			<div v-if="showZyEvent" class="phone">			
				<!--Cell,35-->
				<cell title="借用证照类型：" is-link :arrow-direction="showZyEvent1 ? 'down' : 'null'" @click.native="showZyEvent1 = !showZyEvent1">
					<span slot="icon">
						<!--图标X,18-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,18-->
					</span>				
				</cell>
				<!--Cell,35-->
				<template v-if="showZyEvent1">
					<!--Checker,2-->
					<checker v-model="certTypeList" default-item-class="default-item-class"
						selected-item-class="default-item-class-selected" type="checkbox" class="exitLeaveType">
						<!--item,5-->
						<checker-item value="01">
						因私护照
						</checker-item>
						<!--item,5-->
						<!--item,6-->
						<checker-item value="02">
						港、澳通行证
						</checker-item>
						<!--item,6-->
						<!--item,7-->
						<checker-item value="03">
						赴台证
						</checker-item>
						<!--item,7-->
					</checker>
					<!--Checker,2-->
				</template>
				<!--Cell,36-->
				<cell title="申请内容：" is-link :border-intent="true" :arrow-direction="showZyEvent2 ? 'down' : 'null'"
					@click.native="showZyEvent2 = !showZyEvent2">
					<span slot="icon">
						<!--图标X,19-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,19-->
					</span>
				</cell>
				<!--Cell,36-->
				<template v-if="showZyEvent2">
					<!--Checker,3-->
					<checker v-model="certContentList" default-item-class="default-item-class"
						selected-item-class="default-item-class-selected" type="checkbox" class="certContentList">
						<!--item,8-->
						<checker-item value="办理出国签证">
						办理出国签证
						</checker-item>
						<!--item,8-->
						<!--item,9-->
						<checker-item value="办理港、澳签证">
						办理港、澳签证
						</checker-item>
						<!--item,9-->
						<br />
						<!--item,10-->
						<checker-item value="证照换发">
						证照换发
						</checker-item>
						<!--item,10-->
						<!--item,11-->
						<checker-item value="其他" @click.native="showZyEvent2_other=!showZyEvent2_other">
						其他
						</checker-item>
						<!--item,11-->
					</checker>
					<!--Checker,3-->
					<!--XInput,11-->
					<x-input v-if="showZyEvent2_other" v-model="certContent_other" type="text"
						title="其他：" placeholder=""
						style="">
					</x-input>
					<!--XInput,11-->
				</template>
			</div>
			<!--Cell,37-->
			<cell title="个人承诺：" is-link :border-intent="true" :arrow-direction="showPersonCommit ? 'down' : 'null'"
				@click.native="showPersonCommit = !showPersonCommit">
				<span slot="icon">
					<!--图标X,20-->
					<x-icon type="ios-information">
					</x-icon>
					<!--图标X,20-->
				</span>
			</cell>
			<!--Cell,37-->
			<template v-if="showPersonCommit">
				<!--Cell,38-->
				<cell title="配偶/子女·有无移居国外情况">
					<div slot="value">
						<!--Checker,4-->
						<checker v-model="familyIsExit" default-item-class="default-item-class" selected-item-class="default-item-class-selected" 
							:radio-required="true" type="radio">
							<!--item,12-->
							<checker-item value="0">
							无
							</checker-item>
							<!--item,12-->
							<!--item,13-->
							<checker-item value="1">
							有
							</checker-item>
							<!--item,13-->
						</checker>
						<!--Checker,4-->
					</div>
				</cell>
				<!--Cell,38-->
				<!--XInput,12-->
				<x-input v-if="familyIsExit=='1'?true:false" :readonly="true" v-model="familyExitAddress" type="text"
					title="请填写移居国家：" label-width="10em" placeholder="" text-align="right">
				</x-input>
				<!--XInput,12-->
				<!--Cell,39-->
				<cell title="入行以来有无违法乱纪行为">
					<div slot="value">
						<!--Checker,5-->
						<checker v-model="isIllegal" default-item-class="default-item-class" selected-item-class="default-item-class-selected" 
							:radio-required="true" type="radio">
							<!--item,14-->
							<checker-item value="0">
							无
							</checker-item>
							<!--item,14-->
							<!--item,15-->
							<checker-item value="1">
							有
							</checker-item>
							<!--item,15-->
						</checker>
						<!--Checker,5-->
					</div>
				</cell>
				<!--Cell,39-->
				<!--文本域,2-->
				<x-textarea v-if="isIllegal=='1'?true:false" :readonly="true" v-model="illegalContent" 
					title="请详细说明：" placeholder="" :show-counter="true" :max="200">
				</x-textarea>
				<!--文本域,2-->
				<!--Cell,46-->
				<cell title="证照归还日期：" :value="estBackDate" primary="title" value-align="right" :border-intent="true">
				</cell>
				<!--Cell,46-->
			</template>
			<!--通讯,1-->
			<div id="opinionList">
			</div>
			<!--通讯,1-->
			<!--div,16-->
			<div data-init="poin_initManage({'id':'opinionList','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{}},'getOpinionList')">
			</div>
			<!--div,16-->
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
		<!--Group,2-->
		<!--通讯,3-->
		<div id="submitApproval">
		</div>
		<!--通讯,3-->
		<!--div,12-->
			<div style="padding:10px">
			<!--按钮,5-->
			<x-button text="同意" :type="types[0]" action-type="button" @click.native="commitTask('0','1','同意')">
			</x-button>
			<!--按钮,5-->		
			<!--按钮,6-->
			<x-button text="不同意" :type="types[1]" action-type="button" @click.native="commitTask('1','0','不同意')">
			</x-button>
			<!--按钮,6-->		
		</div>
		<!--div,12-->	
		</div>
		<!--div,7-->
		<!--弹出框,2-->
		<x-dialog v-model="isShowApprovalDetail" class="dialog-demo" :hide-on-blur="false" :scroll="true">
			<!--通讯,2-->
			<div id="approvalDetail">
			</div>
			<!--通讯,2-->
			<!--div,17-->
			<div data-init="poin_initManage({'id':'approvalDetail','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId','businessId':'#businessId','businessType':'#businessType'}},'getApprovalDetail')">
			</div>
			<!--div,17-->
			<!--xTable,3-->
			<x-table event-render="loadTable" tdList="approvalTable" :cell-bordered="true"
				:content-bordered="true" full-bordered>
				<thead>
					<tr>
						<!--列head,5-->
						<th>
						审批人
						</th>
						<!--列head,5-->
						<!--列head,6-->
						<th>
						审批意见
						</th>
						<!--列head,6-->
						<!--列head,7-->
						<th>
						审批时间
						</th>
						<!--列head,7-->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in approvalTable">
						<!--列body,5-->
						<td>
						{{item.appUserName}}
						</td>
						<!--列body,5-->
						<!--列body,6-->
						<td>
						{{item.appView}}
						</td>
						<!--列body,6-->
						<!--列body,7-->
						<td>
						{{item.appDate}}
						</td>
						<!--列body,7-->
					</tr>
				</tbody>
			</x-table>
			<!--xTable,3-->	
			<p style="padding-top:10px;text-align:center;" @click="isShowApprovalDetail=false">
				<!--图标X,21-->
				<x-icon type="ios-close-outline" style="fill:#aaa;"></x-icon>
				<!--图标X,21-->
			</p>				
		</x-dialog>
		<!--弹出框,2-->
	</div>
</template>
<script type="text/javascript">
import * as poinMessage from '@/util/poin-common/messageManage.js'
import Format from '@/util/date/format.js'

import { Group,XTable,XButton,Checker,XDialog,XTextarea,Calendar,PopupPicker,XSwitch,CheckerItem,Actionsheet,Radio,XInput,TabItem,Tab,CellBox,XHeader,Cell,Datetime,Selector} from 'vux'
export default {
 data () {
  return {
    Format:Format,
  	tokenId:'',
  	businessId:'',
  	businessType:'',
  	id:'',
    pin:'',
    name:'',
    sex:'',
    birthDay:'',
    identityCard:'',
    marital:'',
    deptName:'',
    postName:'',
    showPhone:false,
    phone_Mobile:'',
    phone_Work:'',
    phone_Family:'',
    relativesName:'',
    relativesCompany:'',
    showRelativesPhone:false,
    relativesPhone_Mobile:'',
    relativesPhone_Work:'',
    relativesPhone_Family:'',
    exitAddress:'',
    exitReason:'',
    showLeaveType:false,
    showLeaveType_other:false,
    exitLeaveType:'',
    exitLeaveType_other:'',
    exitLeaveType_re:'',
    estExitDate:'',
    estEntryDate:'',
    showZyEvent:false,
    showZyEvent1:false,
    certTypeList:[],
    certType:'',
    showZyEvent2:false,
    showZyEvent2_other:false,
    certContentList:[],
    certContent_other:'',
    certContent:'',
    certContent_re:'',
    showPersonCommit:false,
    familyIsExit:'0',
    familyExitAddress:'',
    isIllegal:'0',
    illegalContent:'',
    estBackDate:'',
    promiseName:'',
    promiseDate:'',
    applyRemark:[],
    applyRemarkList:[],
    applyRemarkStr:'',
    approvalStatus:'',
    isShowApprovalDetail:false,
    types:['primary','default'],
    approvalTable:[],
    approvalDetail:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/listAllTaskViewsById"},
    opinionList:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"get","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/getAppOpinionList"},
    submitApproval:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/eeApproval"}
  }
 },
components: {
    Group,
    XTable,
    XButton,
    Checker,
    XDialog,
    XTextarea,
    Calendar,
    PopupPicker,
    XSwitch,
    CheckerItem,
    Actionsheet,
    Radio,
    XInput,
    TabItem,
    Tab,
    CellBox,
    XHeader,
    Cell,
    Datetime,
    Selector
},
mounted (){
this.tokenId = this.$store.state.user.userInfo
let applyDetail = this.$route.params
	this.businessId = applyDetail.bussId
	this.businessType = applyDetail.businessType
	this.id = applyDetail.id+''
	this.pin = applyDetail.pin
	this.name = applyDetail.name
	this.sex = applyDetail.sex
	this.birthDay = applyDetail.birthDay
	this.identityCard = applyDetail.identityCard
    this.marital = applyDetail.marital
    this.deptName = applyDetail.deptName
    this.postName = applyDetail.postName
    this.phone_Mobile = applyDetail.phone_Mobile
    this.phone_Work = applyDetail.phone_Work
    this.phone_Family = applyDetail.phone_Family
	this.relativesName = applyDetail.relativesName
	this.relativesCompany = applyDetail.relativesCompany
	this.relativesPhone_Mobile = applyDetail.relativesPhone_Mobile
	this.relativesPhone_Work = applyDetail.relativesPhone_Work
	this.relativesPhone_Family = applyDetail.relativesPhone_Family
	this.exitAddress = applyDetail.exitAddress
	this.exitReason = applyDetail.exitReason
	this.exitLeaveType = applyDetail.exitLeaveType
	this.estExitDate = applyDetail.estExitDate
	this.estEntryDate = applyDetail.estEntryDate
	this.certType = applyDetail.certType
	this.certContent = applyDetail.certContent
	this.familyIsExit = ''+applyDetail.familyIsExit
	this.familyExitAddress = applyDetail.familyExitAddress
    this.isIllegal = ''+applyDetail.isIllegal
	this.illegalContent = applyDetail.illegalContent
    this.estBackDate = applyDetail.estBackDate
    this.promiseName = applyDetail.promiseName
    this.promiseDate = applyDetail.promiseDate
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
	// 选择审批意见
	changeApplyRemark(val){
		this.applyRemarkStr = val[0]
	},
	commitTask(index,approvalStatus,msg){
		this.approvalStatus = approvalStatus
		this.types = ['default','default']
		this.types[index] = 'primary'
		let that = this
		this.$vux.confirm.show({
    		title: 'Title',
    		content: '是否'+msg,
    		onConfirm () {
    			that.poin_initManage({
    			'id':'submitApproval',
    			'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
    			'requestFields':{'approvalStatus':'#approvalStatus','tokenId':'#tokenId','appView':'#applyRemarkStr','taskIds':'#id'}
    			},'submitApproval1')
    		}
  		})
	}
}
}</script>
<style type="text/css" scoped>
.approval_detail .sticky {
	height:44px
}
.approval_detail >>> .weui-cells {
	margin-top:0px;
	font-size:1.2rem
}
.exitLeaveType {
	text-align:center;
	padding-bottom:5px
}
.certContentList {
	text-align:center;
	padding-bottom:5px
}
.phone svg {
	width:14px;
	height:14px
}
.img {
	height:40px;
	width:40px;
	border-radius:50%
}
.title {
	padding-left:1em
}
.dialog-demo .weui-dialog{
    border-radius: 8px;
  }
</style>