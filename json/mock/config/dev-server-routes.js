var mock = require('../mock.json')
var swiperList = require('../swiperList.json') 
var applyTypeList = require('../applyTypeList.json') 
var defaultTimeList = require('../defaultTimeList.json') 
var applyList1 = require('../applyList1.json') 
var applyList2 = require('../applyList2.json') 
var applyList3 = require('../applyList3.json') 
var applyList = require('../applyList.json') 
module.exports = function(apiRouters) {
    /**mockRestApi.json*/
    apiRouters.post('/getApplyList',function (req, res) {
    	var taskType = req.body.taskType
    	var applyStatus = req.body.applyStatus
    	let allData = applyList.getApplyList
    	var newData = new Array()
    	if(taskType == '00'){
    		newData = allData.filter(ele => {
    			return applyStatus == ele.applyStatus
    		})
    	}else{
    		newData = allData.filter(ele => {
        		return taskType == ele.taskType && applyStatus == ele.applyStatus
        	})
    	}    	
    	console.log(taskType,applyStatus,newData)
        res.json(newData)
    })
    apiRouters.get('/getApplyList3',function (req, res) {
        res.json(applyList3)
    })
    apiRouters.get('/getApplyList2',function (req, res) {
        res.json(applyList2)
    })
    apiRouters.get('/getApplyList1',function (req, res) {
        res.json(applyList1)
    })
    apiRouters.post('/getDefaultTimeList',function (req, res) {
        res.json(defaultTimeList)
    })
    apiRouters.get('/getDefaultTimeList',function (req, res) {
        res.json(defaultTimeList)
    })
    apiRouters.get('/getApplyTypeList',function (req, res) {
        res.json(applyTypeList)
    })
    apiRouters.get('/getSwiperList',function (req, res) {  	
        res.json(swiperList)
    })
    /**mockRestApi.json*/
    

}
