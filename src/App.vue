<template>
  <div id="app" style="height:100%">
  	<view-box ref="viewBox">
		<keep-alive>
    		<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
  	</view-box> 
  </div>
</template>
<script>
/***vuex状态管理器**/

import { XHeader,ViewBox} from 'vux'

import { mapState,mapActions,mapGetters} from 'vuex'
export default {
 data () {
  return {
  }
 },
components: {
    XHeader,
    ViewBox
},
}</script>
<style lang="less">
/*~:webpack打包编译时指代当前项目下node_modules包里的样式文件*/
@import '~vux/src/styles/reset.less';
/*引入适配的less*/
@import './styles/rem.less';
.html-font-size(@design-font-size, @design-width);
/*引入皮肤 less*/
@import '~@/assets/vux/poin-skin.less';
@theme-color: #6d1989;
.poin-skin(@theme-color);

.vux-header {
    .vux-header-left .vux-header-back{
    	color: #fff;
    	font-size: 1.25rem;
    }
} 

.poin-skin {
	.vux-header {
		padding: 0;
		
		.vux-header-title {
			font-size: 1.4rem;
    		height: 40px;
    		line-height: 43px;
    	}
    	
    	.vux-header-left, .vux-header-right {
			top: 10px;
			font-size:1.25rem;
		}
	}
    .poin-header-title .vux-header-title {
		line-height: 20px;
		white-space: normal;
	}

	.hide {display: none;}
	
	.tabbar-xicon {fill: #999;}
}

  .poin-no-data {
  	margin: 50px 0;
  	text-align: center;
  	color: #999;
  }
  
 /*veeValidate验证的样式*/
.is-danger{
	color:red;
	font-size:14px; 
}
.dangers{
      border: 1px solid red;
}
/*veeValidate验证的样式*/
</style>
