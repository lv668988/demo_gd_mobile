<template>
	<div style="height:100%" class="approval_detail">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		{{name+'的单据'}}
		</x-header>
		<!--header,1-->
		<!--div,1-->
		<div style="padding-top:40px">
			<!--Group,1-->
			<group>
				<!--Cell,1-->
				<cell title="" value="" primary="title" value-align="left" :border-intent="true">
					<!--div,2-->
					<div slot="icon">
						<img :src="imgSrc" style="height:50px;width:50px;border-radius:50%" />
					</div>
					<!--div,2-->
					<!--div,3-->
					<div slot="after-title" style="margin-left:4px">
						<span style="font-size:8px">
							<span>{{pin}}</span></br>
							<span>{{name}}</span>
						</span>
					</div>
					<!--div,3-->
				</cell>
				<!--Cell,1-->
				<!--Cell,2-->
				<cell title="申请内容：" primary="title" value-align="left" :border-intent="true">
					<!--Cell,3-->
					<cell :title="deptName" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,3-->
					<!--Cell,4-->
					<cell :title="leaveName" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,4-->
					<!--Cell,5-->
					<cell :title="beginDateTime+'-'+endDateTime" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,5-->
					<!--Cell,6-->
					<cell :title="'请假天数：'+applyDate" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,6-->
					<!--Cell,7-->
					<cell :title="'理由：'+applyReason" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,7-->
					<!--Cell,8-->
					<cell title="附件：" primary="title" value-align="left" :border-intent="true">
					</cell>
					<!--Cell,8-->
				</cell>
				<!--Cell,2-->
				<!--Cell,9-->
				<cell title="当前审批人：" primary="title" value-align="left" :border-intent="true">
				</cell>
				<!--Cell,9-->	
				<!--xTable,1-->
				<x-table event-render="loadTable" tdList="aaa" :cell-bordered="true"
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
						<tr v-for="(item,index) in aaa">
							<!--列body,1-->
							<td>
							{{item.a}}
							</td>
							<!--列body,1-->
							<!--列body,2-->
							<td>
							{{item.b}}
							</td>
							<!--列body,2-->
							<!--列body,3-->
							<td>
							{{item.c}}
							</td>
							<!--列body,3-->
						</tr>
					</tbody>
				</x-table>
				<!--xTable,1-->			
			</group>
			<!--Group,1-->	
		</div>
		<!--div,1-->
	</div>
</template>
<script type="text/javascript">

import { XTable,Group,XButton,Tabbar,XDialog,Flexbox,XTextarea,XHeader,TabbarItem,Cell,FlexboxItem} from 'vux'
export default {
 data () {
  return {
    pin:'',
  	name:'',
  	bussID:'',
  	leaveName:'',
  	imgSrc:'',
  	deptName:'',
  	beginDateTime:'',
  	endDateTime:'',
  	applyDate:'1天',
  	applyReason:'',
    aaa:[{a:1,b:1,c:1},{a:2,b:2,c:2},{a:3,b:3,c:3}]
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
    TabbarItem,
    Cell,
    FlexboxItem
},
mounted (){
let applyDetail = this.$route.params
	this.pin = applyDetail.pin
	this.name = applyDetail.name
	this.bussID = applyDetail.bussID
	this.leaveName = applyDetail.leaveName
	this.imgSrc = applyDetail.src
	this.deptName = applyDetail.deptName
	this.beginDateTime = applyDetail.beginDateTime
	this.endDateTime = applyDetail.endDateTime
	//Object.assign(this.applyDetail,this.$route.params)
	//this.applyDetail = JSON.parse(JSON.stringify(this.$route.params))
},
methods : {

}
}</script>
<style type="text/css" scoped>
.approval_detail >>> .weui-cells {
	margin-top:0;
	font-size:14px;
	padding:0 10px
}
.approval_detail >>> .weui-cell {
	padding:8px 15px
}
.dialog-demo .weui-dialog{
    border-radius: 8px;
  }
</style>