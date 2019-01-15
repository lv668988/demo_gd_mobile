<template>
	<div style="height:100%" class="apply_detail">
		<!--header,2-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		{{name+'的出入境'}}
		</x-header>
		<!--header,2-->
		<!--div,1-->
		<div style="padding-top:40px">
			<!--Group,2-->
			<group>
			<!--Cell,44-->
			<cell primary="title" value-align="left" :border-intent="false">
				<!--div,5-->
				<div slot="icon">
					<img class="img" src="../../../static/img/tx.png"/>
				</div>
				<!--div,5-->
				<!--div,6-->
				<div slot="title" class="title">
					<span>{{pin}}</span><br />
					<span>{{name}}</span><br />
					<span>{{postName}}</span>
				</div>
				<!--div,6-->
			</cell>
			<!--Cell,44-->
			<!--Cell,22-->
			<cell title="姓名：" :value="name" primary="title" value-align="right" :border-intent="false">
			</cell>
			<!--Cell,22-->
			<!--Cell,23-->
			<cell title="性别：" :value="sex" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,23-->
			<!--Cell,24-->
			<cell title="出生日期：" :value="birthDay" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,24-->
			<!--Cell,25-->
			<cell title="身份证号码：" :value="identityCard" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,25-->
			<!--Cell,26-->
			<cell title="工作单位：" :value="deptName" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,26-->
			<!--Cell,27-->
			<cell title="现任职务：" :value="postName" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,27-->
			<!--Cell,28-->
			<cell title="婚姻状况：" :value="marital" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,28-->
			<!--Cell,29-->
			<cell title="联系方式（至少填写一项）："  is-link :border-intent="true" :arrow-direction="showPhone ? 'down' : 'null'"
			@click.native="showPhone = !showPhone">
			</cell>
			<!--Cell,29-->
			<div v-if="showPhone" class="phone">
				<!--XInput,32-->
				<x-input v-model="phone_Mobile" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,20-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,20-->
						手机号
					</div>
				</x-input>
				<!--XInput,32-->
				<!--XInput,33-->
				<x-input v-model="phone_Work" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,21-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,21-->
						办公电话
					</div>
				</x-input>
				<!--XInput,33-->
				<!--XInput,34-->
				<x-input v-model="phone_Family" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,22-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,22-->
						家庭电话
					</div>
				</x-input>
				<!--XInput,34-->			
  			</div>
			<!--Cell,30-->
			<cell title="直系亲属姓名：" :value="relativesName" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,30-->
			<!--Cell,31-->
			<cell title="直系亲属工作单位：" :value="relativesCompany" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,31-->
			<!--Cell,32-->
			<cell title="直系亲属联系方式（至少填写一项）：" is-link :border-intent="true" :arrow-direction="showRelativesPhone ? 'down' : 'null'"
			@click.native="showRelativesPhone = !showRelativesPhone">
			</cell>
			<!--Cell,32-->
			<div v-if="showRelativesPhone" class="phone">
				<!--XInput,35-->
				<x-input  v-model="relativesPhone_Mobile" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,23-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,23-->
						手机号
					</div>
				</x-input>
				<!--XInput,35-->
				<!--XInput,36-->
				<x-input v-model="relativesPhone_Work" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,24-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,24-->
						办公号码
					</div>
				</x-input>
				<!--XInput,36-->
				<!--XInput,37-->
				<x-input v-model="relativesPhone_Family" :readonly="true" type="text" text-align="right" placeholder="">
					<div slot="label">				
						<!--图标X,25-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,25-->
						家庭号码
					</div>
				</x-input>
				<!--XInput,37-->			
  			</div>
			<!--Cell,33-->
			<cell title="前往国家（地区）：" :value="exitAddress" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,33-->
			<!--文本域,5-->
			<x-textarea title="出境原因（请详细填写）：" :readonly="true" v-model="exitReason" :show-counter="true" :max="200" placeholder="">
			</x-textarea>
			<!--文本域,5-->
			<!--Cell,34-->
			<cell title="出境请假类型："  is-link  :border-intent="true" :arrow-direction="showLeaveType ? 'down' : 'null'"
				@click.native="showLeaveType = !showLeaveType">
			</cell>
			<!--Cell,34-->
			<template v-if="showLeaveType">
				<!--Checker,11-->
				<checker v-model="exitLeaveType" :radio-required="true" default-item-class="default-item-class"
					selected-item-class="default-item-class-selected" type="radio" class="exitLeaveType">
					<!--item,31-->
					<checker-item value="出差" @click.native="showLeaveType_other=false">
					出差
					</checker-item>
					<!--item,31-->
					<!--item,32-->
					<checker-item value="事假" @click.native="showLeaveType_other=false">
					事假
					</checker-item>
					<!--item,32-->
					<!--item,33-->
					<checker-item value="年休假" @click.native="showLeaveType_other=false">
					年休假
					</checker-item>
					<!--item,33-->
					<!--item,34-->
					<checker-item value="其他" @click.native="showLeaveType_other=true">
					其他
					</checker-item>
					<!--item,34-->
				</checker>
				<!--Checker,11-->
				<!--XInput,38-->
				<x-input v-if="showLeaveType_other" :readonly="true" v-model="exitLeaveType_other" type="text"
					title="其他：" placeholder=""
					style="">
				</x-input>
				<!--XInput,38-->
			</template>
			<!--Cell,35-->
			<cell title="预计出境日期：" :value="estExitDate" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,35-->
			<!--Cell,36-->
			<cell title="预计入境日期：" :value="estEntryDate" primary="title" value-align="right" :border-intent="true">
			</cell>
			<!--Cell,36-->
			<!--Cell,37-->
			<cell title="申请事项：" is-link :border-intent="true" :arrow-direction="showZyEvent ? 'down' : 'null'"
			@click.native="showZyEvent = !showZyEvent">
			</cell>
			<!--Cell,37-->
			<div v-if="showZyEvent" class="phone">			
				<!--Cell,38-->
				<cell title="借用证照类型：" is-link :arrow-direction="showZyEvent1 ? 'down' : 'null'" @click.native="showZyEvent1 = !showZyEvent1">
					<span slot="icon">
						<!--图标X,26-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,26-->
					</span>				
				</cell>
				<!--Cell,38-->
				<template v-if="showZyEvent1">
					<!--Checker,12-->
					<checker v-model="certTypeList" default-item-class="default-item-class"
						selected-item-class="default-item-class-selected" type="checkbox" class="exitLeaveType">
						<!--item,35-->
						<checker-item value="01">
						因私护照
						</checker-item>
						<!--item,35-->
						<!--item,36-->
						<checker-item value="02">
						港、澳通行证
						</checker-item>
						<!--item,36-->
						<!--item,37-->
						<checker-item value="03">
						赴台证
						</checker-item>
						<!--item,37-->
					</checker>
					<!--Checker,12-->
				</template>
				<!--Cell,39-->
				<cell title="申请内容：" is-link :border-intent="true" :arrow-direction="showZyEvent2 ? 'down' : 'null'"
					@click.native="showZyEvent2 = !showZyEvent2">
					<span slot="icon">
						<!--图标X,27-->
						<x-icon type="ios-arrow-right">
						</x-icon>
						<!--图标X,27-->
					</span>
				</cell>
				<!--Cell,39-->
				<template v-if="showZyEvent2">
					<!--Checker,13-->
					<checker v-model="certContentList" default-item-class="default-item-class"
						selected-item-class="default-item-class-selected" type="checkbox" class="certContentList">
						<!--item,38-->
						<checker-item value="办理出国签证">
						办理出国签证
						</checker-item>
						<!--item,38-->
						<!--item,39-->
						<checker-item value="办理港、澳签证">
						办理港、澳签证
						</checker-item>
						<!--item,39-->
						<br />
						<!--item,40-->
						<checker-item value="证照换发">
						证照换发
						</checker-item>
						<!--item,40-->
						<!--item,41-->
						<checker-item value="其他" @click.native="showZyEvent2_other=!showZyEvent2_other">
						其他
						</checker-item>
						<!--item,41-->
					</checker>
					<!--Checker,13-->
					<!--XInput,39-->
					<x-input v-if="showZyEvent2_other" v-model="certContent_other" type="text"
						title="其他：" placeholder=""
						style="">
					</x-input>
					<!--XInput,39-->
				</template>
			</div>
			<!--Cell,40-->
			<cell title="个人承诺：" is-link :border-intent="true" :arrow-direction="showPersonCommit ? 'down' : 'null'"
				@click.native="showPersonCommit = !showPersonCommit">
				<span slot="icon">
					<!--图标X,28-->
					<x-icon type="ios-information">
					</x-icon>
					<!--图标X,28-->
				</span>
			</cell>
			<!--Cell,40-->
			<template v-if="showPersonCommit">
				<!--Cell,41-->
				<cell title="配偶/子女·有无移居国外情况">
					<div slot="value">
						<!--Checker,14-->
						<checker v-model="familyIsExit" default-item-class="default-item-class" selected-item-class="default-item-class-selected" 
							:radio-required="true" type="radio">
							<!--item,42-->
							<checker-item value="0">
							无
							</checker-item>
							<!--item,42-->
							<!--item,43-->
							<checker-item value="1">
							有
							</checker-item>
							<!--item,43-->
						</checker>
						<!--Checker,14-->
					</div>
				</cell>
				<!--Cell,41-->
				<!--XInput,40-->
				<x-input v-if="familyIsExit=='1'?true:false" :readonly="true" v-model="familyExitAddress" type="text"
					title="请填写移居国家：" label-width="10em" placeholder="" text-align="right">
				</x-input>
				<!--XInput,40-->
				<!--Cell,42-->
				<cell title="入行以来有无违法乱纪行为">
					<div slot="value">
						<!--Checker,15-->
						<checker v-model="isIllegal" default-item-class="default-item-class" selected-item-class="default-item-class-selected" 
							:radio-required="true" type="radio">
							<!--item,44-->
							<checker-item value="0">
							无
							</checker-item>
							<!--item,44-->
							<!--item,45-->
							<checker-item value="1">
							有
							</checker-item>
							<!--item,45-->
						</checker>
						<!--Checker,15-->
					</div>
				</cell>
				<!--Cell,42-->
				<!--文本域,6-->
				<x-textarea v-if="isIllegal=='1'?true:false" :readonly="true" v-model="illegalContent" 
					title="请详细说明：" placeholder="" :show-counter="true" :max="200">
				</x-textarea>
				<!--文本域,6-->
				<!--Cell,43-->
				<cell title="证照归还日期：" :value="estBackDate" primary="title" value-align="right" :border-intent="true">
				</cell>
				<!--Cell,43-->
			</template>
			<!--Cell,45-->
			<cell title="当前审批人：" :value="appUserName" primary="title" value-align="left" :border-intent="false">
			</cell>
			<!--Cell,45-->
		</group>
		<!--Group,2-->
		<!--通讯,1-->
		<div id="approvalDetail">
		</div>
		<!--通讯,1-->
		<!--div,7-->
		<div data-init="poin_initManage({'id':'approvalDetail','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId','bussId':'#businessId'}},'getApprovalDetail')">
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
					{{item.appDatetime}}
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

import { XTable,XButton,Group,Checker,XDialog,XTextarea,Calendar,PopupPicker,XSwitch,CheckerItem,Actionsheet,Radio,XInput,TabItem,Tab,CellBox,XHeader,Cell,Datetime,Selector} from 'vux'
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
    appUserName:'',
    approvalTable:[],
    approvalDetail:{"fileName":"ZKEEAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/zkeeapply/getEEApprovalList"}
  }
 },
components: {
    XTable,
    XButton,
    Group,
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
	getApprovalDetail(res,data,MessageObject,error){
		if(res.status==200&&data.retCode==1){
			this.approvalTable = data.listData
			let arr = new Array()
			data.listData.forEach(ele => {
				if(ele.approvalStatus == '2'){
					arr.push(ele.appUserName)
				}
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
</style>