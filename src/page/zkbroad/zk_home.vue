<template>
	<!--div,2-->
	<div style="height:100%" class="home">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		北分考勤审批
		</x-header>
		<!--header,1-->
		<!--通讯,1-->
		<div id="getCount">
		</div>
		<!--通讯,1-->
		<!--div,4-->
		<div data-init="poin_initManage({'id':'getCount','responseFields':{'listData':'#listData','changeRow':'#changeRow','retData':'#retData','retCode':'#retCode','retMsg':'#retMsg'},'requestFields':{'tokenId':'#tokenId'}},'getCount1')">
		</div>
		<!--div,4-->
		<!--div,3-->
		<div style="padding-top:40px">
			<!--Grid,1-->
			<grid ref="homeIcon" :cols="3">
				<!--gridSon,1-->
				<grid-item link="/zk_approval" label="审批">
					<!--图标X,18-->
					<x-icon type="android-checkbox-outline" size="28" slot="icon">
					</x-icon>
					<!--图标X,18-->
					<badge class="applyCount" :text="applyCount"></badge>
				</grid-item>
				<!--gridSon,1-->
				<!--gridSon,2-->
				<grid-item link="/zk_apply_leave" label="请假">
					<!--图标X,19-->
					<x-icon type="android-checkbox-outline-blank" size="28" slot="icon">
					</x-icon>
					<!--图标X,19-->
				</grid-item>
				<!--gridSon,2-->
				<!--gridSon,3-->
				<grid-item link="/zk_apply_repair" label="补刷卡">
					<!--图标X,20-->
					<x-icon type="android-mail" size="28" slot="icon">
					</x-icon>
					<!--图标X,20-->
				</grid-item>
				<!--gridSon,3-->
				<!--gridSon,5-->
				<grid-item link="/zk_apply_crj" label="证照换发">
					<!--图标X,22-->
					<x-icon type="ios-ionic-outline" size="28" slot="icon">
					</x-icon>
					<!--图标X,22-->
				</grid-item>
				<!--gridSon,5-->
				<!--gridSon,6-->
				<grid-item link="" label="异常考勤">
					<!--图标X,23-->
					<x-icon type="ios-ionic-outline" size="28" slot="icon">
					</x-icon>
					<!--图标X,23-->
					<badge class="applyCount"></badge>
				</grid-item>
				<!--gridSon,6-->
			</grid>
			<!--Grid,1-->
		</div>
		<!--div,3-->
	</div>
<!--div,2-->
</template>
<script>
import * as poinMessage from '@/util/poin-common/messageManage.js'

import { GridItem,Grid,XHeader,Badge} from 'vux'
export default {
 data () {
  return {
    tokenId:'',
    applyCount:0,
    getCount:{"fileName":"FlowTaskAppController.json","basePath":"/att_g/pws/rest","method":"post","scheme":"http","host":"192.168.1.100:8080","consume":"0","produce":"0","uri":"/flowTask/getTaskListCount"}
  }
 },
components: {
    GridItem,
    Grid,
    XHeader,
    Badge
},
mounted (){
this.tokenId = this.$store.state.user.userInfo
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
 	getCount1(res,data,MessageObject,error){
 		if(res.status==200&&data.retCode==1){
 			this.applyCount = data.retData.allTaskListCount
 		}
 	}
}
}</script>
<style scoped>
.applyCount {
	position:absolute;
	top:18%;
	left:52%
}
</style>