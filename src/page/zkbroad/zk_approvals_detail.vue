<template>
	<div style="height:100%" class="approvals_detail">
		<!--header,1-->
		<x-header style="width:100%;position:absolute;left:0;top:0;z-index:999;">
		批量审批
		</x-header>
		<!--header,1-->
		<!--div,1-->
		<div style="padding-top:40px">
			<!--Group,1-->
			<group>
				<!--Cell,4-->
				<cell :title="'已选择单据'+checkedNum+'条'" primary="title" value-align="left" :border-intent="true">
				</cell>
				<!--Cell,4-->	
				<!--Cell,3-->
				<cell title="意见：" is-link primary="title" value-align="left" :border-intent="true">
					<!--div,2-->
					<div slot="value" style="text-align:right">
						<!--文本域,1-->
						<x-textarea show-clear v-model="applyRemark" :show-counter="false">
						</x-textarea>
						<!--文本域,1-->
					</div>
					<!--div,2-->
				</cell>
				<!--Cell,3-->
			</group>
			<!--Group,1-->
		</div>
		<!--div,1-->
		<!--div,3-->
		<div style="padding:10px">
			<!--按钮,1-->
			<x-button text="全部同意" :type="types[0]" action-type="button" @click.native="agree">
			</x-button>
			<!--按钮,1-->
			<!--按钮,2-->
			<x-button text="全部拒绝" :type="types[1]" action-type="button" @click.native="refuse">
			</x-button>
			<!--按钮,2-->		
			<!--按钮,3-->
			<x-button text="全部退回" :type="types[2]" action-type="button" @click.native="retreat">
			</x-button>
			<!--按钮,3-->		
		</div>
		<!--div,3-->
	</div>
</template>
<script type="text/javascript">

import { XButton,Group,Tabbar,XDialog,Flexbox,XTextarea,XHeader,TabbarItem,Cell,FlexboxItem} from 'vux'
export default {
 data () {
  return {
    types:['primary','default','default'],
    checkedArr:[],
  	checkedNum:'',
    applyRemark:''
  }
 },
components: {
    XButton,
    Group,
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
this.checkedArr = this.$route.params.checkedArr
	this.checkedNum = this.checkedArr.length
},
methods : {
	agree(){
		this.types = ['default','default','default']
		this.types[0] = 'primary'
		let that = this
		this.$vux.confirm.show({
        	title: 'Title',
        	content: '是否同意',
        	onConfirm () {
          		that.$vux.loading.show({
        			text: 'Loading'
      			})
      			setTimeout(() => {
        			that.$vux.loading.hide()
      			}, 2000)
        	}
      	})
	},
	refuse(){
		this.types = ['default','default','default']
		this.types[1] = 'primary'
		let that = this
		this.$vux.confirm.show({
        	title: 'Title',
        	content: '是否拒绝',
        	onConfirm () {
          		that.$vux.loading.show({
        			text: 'Loading'
      			})
      			setTimeout(() => {
        			that.$vux.loading.hide()
      			}, 2000)
        	}
      	})
	},
	retreat(){
		this.types = ['default','default','default']
		this.types[2] = 'primary'
		let that = this
		this.$vux.confirm.show({
        	title: 'Title',
        	content: '是否退回',
        	onConfirm () {
          		that.$vux.loading.show({
        			text: 'Loading'
      			})
      			setTimeout(() => {
        			that.$vux.loading.hide()
      			}, 2000)
        	}
      	})
	}
},
}</script>
<style type="text/css" scoped>
.approvals_detail >>> .weui-cells {
	margin-top:0;
	font-size:14px;
	//padding:0 10px
}
</style>