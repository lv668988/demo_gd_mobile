//VeeValidate  验证插件
import Vue from 'vue'
import VeeValidate,{Validator} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate,{
	//validate config 配置项
	local:'zh_CN',
	delay:'100',
	errorBagName:'VeeErrors'
  });
//设置中文验证
Validator.localize('zh_CN',zh_CN);

//加验证规则
/*Validator.extend('mobile',{
	getMessage:filed =>{
		return filed +'必须是11位手机号'
	},
	validate:value => {
		return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
	}
});*/

//修改默认错误提示配置
 const dict = {
		 zh_CN :{
			messages:{
				//required:(name) => '请输入'+name,
				//email:() => '请输入正确的邮箱格式！'
			},
			attributes:{
				//loginName:"登录名"
			}
 
		}
}
 Validator.localize(dict);
