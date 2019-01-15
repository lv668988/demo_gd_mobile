var baseData = {};
if (process.env.NODE_ENV === 'production') {//生产模式
 baseData = {
	"host":"",
	"basePath":"/poin/webapi",
	"schemes":"",
	"host1":"",
	"basePath1":"/poin/webapi",
	"schemes1":"",
	"message":{
		"isLoading":false
   }
  }
} else {//开发模式
 baseData = {
	"host":"localhost:8888",
	"basePath":"/api",
	"schemes":"http",
	"host1":"192.168.1.104:8080",
	"basePath1":"/ceb/webapi",
	"schemes1":"http",
    "message":{
    "isLoading":false
   }
  }
}
export {
 baseData
}

 