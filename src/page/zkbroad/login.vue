<template>
<!--div,2-->
<div height='100%' class="login">
		<!--Flexbox,1-->
		<flexbox>
			<!--列,1-->
			<flexbox-item>
			<div class="img-center">
				<img class="img" src="../../assets/images/pic_user.jpg"/>
            </div>
			</flexbox-item>
			<!--列,1-->
		</flexbox>
		<!--Flexbox,1-->
		<!--Group,1-->
		<group style="padding:0 10px">
			<!--XInput,1-->
			<x-input style="border-bottom:1px solid #D9D9D9" event-render="loadText" v-model="pin" type="text" placeholder="请输入用户名">
			</x-input>
			<!--XInput,1-->
			<!--XInput,2-->
			<x-input style="border-bottom:1px solid #D9D9D9" event-render="loadText" v-model="password" type="text" placeholder="请输入密码">
			</x-input>
			<!--XInput,2-->
		</group>
		<!--Group,1-->
		<!--通讯,3-->
		<div id="loginPost">
		</div>
		<!--通讯,3-->
		<!--按钮,1-->
		<x-button text="登录" type="primary" action-type="button" @click.native="loginIn"
			style="margin-top:20px">
		</x-button>
		<!--按钮,1-->
	</div>
	<!--div,2-->
</template>
<script>
import * as poinMessage from '@/util/poin-common/messageManage.js'

import { XInput,XButton,Group,Flexbox,FlexboxItem} from 'vux'

import { mapState,mapActions,mapGetters} from 'vuex'
export default {
 data () {
  return {
    pin:'',
	password:'',
	tokenId:'',
    loginPost:{"fileName":"LoginController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/login/loginPost"}
  }
 },
components: {
    XInput,
    XButton,
    Group,
    Flexbox,
    FlexboxItem
},
computed:{
},
methods : {
	poin_initManage(messageKey,callback,execBefore){
		messageKey.vue = this;
		poinMessage.messageManage(messageKey,callback,execBefore);
	},
	loginEv(res,data,MessageObject,error){
		if(res.status==200&&data.retCode==1){
			this.tokenId = data.retData.tokenId
			this.$store.dispatch('setUserInfo',data.retData.tokenId)
			this.$router.push({
				name:'zk_home'
			})
		}
	},
	loginIn(){
		this.poin_initManage({
		'id':'loginPost',
		'responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},
		'requestFields':{'password':'#password','pin':'#pin'}
		},'loginEv')
	}
}

}</script>
<style type="text/css" lang="less" scoped>
@purple:#a04dc0;
.login{
.weui-cells:before,
.weui-cells:after,
.weui-grid:before,
.weui-grid:after,
.weui-cell:before,
.weui-grids:before{
	display:none;
}
.text-center {
    text-align: center;
    a{
    	color:@purple;
    	font-size:0.8em;
    }
    span{
    	color:#000;
    	font-size:0.8em
    }
    .agree{
    	font-size:0.7em;
    	color:#ccc;
    	margin-right:6px;
    }
}
.protocol{
 	margin-top:9em;
 }
 .forger-password{
 	
 	a{
 		margin:0 1em;
 	}
 }
}


.img-center {
    text-align: center;
    padding:3em 0;
}
.img{
	max-width:100%;
	height:auto;
	border-radius:50%;
	padding:1em;
}

</style>
