<template>
	<div style="height:100%" class="apply_crj">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		{{headerTitle}}
		</x-header>
		<!--header,1-->
		<!--通讯,5-->
		<div id="userData">
		</div>
		<!--通讯,5-->
		<!--div,16-->
		<div data-init="poin_initManage({'id':'userData','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId'}},'getUserData')">
		</div>
		<!--div,16-->
		<!--通讯,6-->
		<div id="submitCrj">
		</div>
		<!--通讯,6-->
		<!--通讯,4-->
		<div id="ownApply">
		</div>
		<!--通讯,4-->
		<!--div,2-->
		<div style="padding-top:40px">
			<div class="sticky">
			<sticky scroll-box="vux_view_box_body" ref="sticky" :offset="40" :check-sticky-support="false" :disabled="disabled">
				<!--页签Tab,1-->
				<tab v-if="showCrjStatus" ref="crjStatus" :animate="true">
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
			<!--div,17-->
			<div v-if="showApplyCont">
				<!--Group,1-->
				<group>
					<!--Cell,12-->
					<cell title="姓名：" :value="name" primary="title" value-align="right" :border-intent="true">
					</cell>
					<!--Cell,12-->
					<!--Cell,13-->
					<cell title="性别：" :value="sex" primary="title" value-align="right" :border-intent="true">
					</cell>
					<!--Cell,13-->
					<!--Cell,14-->
					<cell title="出生日期：" :value="birthDay" primary="title" value-align="right" :border-intent="true">
					</cell>
					<!--Cell,14-->
					<!--Cell,15-->
					<cell title="身份证号码：" :value="identityCard" primary="title" value-align="right" :border-intent="true">
					</cell>
					<!--Cell,15-->
					<!--Cell,16-->
					<cell title="工作单位：" :value="deptName" primary="title" value-align="right" :border-intent="true">
					</cell>
					<!--Cell,16-->
					<!--Cell,17-->
					<cell title="现任职务：" :value="postName" primary="title" value-align="right" :border-intent="true">
					</cell>
					<!--Cell,17-->
					<!--P-Picker,1-->
					<popup-picker title="婚姻状况：" v-model="maritalStatus" :data="maritalStatusList" @on-change="changeMaritalStatus">
					</popup-picker>
					<!--P-Picker,1-->
					<!--Cell,18-->
					<cell title="联系方式（至少填写一项）："  is-link :border-intent="true" :arrow-direction="showPhone ? 'down' : 'null'"
					@click.native="showPhone = !showPhone">
					</cell>
					<!--Cell,18-->
					<div v-if="showPhone" class="phone">
						<!--XInput,1-->
						<x-input v-model="phone_Mobile" type="text" text-align="right" placeholder="请填写">
							<div slot="label">				
								<!--图标X,1-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,1-->
								手机号
							</div>
						</x-input>
						<!--XInput,1-->
						<!--XInput,2-->
						<x-input v-model="phone_Work" type="text" text-align="right" placeholder="请填写">
							<div slot="label">				
								<!--图标X,2-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,2-->
								办公电话
							</div>
						</x-input>
						<!--XInput,2-->
						<!--XInput,3-->
						<x-input v-model="phone_Family" type="text" text-align="right" placeholder="请填写">
							<div slot="label">				
								<!--图标X,3-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,3-->
								家庭电话
							</div>
						</x-input>
						<!--XInput,3-->			
  					</div>
  					<!--XInput,4-->
					<x-input title="直系亲属姓名：" v-model="relativesName" type="text" text-align="right" placeholder="请填写">
					</x-input>
					<!--XInput,4-->	
					<!--XInput,5-->
					<x-input title="直系亲属工作单位：" v-model="relativesCompany" type="text" label-width="10em" text-align="right" placeholder="请填写">
					</x-input>
					<!--XInput,5-->
					<!--Cell,19-->
					<cell title="直系亲属联系方式（至少填写一项）：" is-link :border-intent="true" :arrow-direction="showRelativesPhone ? 'down' : 'null'"
					@click.native="showRelativesPhone = !showRelativesPhone">
					</cell>
					<!--Cell,19-->
					<div v-if="showRelativesPhone" class="phone">
						<!--XInput,6-->
						<x-input  v-model="relativesPhone_Mobile" type="text" text-align="right" placeholder="请填写">
							<div slot="label">				
								<!--图标X,4-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,4-->
								手机号
							</div>
						</x-input>
						<!--XInput,6-->
						<!--XInput,7-->
						<x-input v-model="relativesPhone_Work" type="text" text-align="right" placeholder="请填写">
							<div slot="label">				
								<!--图标X,5-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,5-->
								办公号码
							</div>
						</x-input>
						<!--XInput,7-->
						<!--XInput,8-->
						<x-input v-model="relativesPhone_Family" type="text" text-align="right" placeholder="请填写">
							<div slot="label">				
								<!--图标X,6-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,6-->
								家庭号码
							</div>
						</x-input>
						<!--XInput,8-->			
  					</div>
  					<!--XInput,9-->
					<x-input title="前往国家（地区）：" v-model="exitAddress" label-width="10em" type="text" text-align="right" placeholder="请填写">
					</x-input>
					<!--XInput,9-->
					<!--文本域,1-->
					<x-textarea title="出境原因（请详细填写）：" v-model="exitReason" :show-counter="true" :max="200" placeholder="">
					</x-textarea>
					<!--文本域,1-->
					<!--Cell,20-->
					<cell title="出境请假类型："  is-link  :border-intent="true" :arrow-direction="showLeaveType ? 'down' : 'null'"
						@click.native="showLeaveType = !showLeaveType">
					</cell>
					<!--Cell,20-->
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
						<x-input v-if="showLeaveType_other" v-model="exitLeaveType_other" type="text"
							title="其他：" placeholder="请填写其他请假类型"
							style="">
						</x-input>
						<!--XInput,10-->
					</template>
					<!--日历,1-->
					<calendar title="预计出境日期：" v-model="estExitDate" :show-last-month="true"
						:show-next-month="true" :highlight-weekend="false" :return-six-rows="true"
						:hide-header="false" :hide-week-list="false" :render-on-value-change="true"
						:disable-past="false" :disable-future="false">
					</calendar>
					<!--日历,1-->
					<!--日历,2-->
					<calendar title="预计入境日期：" v-model="estEntryDate" ighlight-weekend="false" :return-six-rows="true"
						:hide-header="false" :hide-week-list="false" :render-on-value-change="true"
						:disable-past="false" :disable-future="false">
					</calendar>
					<!--日历,2-->
					<!--Cell,21-->
					<cell title="申请事项：" is-link :border-intent="true" :arrow-direction="showZyEvent ? 'down' : 'null'"
					@click.native="showZyEvent = !showZyEvent">
					</cell>
					<!--Cell,21-->
					<div v-if="showZyEvent" class="phone">			
						<!--Cell,27-->
						<cell title="借用证照类型：" is-link :arrow-direction="showZyEvent1 ? 'down' : 'null'" @click.native="showZyEvent1 = !showZyEvent1">
							<span slot="icon">
								<!--图标X,10-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,10-->
							</span>				
						</cell>
						<!--Cell,27-->
						<template v-if="showZyEvent1">
							<!--Checker,6-->
							<checker v-model="certTypeList" default-item-class="default-item-class"
								selected-item-class="default-item-class-selected" type="checkbox" class="exitLeaveType">
								<!--item,16-->
								<checker-item value="01">
								因私护照
								</checker-item>
								<!--item,16-->
								<!--item,17-->
								<checker-item value="02">
								港、澳通行证
								</checker-item>
								<!--item,17-->
								<!--item,18-->
								<checker-item value="03">
								赴台证
								</checker-item>
								<!--item,18-->
							</checker>
							<!--Checker,6-->
						</template>
						<!--Cell,28-->
						<cell title="申请内容：" is-link :border-intent="true" :arrow-direction="showZyEvent2 ? 'down' : 'null'"
							@click.native="showZyEvent2 = !showZyEvent2">
							<span slot="icon">
								<!--图标X,11-->
								<x-icon type="ios-arrow-right">
								</x-icon>
								<!--图标X,11-->
							</span>
						</cell>
						<!--Cell,28-->
						<template v-if="showZyEvent2">
							<!--Checker,7-->
							<checker v-model="certContentList" default-item-class="default-item-class"
								selected-item-class="default-item-class-selected" type="checkbox" class="certContentList">
								<!--item,19-->
								<checker-item value="办理出国签证">
								办理出国签证
								</checker-item>
								<!--item,19-->
								<!--item,20-->
								<checker-item value="办理港、澳签证">
								办理港、澳签证
								</checker-item>
								<!--item,20-->
								<br />
								<!--item,21-->
								<checker-item value="证照换发">
								证照换发
								</checker-item>
								<!--item,21-->
								<!--item,22-->
								<checker-item value="其他" @click.native="showZyEvent2_other=!showZyEvent2_other">
								其他
								</checker-item>
								<!--item,22-->
							</checker>
							<!--Checker,7-->
							<!--XInput,13-->
							<x-input v-if="showZyEvent2_other" v-model="certContent_other" type="text"
								title="其他：" placeholder="请填写其他"
								style="">
							</x-input>
							<!--XInput,13-->
						</template>
					</div>
					<!--Cell,24-->
					<cell title="个人承诺：" is-link :border-intent="true" :arrow-direction="showPersonCommit ? 'down' : 'null'"
						@click.native="showPersonCommit = !showPersonCommit">
						<span slot="icon">
							<!--图标X,9-->
							<x-icon type="ios-information">
							</x-icon>
							<!--图标X,9-->
						</span>
					</cell>
					<!--Cell,24-->
					<template v-if="showPersonCommit">
						<!--Cell,25-->
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
						<!--Cell,25-->
						<!--XInput,12-->
						<x-input v-if="familyIsExit=='1'?true:false" v-model="familyExitAddress" type="text"
							title="请填写移居国家：" label-width="10em" placeholder="请填写" text-align="right">
						</x-input>
						<!--XInput,12-->
						<!--Cell,26-->
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
						<!--Cell,26-->
						<!--文本域,2-->
						<x-textarea v-if="isIllegal=='1'?true:false" v-model="illegalContent" 
							title="请详细说明：" placeholder="" :show-counter="true" :max="200">
						</x-textarea>
						<!--文本域,2-->
						<!--日历,3-->
						<calendar v-model="estBackDate" title="证照归还日期：" :show-last-month="true"
							:show-next-month="true" :highlight-weekend="false" :return-six-rows="true"
							:hide-header="false" :hide-week-list="false" :render-on-value-change="true"
							:disable-past="false" :disable-future="false">
						</calendar>
						<!--日历,3-->
					</template>
				</group>
				<!--Group,1-->
				<!--div,3-->
				<div style="padding:10px">
					<!--按钮,1-->
					<x-button text="提交" type="primary" @click.native="submitForm">
					</x-button>
					<!--按钮,1-->
				</div>
				<!--div,3-->
			</div>
			<!--div,17-->
			<!--div,4-->
			<div v-if="!showApplyCont" class="applyCont">
				<!--Mescroll,1-->
				<div id="mescroll" class="mescroll">
					<ul soList="ownApplyList">
						<!--Cell,29-->
						<cell v-for="(item,index) in ownApplyList" :key="index"  is-link @click.native="toApplyDetail(item,index)" :border-intent="true">
							<!--div,18-->
							<div slot="icon" class="img1">
							证
							</div>
							<!--div,18-->
							<!--div,19-->
							<div slot="title" class="label1">
								<span>{{item.pin}}</span><br />
								<span>{{item.name}}</span>
							</div>
							<!--div,19-->
							<!--div,20-->
							<div slot="value" class="value1">
								<span>{{item.deptName}}</span><br />
								<span>{{item.postName}}</span><br />
								<span>证照类型：{{gszh(item.certType)}}</span><br />
								<span>申请内容：{{item.certContent}}</span><br />
								<span>预计出境：{{Format(item.estExitDate,'YYYY-MM-DD')}}</span><br />
								<span>预计入境：{{Format(item.estEntryDate,'YYYY-MM-DD')}}</span><br />
							</div>
							<!--div,20-->
						</cell>
						<!--Cell,29-->
					</ul>
				</div>
				<!--Mescroll,1-->
			</div>
			<!--div,4-->
		</div>
		<!--div,2-->			
	</div>
</template>
<script type="text/javascript">
import * as poinMessage from '@/util/poin-common/messageManage.js'
import Format from '@/util/date/format.js'

import '@/util/scroll/mescroll.m.js';

import { XButton,Group,Checker,XDialog,XTextarea,Calendar,PopupPicker,XSwitch,CheckerItem,Actionsheet,Radio,XInput,TabItem,Tab,CellBox,XHeader,Cell,Sticky,Datetime,Selector} from 'vux'
export default {
 data () {
  return {
    disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
    Format:Format,
    tokenId:'',
    headerTitle:'证照换发',
    showApplyCont:false,
    showCrjStatus:true,
    pin:'',
    name:'',
    sex:'',
    birthDay:'',
    identityCard:'',
    maritalStatusList:[["已婚","未婚","离婚","丧偶"]],
    maritalStatus:[],
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
    ownApplyList:[],
    offset:'1',
    limit:'10',
    mescroll:null,
    userData:{"fileName":"UserInfoController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/user/getUserInfo"},
    submitCrj:{"fileName":"ZKEEAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/zkeeapply/saveApply"},
    ownApply:{"fileName":"ZKEEAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/zkeeapply/getSelfEEApplyList"}
  }
 },
components: {
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
    Sticky,
    Datetime,
    Selector
},
mounted (){
this.tokenId = this.$store.state.user.userInfo
if(Object.keys(this.$route.params).length){
	this.headerTitle = '填写出入境申请'
	this.showCrjStatus = true
}
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
	gszh(val){
		var str;
		str = val.replace('01','因私护照')
		str = str.replace('02','港、澳通行证')
		str = str.replace('03','赴台证')
		return str
	},
	// 通讯——获取登录人信息
	getUserData(res,data,MessageObject,error){
		if(res.status==200&&data.retCode==1){
			this.pin = data.retData.pin
			this.name = data.retData.name
			this.postName = data.retData.postName
			this.sex = data.retData.sex=='01'?'男':'女'
			this.birthDay = data.retData.employDateStart
			this.identityCard = data.retData.identityCard
			this.deptName = data.retData.deptName
			this.promiseName = this.name
			this.promiseDate = this.Format(new Date(),'YYYY-MM-DD')
		}
	},
	// 通讯——提交证照换发申请
	submitCrj1(res,data,MessageObject,error){
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
	// 切换申请/已申请
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
	// 编辑婚姻状况
	changeMaritalStatus(val){
		this.marital = val[0]
	},
	// 提交证照换发申请
	submitForm(){
		let that = this
		this.$vux.confirm.show({
    		title: 'Title',
    		content: '确认提交',
    		onConfirm () {
      			that.poin_initManage({
      			'id':'submitCrj',
      			'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
      			'requestFields':{'deptName':'#deptName','certType':'#certType','promiseDate':'#promiseDate','phone_Family':'#phone_Family','exitLeaveType':'#exitLeaveType_re','estExitDate':'#estExitDate','postName':'#postName','phone_Work':'#phone_Work','relativesName':'#relativesName','isIllegal':'#isIllegal','birthDay':'#birthDay','familyExitAddress':'#familyExitAddress','estBackDate':'#estBackDate','exitReason':'#exitReason','tokenId':'#tokenId','phone_Mobile':'#phone_Mobile','relativesPhone_Family':'#relativesPhone_Family','sex':'#sex','exitAddress':'#exitAddress','promiseName':'#promiseName','certContent':'#certContent_re','identityCard':'#identityCard','estEntryDate':'#estEntryDate','relativesPhone_Work':'#relativesPhone_Work','marital':'#marital','familyIsExit':'#familyIsExit','relativesPhone_Mobile':'#relativesPhone_Mobile','illegalContent':'#illegalContent','name':'#name','relativesCompany':'#relativesCompany'}
      			},'submitCrj1')
    		}
  		})
	},
	toApplyDetail(params,index){
		this.$router.push({
			name:'zk_crj_detail',
			params
		})
	}
},
watch: {
	// 获取出境请假类型
	exitLeaveType(val){
		this.exitLeaveType_re = val
	},
	exitLeaveType_other(val){
		this.exitLeaveType_re = val?val:this.exitLeaveType
	},
	// 获取借用证照类型
	certTypeList(val){
		this.certType = val.join(',')
	},
	// 获取申请内容
	certContentList(val){
		this.certContent = val.join(',')
		this.certContent_re = val.join(',')
	},
	certContent_other(val){
		this.certContent_re = this.certContent.replace('其他',val)
	}
}
}</script>
<style type="text/css" scoped>
.apply_crj .sticky {
	height:44px
}
.apply_crj >>> .weui-cells {
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