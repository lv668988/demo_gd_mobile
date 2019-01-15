<template>
	<div style="height:100%" class="approval">
		<!--header,1-->
		<x-header v-if="!isShowSearch" style="width:100%;position:absolute;left:0;top:0;z-index:999">
			审批
			<a slot="right" v-if="!isShowCheckBox" @click="search">
			搜索
			</a>
			<a slot="right" v-if="!isShowCheckBox" @click="moreApply">
			批量
			</a>
			<a slot="right" v-if="isShowCheckBox" @click="cancel">
			取消
			</a>
			<a slot="right" v-if="isShowCheckBox" @click="allChecked">
			全选
			</a>
		</x-header>
		<!--header,1-->
		<!--div,1-->
		<div style="padding-top:40px">
			<div :style="{'height':stickyHeight}">
			<sticky scroll-box="vux_view_box_body" ref="sticky" :offset="40" :check-sticky-support="false" :disabled="disabled">
				<!--页签Tab,1-->
				<tab ref="approvalStatus" v-if="isShowApprovalStatus" :animate="true">
					<!--tabSon,1-->
					<tab-item selected @on-item-click="onItemClick">
					待审批
					</tab-item>
					<!--tabSon,1-->
					<!--tabSon,2-->
					<tab-item @on-item-click="onItemClick">
					已审批
					</tab-item>
					<!--tabSon,2-->
				</tab>
				<!--页签Tab,1-->
				<!--Checker,1-->
				<checker v-model="taskType" default-item-class="default-item-class" selected-item-class="default-item-class-selected"
					:radio-required="true" type="radio" class="taskType"
					@on-change="changeTaskType">
					<!--item,4-->
					<checker-item value="00">
					全部
					</checker-item>
					<!--item,4-->
					<!--item,1-->
					<checker-item value="01">
					请假单
					</checker-item>
					<!--item,1-->
					<!--item,2-->
					<checker-item value="02">
					补刷卡
					</checker-item>
					<!--item,2-->
					<!--item,3-->
					<checker-item value="03">
					证照换发
					</checker-item>
					<!--item,3-->
				</checker>
				<!--Checker,1-->
				<!--P-radio,1-->
				<popup-radio v-if="isShowLeave" title="选择假类" :options="leaveOption">
				</popup-radio>
				<!--P-radio,1-->
			</sticky>
			</div>
			<!--通讯,1-->
			<div id="getApply">
			</div>
			<!--通讯,1-->
			<!--Group,2-->
			<group data-init="poin_initManage({'id':'getApply','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'approvalStatus':'#approvalStatus','taskType':'#taskType','tokenId':'#tokenId','seachStr':'#seachStr'}},'getApplyList')">
				<!--Cell,1-->
				<cell v-for="(item,index) in applyListData" :key="index" :is-link="isToDetail"
					@click.native="toApplyDetail(item,index)" :border-intent="false">
					<!--div,4-->
					<div slot="icon" class="img" v-if="item.businessType=='1'">
					{{item.printName}}
					</div>
					<!--div,4-->
					<!--div,6-->
					<div slot="icon" class="img" v-if="item.businessType=='2'">
					补
					</div>
					<!--div,6-->
					<!--div,8-->
					<div slot="icon" class="img" v-if="item.businessType=='0'">
					证
					</div>
					<!--div,8-->
					<!--div,3-->
					<div slot="title" class="label">
						<span>{{item.pin}}</span><br />
						<span>{{item.name}}</span>
					</div>
					<!--div,3-->
					<!--div,5-->
					<div slot="value" class="value" v-if="item.businessType=='1'">
						<span class="flag">{{item.deptName}}</span>
						<span style="color: #6d1989;border:1px solid #6d1989" v-if="item.crj">出入境</span><br />
						<span>{{item.postName}}</span><br />
						<span>{{Format(item.beginDateTime,'YYYY-MM-DD HH:mm')}}</span><br />
						<span>{{Format(item.endDateTime,'YYYY-MM-DD HH:mm')}}</span><br />
						<span>{{item.leaveTimeLong+'天'}}</span>
					</div>
					<!--div,5-->
					<!--div,7-->
					<div slot="value" class="value" v-if="item.businessType=='2'">
						<span>{{item.deptName}}</span><br />
						<span>{{item.postName}}</span><br />
						<span>{{Format(item.checkTime,'YYYY-MM-DD HH:mm')}}</span>
					</div>
					<!--div,7-->
					<!--div,9-->
					<div slot="value" class="value" v-if="item.businessType=='0'">
						<span>{{item.deptName}}</span><br />
						<span>{{item.postName}}</span><br />
						<span>证照类型：{{gszh(item.certType)}}</span><br />
						<span>申请内容：{{item.certContent}}</span><br />
						<span>预计出境：{{Format(item.estExitDate,'YYYY-MM-DD')}}</span><br />
						<span>预计入境：{{Format(item.estEntryDate,'YYYY-MM-DD')}}</span><br />
					</div>
					<!--div,9-->
					<!--CheckIcon,1-->
					<check-icon v-if="isShowCheckBox" :value.sync="checkList[index]" class="checkBox">
					</check-icon>
					<!--CheckIcon,1-->
				</cell>
				<!--Cell,1-->
			</group>
			<!--Group,2-->
		</div>
		<!--div,1-->
		<!--div,2-->
		<div v-if="isShowCheckBox && taskType!='00'" class="approvals">
			<!--按钮,1-->
			<x-button text="批量处理" type="primary" @click.native="approvals">
			</x-button>
			<!--按钮,1-->
		</div>
		<!--div,2-->
		<!--Popup,1-->
		<popup v-model="isShowSearch" :hide-on-blur="false" position="left" height="100%" style="width:100vw">
			<!--搜索框,1-->
			<search v-model="seachStr" cancel-text="搜索" :autoFixed="true" placeholder="工号/姓名" position="fixed" @on-cancel="search1" @on-submit="search2">
				<div slot="left">
					<!--图标X,1-->
					<x-icon type="ios-arrow-back" @click.native="backHome">
					</x-icon>
					<!--图标X,1-->
					&nbsp;
				</div>
			</search>
			<!--搜索框,1-->
		</popup>
		<!--Popup,1-->
</div>
</template>
<script type="text/javascript">
import * as poinMessage from '@/util/poin-common/messageManage.js'
import Format from '@/util/date/format.js'
import '@/util/scroll/mescroll.m.js';

import { Group,XButton,Checker,Tabbar,XDialog,PopupRadio,XTextarea,CheckerItem,CheckIcon,Panel,TabItem,Tab,Flexbox,CellBox,Search,Popup,Checklist,XHeader,Icon,Cell,TabbarItem,FlexboxItem,Sticky,Selector} from 'vux'
export default {
 data () {
  return {
    disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
  	Format:Format,
    stickyHeight:'92px',
    approvalStatus: '1',
    taskType:'00',
    tokenId:'',
    isShowLeave:false,
    leaveOption:[],
    leaveType:'01',
    applyListData:[],
    isShowCheckBox:false,
    isShowApprovalStatus:true,
    checkList:[],
  	isToDetail:true,
    scoList:[],
    mescroll:null,
    isShowSearch:false,
    seachStr:'',
    getApply:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/getTaskList"}
  }
 },
components: {
    Group,
    XButton,
    Checker,
    Tabbar,
    XDialog,
    PopupRadio,
    XTextarea,
    CheckerItem,
    CheckIcon,
    TabItem,
    Tab,
    Flexbox,
    CellBox,
    Search,
    Popup,
    Checklist,
    XHeader,
    Icon,
    Cell,
    TabbarItem,
    FlexboxItem,
    Sticky,
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
		     use:false,
		     page:{size:10},
		     callback:function (page){//上拉加载回调方法
		     console.log(page)
		       	//平台通讯方式查询数据
		       	$this.poin_initManage({'id':'getApply'},
		       			function after(response,responseData,messageObj){
		       			console.log(response,responseData)
		       			 //通讯后成功赋值给列表数据
		       			   	if(response.status){
		       			   		$this.scoList = $this.scoList.concat(responseData.listData)
		       			   		$this.mescroll.endSuccess(responseData.listData.length);
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
	gszh(val){
		var str;
		str = val.replace('01','因私护照')
		str = str.replace('02','港、澳通行证')
		str = str.replace('03','赴台证')
		return str
	},
	// 通讯——获取审批单据
	getApplyList(res,data,MessageObject,error){
		this.$vux.loading.show({
       		text: 'loading'
      	})
		if(res.status==200 && data.retCode==1){
			setTimeout(() => {
      	  		this.$vux.loading.hide() 
      	  		//this.$vux.toast.show({
 				//	text: data.retMsg
				//})      
      		}, 500)
			this.applyListData = data.listData
    		let num = this.applyListData.length
    		this.checkList = []
    		for(var i=0;i<num;i++){
    			this.checkList.push(false)
    		}
		}else {
			setTimeout(() => {
      	  		this.$vux.loading.hide() 
      	  		//this.$vux.toast.show({
 				//	type: 'warn',
 					text: data.retMsg
				//})      
      		}, 500)  	     
		}	
    },
    // 切换已审批 待审批
	onItemClick(index){	
      	this.approvalStatus = index==0?'1':'9'
      	this.seachStr = ''
      	this.poin_initManage({
      	'id':'getApply',
      	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      	'requestFields':{'approvalStatus':'#approvalStatus','taskType':'#taskType','tokenId':'#tokenId','seachStr':'#seachStr'}
      	},'getApplyList')
	},
	// 切换单据类型
	changeTaskType(val){
		this.seachStr = ''
		this.poin_initManage({
      	'id':'getApply',
      	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      	'requestFields':{'approvalStatus':'#approvalStatus','taskType':'#taskType','tokenId':'#tokenId','seachStr':'#seachStr'}
      	},'getApplyList')
	},
	// 搜索
    search(){
    	this.isShowSearch = true
    },
    // 批量审批
    moreApply(){	
    	this.approvalStatus = '1'
    	this.taskType = '01'
    	this.isShowCheckBox = true
    	this.isShowApprovalStatus = false
    },
    // 取消
    cancel(){
    	this.isShowCheckBox = false;
    	this.isShowApprovalStatus = true;
    	let arr = new Array()
    	this.checkList.forEach(ele => {
    		arr.push(false)
    	})
    	this.checkList = arr
    },
    // 全选
    allChecked(){
    	let arr = new Array()
    	if(this.checkList.includes(false)==true){
    		this.checkList.forEach(ele => {
    			arr.push(true)
    		})
    	}else{
    		this.checkList.forEach(ele => {
    			arr.push(false)
    		})
    	}
    	this.checkList = arr
    },
    // 查看单据详情
    toApplyDetail(params,index){
		if(!this.isShowCheckBox && this.approvalStatus=='9'){
			if(params.businessType=='1'){
				this.$router.push({
					name:'zk_leave_detail',
					params
				})
			}else if(params.businessType=='2'){
				this.$router.push({
					name:'zk_repair_detail',
					params
				})
			}else if(params.businessType=='0'){
				console.log(params)
				this.$router.push({
					name:'zk_crj_detail',
					params
				})
			}
		}else if(!this.isShowCheckBox && this.approvalStatus=='1'){
			if(params.businessType=='1'){
				this.$router.push({
					name:'zk_approval_leave',
					params
				})
			}else if(params.businessType=='2'){
				this.$router.push({
					name:'zk_approval_repair',
					params
				})
			}else if(params.businessType=='0'){
				this.$router.push({
					name:'zk_approval_crj',
					params
				})
			}
		} 		
    },
    // 批量审批
    approvals() {
    	var checkedArr = this.applyListData.filter((item,index) => {
    		if(this.checkList[index]){
    			return this.applyListData[index]
    		}
    	})
    	this.$router.push({
			name:'zk_approvals_detail',
			params:{
				checkedArr
			}
		})
    },
    // 搜索 返回
    backHome(){
    	this.seachStr = ''
    	this.isShowSearch = false
    },
    // 点击搜索
    search1(){
		this.isShowSearch = false
		this.poin_initManage({
      	'id':'getApply',
      	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      	'requestFields':{'approvalStatus':'#approvalStatus','taskType':'#taskType','tokenId':'#tokenId','seachStr':'#seachStr'}
      	},'getApplyList')
	},
	// 输入法搜索
	search2(){
		this.isShowSearch = false
		this.poin_initManage({
      	'id':'getApply',
      	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      	'requestFields':{'approvalStatus':'#approvalStatus','taskType':'#taskType','tokenId':'#tokenId','seachStr':'#seachStr'}
      	},'getApplyList')
	},
},
watch: {
	taskType(a,b){
		//this.isShowLeave = this.taskType != '01'? false:true
	},
	isShowCheckBox(val){
		this.isToDetail = val?false:true
		this.stickyHeight = val?'48px':'92px'
	}
}
}</script>
<style type="text/css" scoped>
.approval >>> .default-item-class {
	border-radius:30px;
}
.approval .taskType {
	text-align:center;
	padding:8px 0;
	background-color:#fff
}
.approval >>> .weui-cells {
	margin-top:0;
}
.approval >>> .weui-cell__ft {
	width:51%;
}
.img{
	height:4rem;
	width:4rem;
	line-height:4rem;
	text-align:center;
	border:1px solid #6d1989;
	border-radius:50%;
	font-size:1.5rem;
	color:#6d1989
}
.label{
	font-size:1.2rem;
	padding-left:0.8rem
}
.value{
	font-size:1.2rem;
	text-align:left
}
.flag{
	display: inline-block;
    min-width: 6rem
}
.checkBox {
	position:absolute;
	right:15px;
	top:10px
}
.approvals {
	position:absolute;
	bottom:0;
	left:0;
	width:100%;
	text-align:center;
	background:#6d1989;
	//font-size:18px;
	color:#fff
}
 /*mescroll滚动的区域,根据需求自行修改 */
  @import '../../styles/mescroll.min.css';
  .mescroll{
        top: 80px;
        bottom: 0;
        height: auto; 
  }</style>