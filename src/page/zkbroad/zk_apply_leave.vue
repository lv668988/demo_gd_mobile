<template>
	<div style="height:100%" class="apply_leave">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		请假单
		</x-header>
		<!--header,1-->
		<!--通讯,13-->
		<div id="userData">
		</div>
		<!--通讯,13-->
		<!--div,48-->
		<div data-init="poin_initManage({'id':'userData','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId'}},'getUserData')">
		</div>
		<!--div,48-->
		<!--通讯,14-->
		<div id="applyTypeList">
		</div>
		<!--通讯,14-->
		<!--通讯,15-->
		<div id="legalCheck">
		</div>
		<!--通讯,15-->
		<!--通讯,16-->
		<div id="approvalPeople">
		</div>
		<!--通讯,16-->
		<!--通讯,17-->
		<div id="submitLeave">
		</div>
		<!--通讯,17-->
		<!--通讯,18-->
		<div id="ownApply">
		</div>
		<!--通讯,18-->
		<!--div,1-->
		<div style="padding-top:40px">
			<div class="sticky">
			<sticky scroll-box="vux_view_box_body" ref="sticky" :offset="40" :check-sticky-support="false" :disabled="disabled">
				<!--页签Tab,1-->
				<tab ref="leaveStatus" :animate="true">
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
			<!--div,37-->
			<div v-show="showApplyCont">
				<!--Group,1-->
				<group data-init="poin_initManage({'id':'applyTypeList','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{}},'getApplyTypeList')">
					<!--Cell,11-->
					<cell title="" value="" primary="title" value-align="left" :border-intent="true">
						<!--div,39-->
						<div slot="icon">
							<img class="img" src="../../../static/img/tx.png"/>
						</div>
						<!--div,39-->
						<!--div,40-->
						<div slot="title" class="title">
							<span>{{pin}}</span><br />
							<span>{{name}}</span><br />
							<span>{{postName}}</span>
						</div>
						<!--div,40-->
						<!--div,41-->
						<div slot="value" style="text-align:right">
							<!--CheckIcon,1-->
							<check-icon :value.sync="isCrj">
							出入境
							</check-icon>
							<!--CheckIcon,1-->
						</div>
						<!--div,41-->
					</cell>
					<!--Cell,11-->
					<!--P-Picker,1-->
					<popup-picker title="请假类型：" v-model="leaveType" :data="leaveTypeList"
						show-name :columns="1" @on-change="changeApplyType">
					</popup-picker>
					<!--P-Picker,1-->
					<!--日期,1-->
					<datetime title="开始时间：" v-model="beginDateTime" @on-change="changeBeginDateTime" format="YYYY-MM-DD HH:mm" :minute-list="['00','30']">
					</datetime>
					<!--日期,1-->
					<!--日期,2-->
					<datetime title="结束时间：" v-model="endDateTime" @on-change="changeEndDateTime" format="YYYY-MM-DD HH:mm" :minute-list="['00','30']">
					</datetime>
					<!--日期,2-->
					<!--Cell,12-->
					<cell title="申请天数：" primary="title" value-align="left" :border-intent="true">
						<div slot="value" style="text-align:right">
						{{applyDate+'天'}}
						</div>
					</cell>
					<!--Cell,12-->
					<!--Cell,13-->
					<cell title="出境申请：" v-if='isCrj' is-link @click.native="toCrjApply" primary="title" value-align="right" :border-intent="true">
					填写申请单
					</cell>
					<!--Cell,13-->
					<!--Cell,14-->
					<cell title="上传附件：" primary="title" value-align="left" :border-intent="true">
						<!--div,42-->
						<div slot="value" style="text-align:right">
							<!--div,43-->
							<div class="show">
								<!--div,44-->
								<div class="picture" :style="'backgroundImage:url('+headerImage+')'">
								</div>
								<!--div,44-->
							</div>
							<!--div,43-->
							<!--div,45-->
							<div class="showMsg">
								<input type="file" id="upload" accept="image/jpg" @change="upload" style="width:100%">
        						<label for="upload"></label>
							</div>
							<!--div,45-->
						</div>
						<!--div,42-->		
					</cell>
					<!--Cell,14-->
					<!--Cell,15-->
					<cell title="审批人：" :value="approverNameStr" @click.native="showApprover=true" is-link primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,15-->
					<popup v-model="showApprover" position="bottom" max-height="50%">
        				<group>
							<!--CheckList,1-->
							<checklist title='选择审批人' event-render="loadChecklist" v-model="approver" :options="approverList"
								:check-disabled="true" label-position="right" @on-change="changeApprover">
							</checklist>
							<!--CheckList,1-->
						</group>
					</popup>
					<!--Cell,16-->
					<cell title="申请理由：" is-link primary="title" value-align="left" :border-intent="true">
						<!--div,46-->
						<div slot="value" style="text-align:right">
							<!--文本域,1-->
							<x-textarea show-clear v-model="applyReasons" :show-counter="false">
							</x-textarea>
							<!--文本域,1-->
						</div>
						<!--div,46-->
					</cell>
					<!--Cell,16-->
				</group>
				<!--Group,1-->
				<!--div,47-->
				<div style="padding:10px">
					<!--按钮,1-->
					<x-button text="提交" type="primary" @click.native="submitForm">
					</x-button>
					<!--按钮,1-->
				</div>
				<!--div,47-->
			</div>
			<!--div,37-->
			<!--div,11-->
			<div v-if="!showApplyCont" class="applyCont">
				<!--Mescroll,1-->
				<div id="mescroll" class="mescroll">
					<ul soList="ownApplyList">
						<!--Cell,10-->
						<cell v-for="(item,index) in ownApplyList" :key="index"  is-link @click.native="toApplyDetail(item,index)" :border-intent="false">
							<!--div,34-->
							<div slot="icon" class="img1">
							{{item.printName}}
							</div>
							<!--div,34-->
							<!--div,35-->
							<div slot="title" class="label1">
								<span>{{item.pin}}</span><br />
								<span>{{item.name}}</span>
							</div>
							<!--div,35-->
							<!--div,36-->
							<div slot="value" class="value1">
								<span class="flag">{{item.deptName}}</span>
								<span style="color: #6d1989;border:1px solid #6d1989" v-if="item.crj">出入境</span><br />
								<span>{{item.postName}}</span><br />
								<span>{{Format(item.beginDateTime,'YYYY-MM-DD HH:mm')}}</span><br />
								<span>{{Format(item.endDateTime,'YYYY-MM-DD HH:mm')}}</span><br />
								<span>{{item.leaveTimeLong+'天'}}</span>
							</div>
							<!--div,36-->
						</cell>
						<!--Cell,10-->
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

import { XButton,Group,XTextarea,PopupPicker,ToastPlugin,CheckIcon,XInput,TabItem,Tab,Flexbox,CellBox,Popup,Checklist,XHeader,Cell,FlexboxItem,Sticky,Selector,Datetime} from 'vux'

import { EXIF} from '@/util/EXIF/index.js'
export default {
 data () {
  return {
    disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
    Format:Format,
    tokenId:'',
    isFuture:'0',
    isPast:'0',
    showApplyCont:false,
    pin:'',
	name:'',
	postName:'',
    isCrj:false,
    beginDateTime:'',
    endDateTime:'',
    applyDate:'',
    applyFiles:'',
    approver:[],
    approverList:[],
    approverPinStr:'',
    approverNameStr:'',
    showApprover:false,
    applyReasons:'',
    leaveSource:'',
    leaveType:[],
    leaveTypeStr:'',
    leaveTypeList:[],
    headerImage:'',
    picValue:'',
    ownApplyList:[],
    offset:'1',
    limit:'10',
    mescroll:null,
    applyTypeList:{"fileName":"LeaveDefController.json","basePath":"/att_g/pws/rest","method":"get","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/leaveDef/getLeaveTypeDefine"},
    submitLeave:{"fileName":"LeaveApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/leave/insertLeaveApply"},
    userData:{"fileName":"UserInfoController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/user/getUserInfo"},
    approvalPeople:{"fileName":"LeaveApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/leave/findApproverByPage"},
    ownApply:{"fileName":"LeaveApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/leave/getSelfLeaveApplyList"},
    legalCheck:{"fileName":"LeaveApplyController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/leave/legalCheck"}
  }
 },
components: {
    XButton,
    Group,
    XTextarea,
    PopupPicker,
    ToastPlugin,
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
    Selector,
    Datetime
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
		     	console.log('上拉加载')
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
            //callback:function(){
            //	console.log('下拉刷新')
            //} //下拉刷新回调方法
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
// 通讯——获取请假类型
getApplyTypeList(res,data,MessageObject,error){
	if(res.status==200 && data.retCode==1){
		this.leaveTypeList = data.listData
	}
},
// 通讯——后台校验单据合理性
applyCheck(res,data,MessageObject,error){
	if(res.status==200&&data.msg){
		this.applyDate = data.retList[0].days //请假时长
		this.leaveSource = data.leaveSource || ''  //年休假参数
		data.msg=='success' ? 
		this.$vux.toast.show({
 			text: data.yearLeaveInfo ? data.yearLeaveInfo+'天' : data.retList[0].mark,
 			width: '10em'
		}) : 
		this.$vux.toast.show({
 			type: 'warn',
 			text: data.retList[0].mark,
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
// 通讯——提交请假单
submitLeave1(res,data,MessageObject,error){
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
// 切换 申请/已申请请假单
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
// 修改假类
changeApplyType(val){
	this.leaveTypeStr = val[0]
	this.applyChangeCheck()
	this.poin_initManage({
	'id':'approvalPeople',
	'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
	'requestFields':{'tokenId':'#tokenId','leaveIdOrLeaveTypeId':'#leaveTypeStr'}
	},'getApprovalPeople')
},
// 修改请假开始时间
changeBeginDateTime(val){
	this.applyChangeCheck()
},
// 修改请假结束时间
changeEndDateTime(val){
	this.applyChangeCheck()
},
changeApprover(value,label){
	this.approverPinStr = value.join(',')
	this.approverNameStr = label.join(',')
},
// 校验 单据合理性
applyChangeCheck () {
	if(this.leaveTypeStr&&this.beginDateTime&&this.endDateTime){
		this.poin_initManage({
  		'id':'legalCheck',
  		'responseFields':{},
  		'requestFields':{'tokenId':'#tokenId','leaveType':'#leaveTypeStr','beginDateTime':'#beginDateTime','isPast':'#isPast','endDateTime':'#endDateTime','isFuture':'#isFuture'}
  		},'applyCheck')
	}else{
		
	}	
},
// 提交请假单
submitForm(){
	let that = this
	this.$vux.confirm.show({
    	title: 'Title',
    	content: '确认提交',
    	onConfirm () {
    		that.poin_initManage({
    		'id':'submitLeave',
    		'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
    		'requestFields':{'approver':'#approverPinStr','applyReasons':'#applyReasons','tokenId':'#tokenId','applyFiles':'#applyFiles','leaveSource':'#leaveSource','leaveTypeId':'#leaveTypeStr','beginDateTime':'#beginDateTime','endDateTime':'#endDateTime'}
    		},'submitLeave1')
    	}
  	})
},
// 查看已提交请假单明细
toApplyDetail(params,index){
	this.$router.push({
		name:'zk_leave_detail',
		params
	})
},
// 填写出入境
toCrjApply(){
	this.$router.push({
		name:'zk_apply_crj',
		params:{
			pin:this.pin,
			name:this.name
		}
	})
},
// 处理附件
upload (e) {
  //console.log(e)
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  this.picValue = files[0];
  this.imgPreview(this.picValue);
  //console.log(this.picValue)
},
imgPreview (file) {
  let self = this;
  let Orientation;
  //去获取拍照时的信息，解决拍出来的照片旋转问题
   EXIF.getData(file, function(){
       Orientation = EXIF.getTag(this, 'Orientation');
   });
  // 看支持不支持FileReader  
  if (!file || !window.FileReader) return;

  if (/^image/.test(file.type)) {
      // 创建一个reader
      let reader = new FileReader();
      // 将图片2将转成 base64 格式
      reader.readAsDataURL(file);
      // 读取成功后的回调
      reader.onloadend = function () {
        let result = this.result;
        let img = new Image();
        img.src = result;
        //判断图片是否大于100K,是就直接上传，反之压缩图片
        if (this.result.length <= (100 * 1024)) {
          self.headerImage = this.result;
          self.postImg();
        }else {
          img.onload = function () {
            let data = self.compress(img,Orientation);
            self.headerImage = data;
            self.postImg();
          }
        }
        self.applyFiles = this.result
      }
    }
},
postImg () {
  //这里写接口
},
rotateImg (img, direction,canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    const min_step = 0;
    const max_step = 3;
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height;
    let width = img.width;
    let step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    let degree = step * 90 * Math.PI / 180;
    let ctx = canvas.getContext('2d');
    switch (step) {
      case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
      case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
      case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
      case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
    }
},
compress(img,Orientation) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
    //瓦片canvas
  let tCanvas = document.createElement("canvas");
  let tctx = tCanvas.getContext("2d");
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 4000000) > 1) {
    console.log("大于400万像素")
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  //   铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    console.log("超过100W像素");
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
	//       计算每块瓦片的宽和高
    let nw = ~~(width / count);
    let nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  //修复ios上传图片的时候 被旋转的问题
  if(Orientation != "" && Orientation != 1){
    switch(Orientation){
      case 6://需要顺时针（向左）90度旋转
          this.rotateImg(img,'left',canvas);
          break;
      case 8://需要逆时针（向右）90度旋转
          this.rotateImg(img,'right',canvas);
          break;
      case 3://需要180度旋转
          this.rotateImg(img,'right',canvas);//转两次
          this.rotateImg(img,'right',canvas);
          break;
    }
  }
  //进行最小压缩
  let ndata = canvas.toDataURL('image/jpeg', 0.1);
  //console.log('压缩前：' + initSize);
  //console.log('压缩后：' + ndata.length);
  //console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
}
}
}</script>
<style type="text/css" scoped>
.apply_leave .sticky {
	height:44px
}
.apply_leave >>> .weui-cells {
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
.show {
  width: 50px;
  height: 50px;
  overflow: hidden;
  position: relative;
  border: 1px solid #d5d5d5;
}
.showMsg{
  padding-top:10px
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
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
.flag{
	display: inline-block;
    min-width: 6rem
}
.default-item-class {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.default-item-class-selected {
  border: 1px solid green;
} 
 /*mescroll滚动的区域,根据需求自行修改 */
  @import '../../styles/mescroll.min.css';
  .mescroll{
        top: 120px;
        bottom: 0;
        height: auto; 
  }</style>