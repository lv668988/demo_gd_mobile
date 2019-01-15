<template>
	<div style="height:100%" class="apply_repair">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		补刷卡
		</x-header>
		<!--header,1-->
		<!--通讯,8-->
		<div id="userData">
		</div>
		<!--通讯,8-->
		<!--div,23-->
		<div data-init="poin_initManage({'id':'userData','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId'}},'getUserData')">
		</div>
		<!--div,23-->
		<!--通讯,9-->
		<div id="repairTime">
		</div>
		<!--通讯,9-->
		<!--通讯,10-->
		<div id="legalCheck">
		</div>
		<!--通讯,10-->
		<!--通讯,11-->
		<div id="approvalPeople">
		</div>
		<!--通讯,11-->
		<!--通讯,12-->
		<div id="submitRepair">
		</div>
		<!--通讯,12-->
		<!--通讯,13-->
		<div id="ownApply">
		</div>
		<!--通讯,13-->
		<!--div,1-->
		<div style="padding-top:40px">
			<div class="sticky">
			<sticky scroll-box="vux_view_box_body" ref="sticky" :offset="40" :check-sticky-support="false" :disabled="disabled">
				<!--页签Tab,1-->
				<tab ref="repairStatus" :animate="true">
					<!--tabSon,1-->
					<tab-item @on-item-click="onItemClick">
					申请
					</tab-item>
					<!--tabSon,1-->
					<!--tabSon,2-->
					<tab-item @on-item-click="onItemClick" selected>
					已申请
					</tab-item>
					<!--tabSon,2-->
				</tab>
				<!--页签Tab,1-->
			</sticky>
			</div>
			<!--div,24-->
			<div v-if="showApplyCont">
				<!--Group,1-->
				<group>
					<!--Cell,6-->
					<cell title="" value="" primary="title" value-align="left" :border-intent="true">
						<!--div,25-->
						<div slot="icon">
							<img class="img" src="../../../static/img/tx.png"/>
						</div>
						<!--div,25-->
						<!--div,26-->
						<div slot="title" class="title">
							<span>{{pin}}</span><br />
							<span>{{name}}</span><br />
							<span>{{postName}}</span>
						</div>
						<!--div,26-->
					</cell>
					<!--Cell,6-->
					<!--日历,1-->
					<calendar title="申请日期：" v-model="checkDay" :show-last-month="true" :show-next-month="true"
						:highlight-weekend="false" :return-six-rows="true" :hide-header="false"
						:hide-week-list="false" :render-on-value-change="true" :disable-past="false"
						:disable-future="false" @on-change="changeCheckDay">
					</calendar>
					<!--日历,1-->
					<!--日期,1-->
					<datetime title="推荐时间：" v-for="(item,index) in checkTimeList" :key="index" v-model="checkTimeList[index]"
						 format="YYYY-MM-DD HH:mm" @on-change="changeCheckTime">
					</datetime>
					<!--日期,1-->
					<!--div,27-->
					<div data-init="poin_initManage({'id':'approvalPeople','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId','leaveIdOrLeaveTypeId':'#repairStr'}},'getApprovalPeople')">
					</div>
					<!--div,27-->
					<!--Cell,7-->
					<cell title="审批人：" :value="approverNameStr" @click.native="showApprover=true" is-link primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,7-->
					<popup v-model="showApprover" position="bottom" max-height="50%">
        				<group>
							<!--CheckList,1-->
							<checklist title='选择审批人' event-render="loadChecklist" v-model="approver" :options="approverList"
								:check-disabled="true" label-position="right" @on-change="changeApprover">
							</checklist>
							<!--CheckList,1-->
						</group>
					</popup>
					<!--Cell,8-->
					<cell title="申请理由：" is-link primary="title" value-align="left" :border-intent="true">
						<!--div,28-->
						<div slot="value" style="text-align:right">
							<!--文本域,1-->
							<x-textarea show-clear v-model="applyReasons" :show-counter="false">
							</x-textarea>
							<!--文本域,1-->
						</div>
						<!--div,28-->
					</cell>
					<!--Cell,8-->	
				</group>
				<!--Group,1-->
				<!--div,29-->
				<div style="padding:10px">
					<!--按钮,1-->
					<x-button text="提交" type="primary" @click.native="submitForm">
					</x-button>
					<!--按钮,1-->
				</div>
				<!--div,29-->
			</div>
			<!--div,24-->
			<!--div,11-->
			<div v-if="!showApplyCont" class="applyCont">
				<!--Mescroll,1-->
				<div id="mescroll" class="mescroll">
					<ul soList="ownApplyList">
						<!--Cell,9-->
						<cell v-for="(item,index) in ownApplyList" :key="index"  is-link @click.native="toApplyDetail(item,index)" :border-intent="false">
							<!--div,30-->
							<div slot="icon" class="img1">
							补
							</div>
							<!--div,30-->
							<!--div,31-->
							<div slot="title" class="label1">
								<span>{{item.pin}}</span><br />
								<span>{{item.name}}</span>
							</div>
							<!--div,31-->
							<!--div,32-->
							<div slot="value" class="value1">
								<span>{{item.deptName}}</span><br />
								<span>{{item.postName}}</span><br />
								<span>{{Format(item.checkTime,'YYYY-MM-DD HH:mm')}}</span>
							</div>
							<!--div,32-->
						</cell>
						<!--Cell,9-->
					</ul>
				</div>
				<!--Mescroll,1-->
			</div>
			<!--div,11-->
		</div>
		<!--div,1-->
	</div>
</template>
<script type="text/javascript">
import * as poinMessage from '@/util/poin-common/messageManage.js'
import Format from '@/util/date/format.js'
import '@/util/scroll/mescroll.m.js';

import { XButton,Group,XTextarea,Calendar,CheckIcon,XInput,TabItem,Tab,Flexbox,CellBox,Popup,Checklist,XHeader,Cell,FlexboxItem,Sticky,Datetime,Selector} from 'vux'

import { EXIF} from '@/util/EXIF/index.js'
export default {
 data () {
  return {
    disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
    Format:Format,
    repairStr:'0',
    tokenId:'',
    showApplyCont:false,
    pin:'',
	name:'',
	postName:'',
    checkDay:'',
    checkTimeList:[],
    checkTimes:'',
    approver:[],
    approverList:[],
    approverPinStr:'',
    approverNameStr:'',
    showApprover:false,
    applyReasons:'',
    ownApplyList:[],
    offset:'1',
    limit:'10',
    mescroll:null,
    legalCheck:{"fileName":"RepairApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/repair/legalCheck"},
    userData:{"fileName":"UserInfoController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/user/getUserInfo"},
    submitRepair:{"fileName":"RepairApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/repair/saveRepairApply"},
    approvalPeople:{"fileName":"RepairApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/repair/findApproverByPage"},
    ownApply:{"fileName":"RepairApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/repair/getSelfRepairApplyList"},
    repairTime:{"fileName":"RepairApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/repair/getRepairTimeByDate"}
  }
 },
components: {
    XButton,
    Group,
    XTextarea,
    Calendar,
    CheckIcon,
    XInput,
    TabItem,
    Tab,
    Flexbox,
    CellBox,
    Popup,
    Checklist,
    XHeader,
    Cell,
    FlexboxItem,
    Sticky,
    Datetime,
    Selector
},
mounted (){
this.tokenId = this.$store.state.user.userInfo
	let $this = this;
	this.$el.querySelectorAll('*[data-init]').forEach(function(el,index){
	var init =el.getAttribute('data-init');
	var message = poinMessage.initMessageKey(init);
	$this.poin_initManage(message[0],message[1],message[2]);
});
	this.mescroll = new MeScroll('mescroll', {
		//参数见文档说明，自行添加和修改
		up: {//上拉加载
		     use:true,
		     page:{size:10},
		     callback:function (page){//上拉加载回调方法
		     	console.log(page)
		       	//平台通讯方式查询数据
		       	$this.poin_initManage({'id':'ownApply'},
		       			function after(response,responseData,messageObj){
		       			 //通讯后成功赋值给列表数据
		       			   	if(response.status){
		       			   		$this.ownApplyList = $this.ownApplyList.concat(responseData.listData)
		       			   		$this.mescroll.endSuccess(responseData.listData.length);
		       			   		}
		       			   	},
		       			 function before(messageObj){
		       			   	//通讯前传参
		       			   	messageObj.setData({
		       			   		'offset':page.num-1+'',
		       			   		'limit':page.size+'',
		       			   		'tokenId':$this.tokenId
		       			   	});
		       		 })
		     },
	         empty:{tip:'亲,暂无相关数据哦~' },
		     htmlNodata:'<p class="upwarp-nodata">-- 已经没有数据啦 --</p>',
		     htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
		},
		down:{//下拉刷新
		     use:false,
           // callback:function(){} //下拉刷新回调方法
	     }});
},
methods : {
poin_initManage(messageKey,callback,execBefore){
	messageKey.vue = this;
	poinMessage.messageManage(messageKey,callback,execBefore);
},
// 通讯——获取登录人信息
getUserData(res,data,MessageObject,error){
	if(res.status==200&&data.retCode==1){
		this.pin = data.retData.pin
		this.name = data.retData.name
		this.postName = data.retData.postName
	}
},
// 通讯——获取补刷卡推荐时间（前端校验）
getRepairTime(res,data,MessageObject){
	if(res.status==200&&data.retCode==1){
		let arr = new Array()
		let list = data.listData
		list.forEach(ele => {
			arr.push(ele.reTime)
		})
		this.checkTimeList = arr
		this.checkTimes = this.checkTimeList.join(",")
		this.checkTimes == '' ? this.$vux.toast.show({
 			type: 'warn',
 			text: '该日出勤无异常',
 			width: '10em'
		}) : this.poin_initManage({
			'id':'legalCheck',
			'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
			'requestFields':{'tokenId':'#tokenId','checkTimes':'#checkTimes','checkDay':'#checkDay'}
		},'applyCheck')
	}
},
changeApprover(value,label){
	this.approverPinStr = value.join(',')
	this.approverNameStr = label.join(',')
},
// 通讯——后台校验单据合理性
applyCheck(res,data,MessageObject,error){
	if(res.status==200&&data.retCode==1){
		let s = data.retData.split(',')
		let sCode = s[0]
		let sStr = s[1]
		this.$vux.toast.show({
 			type: sCode=='1'?null:'warn',
 			text: sStr,
 			width: '10em'
		}) 
	}
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
// 通讯——提交补刷卡
submitRepair1(res,data,MessageObject,error){
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
// 通讯——获取已提交的补刷卡申请
getOwnApplyList(res,data,MessageObject,error){
	if(res.status==200&&data.retCode==1){
		this.ownApplyList = data.listData
	}
},
// 切换 申请/已申请补刷卡
onItemClick(index){
	this.showApplyCont = index==1?false:true
	/*if(index==1){
		this.showApplyCont = false
		this.offset = '0'
		this.$vux.loading.show({
   			text: 'loading'
  		})
  		this.poin_initManage({
      	'id':'ownApply',
      	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      	'requestFields':{'tokenId':'#tokenId','offset':'#offset','limit':'#limit'}
      	},'getOwnApplyList')
  		setTimeout(() => {
  		  this.$vux.loading.hide()       
  		}, 500)
	}*/
},
// 修改补刷卡日期
changeCheckDay(val){
	this.poin_initManage({
	'id':'repairTime',
	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
	'requestFields':{'tokenId':'#tokenId','reDate':'#checkDay'}
	},'getRepairTime')
},
// 修改补刷卡时间
changeCheckTime(val){
	this.checkTimes = this.checkTimeList.join(',')
	this.poin_initManage({
	'id':'legalCheck',
	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
	'requestFields':{'tokenId':'#tokenId','checkTimes':'#checkTimes','checkDay':'#checkDay'}
	},'applyCheck')
},
// 提交补刷卡申请
submitForm(){
	let that = this
	this.$vux.confirm.show({
    	title: 'Title',
    	content: '确认提交',
    	onConfirm () {
      		that.poin_initManage({
      		'id':'submitRepair',
      		'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      		'requestFields':{'approver':'#approverPinStr','applyReasons':'#applyReasons','tokenId':'#tokenId','checkTimes':'#checkTimes','checkDay':'#checkDay'}
      		},'submitRepair1')
    	}
  	})
},
// 查看已提交补刷卡明细
toApplyDetail(params,index){
	this.$router.push({
		name:'zk_repair_detail',
		params
	})
}
},
}</script>
<style type="text/css" scoped>
.apply_repair .sticky {
	height:44px
}
.apply_repair >>> .weui-cells {
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
.applyCont >>> .weui-cell__ft {
	width:51%
}
.img1{
	height:4rem;
	width:4rem;
	line-height:4rem;
	text-align:center;
	border:1px solid #6d1989;
	border-radius:50%;
	font-size:1.5rem;
	color:#6d1989
}
.label1{
	font-size:1.2rem;
	padding-left:0.8rem
}
.value1{
	font-size:1.2rem;
	text-align:left
}
 /*mescroll滚动的区域,根据需求自行修改 */
  @import '../../styles/mescroll.min.css';
  .mescroll{
        top: 80px;
        bottom: 0;
        height: auto; 
  }</style>