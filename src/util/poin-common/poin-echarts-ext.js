//	公共属性方法
	function PoinEchart(vueObj,echartsObj,thisDom,resData){		
		this.database = this.processEchartBashData(thisDom);
		this.echartsObj = echartsObj;
		this._renderTo = thisDom;
		this.vueObjs = vueObj;
		this.resData = resData;
		this.bd = {				
				_title:this.database.titles, //一级标题
				_subTitle:this.database.subTitle, //二级标题				
				_titPos:this.database.titPos, //标题位置				
				_typeRadius:this.database.typeRadius, //图表半径
				_typeGrid:this.database.typeGrid, //坐标轴左右间距
				_typeChild:this.database.typeChild, //图表子类型
				_isdataZoom:this.database.dataZoom, //图表是否支持缩放
				//_chartBg:this.database.background.replace(/\_+/g,""),//图表背景
				//_chartColor:this.database.color, //设置图表颜色
				_chartBg:this.database.background,//图表背景
				_chartColor:this.database.color, //设置图表颜色
				_toolTipTriger:this.database.toolTipTriger, //提示框触发类型
				_toolTipFormater:this.database.toolTipFormater, //提示框标题格式化
				_tooltipAxisPointer:this.database.tooltipAxisPointer, //设置tooltip x轴的线条
				_isLegend:this.database.legend, // 是否开启图列选项
				_legendPos:this.database.legendPos, //图列对齐方式
				_legendOrient:this.database.legendOrient, // 图列排列方式
				_legendData:resData.legendData, //图列数据
				_height:this.database.height, //图表高度
				_isToolBox:this.database.toolBox, //是否显示工具栏
				_toolBoxSet:this.strToObj(this.database.toolBoxSet), //配置工具栏显示项
				_isToolBoxBrush:this.database.toolBoxBrush, //配置区域选择工具栏显示项
				_toolBoxOrient:this.database.toolBoxSetOrient.toString(), //工具栏排列方式
				_toolBoxPos:this.database.toolBoxPos.replace(/\_+/g,"").split(","), //工具栏对齐方式
				_isLineSmooth:this.database.lineSmooth,//线条圆滑开关
				_isLineShadow:this.database.lineShadow, //是否设置线图阴影	
				_symbolSize:parseInt(this.database.symbolSize) || 0, //设置节点大小
				_barWidth:this.database.barWidth || 0, //柱状图宽度  
				_gap:parseInt(this.database.gap), //设置漏斗图内间距大小
				_funnelWidth:this.database.funnelWidth,//漏斗图宽度
				_xAxisData:resData.xAxisData, //x轴格式化数据
				_yAxisData:resData.yAxisData, //y轴格式化数据  
				_seriesd:resData.series, // 图表数据
				_clickFun:this.database.onClick,
				_onLodad:this.database.onLodad,
				_mouseoutFun:this.database.onMouseout,
				_mousemoveFun:this.database.onMousemove,
				_funnelPos:this.database.funnelPos,//漏斗图外间距
				_pieCenter:this.database.pieCenter //饼图间距【0%，0%】左右\上下				
		};
		this._toolBoxSetData = this.toolBoxSetData(this.bd._toolBoxSet);//获取配置工具栏配置项,根据生成的代码给不同的值
		this._options = {
				title:{},
				series:[],
				legend:{},
				tooltip:{
					trigger:"",
					formatter:null
					},
				toolbox:{
					feature:{dataView:"" || null,restore:"" || null}
				},
				grid:{
					top:"",
					left:'',
					right:'',
					bottom:''	
				}
		};
		this.setdataZoom = function(flag){
			if(flag === 'true'){
				this._options.dataZoom = [{type: 'slider',xAxisIndex: 0,filterMode: 'empty'},
					                           {type: 'slider',yAxisIndex: 0,filterMode: 'empty'},
					                           {type: 'inside',xAxisIndex: 0,filterMode: 'empty'},
					                           {type: 'inside',yAxisIndex: 0,filterMode: 'empty'}]
				}else{
					delete this._options.dataZoom;
				}
		};
		//是否设置线图阴影
		 this.setLineShadow = function(flag,setVal){
			if(flag === 'true'){
				setVal.lineStyle =  {
		                normal: {
		                    width: 3,
		                    shadowColor: 'rgba(0,0,0,0.4)',
		                    shadowBlur: 10,
		                    shadowOffsetY: 10
		                }
		            }
			}else{
				delete setVal.lineStyle;
			}
		};
		
	};
//	图表渲染方法
	PoinEchart.prototype.render = function(){
		var _renderDom = this._renderTo;
//		var chartInit = this.echartsObj.echarts.init(_renderDom); //图标初始化
		var chartInit = this.echartsObj.init(_renderDom); //图标初始化		
			chartInit.setOption(this._options);			
		return this;	
	}
	//重置options方法
	PoinEchart.prototype.setOption = function(newoption){		
		var oldData = this._options;
		var op = Object.assign({},oldData,newoption)
		this._options = op;		
		this.render();
		return this;
		}
	//重置options方法
	PoinEchart.prototype.xAxisYAxis = function(){	
		var echart = this;	
		var _xAxisType = this.database.xAxisType, //X轴类型
		_xAxisName = this.database.xAxisName, // x轴名字
		_yAxisType = this.database.yAxisType, //y轴类型
		_yAxisName = this.database.yAxisName, //y轴名字
		_isXAxisTick = this.database.xAxisTick, // 设置X轴刻度轴
		_isXAxisRotate = this.database.xAxisRotate, // x轴是否倾斜45度
		_isYAxisRotate = this.database.yAxisRotate, // y轴是否倾斜45度
		_isYAxisTick = this.database.yAxisTick, // 设置Y轴刻度轴
		boyAxisFormatter = this.database.yAxisFormatter, //y轴格式化
		boxAxisFormatter = this.database.xAxisFormatter, //x轴格式化
		_yAxisMin = parseInt(this.database.yAxisMin) || null, //y轴最小值
		_yAxisMax = parseInt(this.database.yAxisMax) || null, //y轴最大值
		_xAxisMin = parseInt(this.database.xAxisMin) || null, //x轴最小值
		_xAxisMax = parseInt(this.database.xAxisMax) || null; //x轴最大值
		//配置x轴和y轴
		var xAxisArr = [];
		var yAxisArr = [];
		var yAxisDatas = echart.bd._yAxisData;
		var xAxisDatas = echart.bd._xAxisData;

		xAxisDatas.forEach(function(item,index){
			
			if(echart.bd._typeChild === 'baseline' || echart.bd._typeChild === 'arealine'){
				xAxisArr.push({
					type: item.type,
					name:_xAxisName,
					data:item.data,	
					axisLine: {onZero: false},
					boundaryGap:false,
					axisLabel:{
						formatter:echart.vueObjs[boxAxisFormatter],
					    interval:0,
						rotate:(_isXAxisRotate === 'true') ? '45' : '0'								
					},
					min:_xAxisMin  || item.min,
					max:_xAxisMax || item.max
				});	
				
			}else if(echart.bd._typeChild === 'basebar' || echart.bd._typeChild === 'stackbar'){	
				
				if(_isXAxisTick === 'true'){
					xAxisArr.push({
						type: item.type,
						name:_xAxisName,
						data:item.data,	
						axisLine: {onZero: false},
						axisLabel:{
							formatter:echart.vueObjs[boxAxisFormatter],
						    interval:0,
							rotate:(_isXAxisRotate === 'true') ? '45' : '0'								
						},
						min:_xAxisMin || item.min,
						max:_xAxisMax || item.max,
						axisTick:{alignWithLabel: true}
					});	
					
				}else{
					xAxisArr.push({
						type: item.type,
						name:_xAxisName,
						data:item.data,	
						axisLine: {onZero: false},
						axisLabel:{
							formatter:echart.vueObjs[boxAxisFormatter],							
						    interval:0,
							rotate:(_isXAxisRotate === 'true') ? '45' : '0'								
						},
						min:_xAxisMin || item.min,
						max:_xAxisMax || item.max
					});
					
				}
				
			}
			echart._options.xAxis = xAxisArr;
			
		})
		yAxisDatas.forEach(function(item,index){
			if(echart.bd._typeChild === 'baseline' || echart.bd._typeChild === 'arealine'){
				yAxisArr.push({
					type: item.type,
					name:_yAxisName,
					data:item.data,
					axisLine: {onZero: false},
					boundaryGap:false,
					axisLabel:{
						formatter:echart.vueObjs[boyAxisFormatter],
					    interval:0,
						rotate:(_isYAxisRotate === 'true') ? '45' : '0'								
					},
					min:_yAxisMin || item.min,
					max:_yAxisMax || item.max
				});	
			}else if(echart.bd._typeChild === 'basebar' || echart.bd._typeChild === 'stackbar'){
				if(_isYAxisTick === 'true'){
					yAxisArr.push({
						type: item.type,
						name:_yAxisName,
						data:item.data,
						axisLine: {onZero: false},
						axisLabel:{
							formatter:echart.vueObjs[boyAxisFormatter],
						    interval:0,
							rotate:(_isYAxisRotate === 'true') ? '45' : '0'								
						},
						min:_yAxisMin || item.min,
						max:_yAxisMax || item.max,
						axisTick:{alignWithLabel: true}
					});							
				}else{
					yAxisArr.push({
						type: item.type,
						name:_yAxisName,
						data:item.data,
						axisLine: {onZero: false},
						axisLabel:{
							formatter:echart.vueObjs[boyAxisFormatter],
						    interval:0,
							rotate:(_isYAxisRotate === 'true') ? '45' : '0'								
						},
						min:_yAxisMin || item.min,
						max:_yAxisMax || item.max
					});
				}
			}
			echart._options.yAxis = yAxisArr;
			
		})				
		}
	PoinEchart.prototype.drawEchart = function(childType,sdata){
		var self = this;
		var itemValue = [];
		var database = self.bd;
		var options = self._options;
		self.setdataZoom(database._isdataZoom);//是否设置缩放
		options.series = itemValue;
		sdata.forEach(function(item,i){
			self.setLineShadow(database._isLineShadow,sdata[i]);//是否设置线图阴影
			//折线图圆滑开关
			function setSmooth(flag){
				if(flag === 'true'){
					sdata[i].smooth = true;
				}else{
					sdata[i].smooth = false;
				}
			}
			switch(childType){
			case 'basepie':
				var _pieCenter = database._pieCenter.replace(/\_+/g,"").split(","); //饼图间距【0%，0%】左右\上下
					sdata[i].type = item.type;//设置图表数据类型
					sdata[i].center = _pieCenter; //设置饼图的上下左右间距			
					sdata[i].itemStyle ={
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}

					};
//					sdata[i].radius = _typeRadius[1];
//					delete sdata[i].itemStyle
					delete sdata[i].itemStyle
					delete sdata[i].label;
					delete sdata[i].labelLine;
					//delete sdata[i].labelLine;
					delete sdata[i].gap;
				break;
			case 'cirlepie':				
				var _typeRadius = database._typeRadius.split(","); //图表半径
				var _pieCenter = database._pieCenter.replace(/\_+/g,"").split(","); //饼图间距【0%，0%】左右\上下
				sdata[i].center = database._pieCenter; //设置饼图的上下左右间距
				sdata[i].label = {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				};
				sdata[i].labelLine = {
						normal: {
							show: false
						}
				};
				sdata[i].radius = _typeRadius;
				sdata[i].avoidLabelOverlap = false;
				break;
			case 'basebar':
				var _typeGrid = database._typeGrid.replace(/\_+/g,"").split(","); //坐标轴左右间距
				self.setGrid(_typeGrid);//图表间距设置
				options.tooltip.axisPointer = {type: database._tooltipAxisPointer};//设置tooltip x轴的线条
				sdata[i].barWidth = database._barWidth;
				self.xAxisYAxis();
				break;
			case 'stackbar':
				var _typeGrid = database._typeGrid.replace(/\_+/g,"").split(","); //坐标轴左右间距
				self.setGrid(_typeGrid);//图表间距设置
				options.tooltip.axisPointer = {type: database._tooltipAxisPointer};//设置tooltip x轴的线条
				sdata[i].barWidth =  database._barWidth;
				sdata[i].stack = '\u603B\u91CF';
				sdata[i].label = {normal: {show: true,position: 'insideRight'}};
				self.xAxisYAxis();
				break;
			case 'baseline':
				var _typeGrid = database._typeGrid.replace(/\_+/g,"").split(","); //坐标轴左右间距
				self.setGrid(_typeGrid);//图表间距设置
				options.tooltip.axisPointer = {type: database._tooltipAxisPointer}; //设置tooltip x轴的线条
				setSmooth(database._isLineSmooth);//是否设置线条圆滑
				//是否设置toolTip x轴线类型
				sdata[i].symbolSize = database._symbolSize; //控制圈圈节点的大小
				options.series = itemValue;
				delete sdata[i].areaStyle;
				delete sdata[i].stack;
				self.xAxisYAxis();
				break;
			case 'arealine':
				var _typeGrid = database._typeGrid.replace(/\_+/g,"").split(","); //坐标轴左右间距
				self.setGrid(_typeGrid);//图表间距设置
				options.series = itemValue;
				setSmooth(database._isLineSmooth);//是否设置线条圆滑
				sdata[i].symbolSize = database._symbolSize; //控制圈圈节点的大小
				sdata[i].areaStyle = {normal: {}};
				sdata[i].stack = "\u603B\u91CF";
				self.xAxisYAxis();
				break;
			case 'funnel':
				var _funnelPos = database._funnelPos.replace(/\_+/g,"").split(",");
				sdata[i].type = item.type;
				sdata[i].gap = database._gap;
				sdata[i].label = {
						normal: {
							show: true,
							position: 'inside'
						},
						emphasis: {
							textStyle: {
								fontSize: 20
							}
						}
				};
				sdata[i].labelLine = {
						normal: {
							length: 10,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						}
				};
				sdata[i].itemStyle = {
						normal: {
							borderColor: '#fff',
							borderWidth: 1
						}
				};
				if(_funnelPos[0].length !== 0){
					sdata[i].top =  _funnelPos[0];
				}else{
					delete sdata[i].top;
				}
				if(_funnelPos[1].length !== 0){
					sdata[i].right = _funnelPos[1];
				}else{
					delete sdata[i].right;
				}
				if(_funnelPos[2].length !== 0){
					sdata[i].bottom = _funnelPos[2];
				}else{
					delete sdata[i].bottom;
				}
				if(_funnelPos[3].length !== 0){
					sdata[i].left = _funnelPos[3];
				}else{
					delete sdata[i].left;
				}
				sdata[i].width = database._funnelWidth;
				sdata[i].sort = 'descending';
				break;				
			default:
				break;
			}
		return itemValue.push(item);
		})
	}
	//字符串转换为对象
	PoinEchart.prototype.strToObj = function(str){
		var obj = {};
		if(str !== '' && str !== undefined){
			var val = str.split(" ");
			for(var i=0,len=val.length;i<len;i++){
				var temp = val[i]
				obj[i] = temp;
			}
			return obj;
		}
		return false;
	}
//	根据_toolBoxSet和_toolBoxSetVal来返回对应的值,type是一个对象
//	type:_ecdataview,_ecsaveimage,_ecRestore,_ecLineBar,_ecstacktiled
	PoinEchart.prototype.toolBoxSetData = function(type){
		var optionsFeature = {};
		if(typeof type === "object"){
			for(var iteam in type){
				var tolowerVal = type[iteam].toLowerCase();
				switch(tolowerVal){
				case 'ecdataview': //数据视图按钮
					optionsFeature.ecdataview = {show: true, readOnly: false};
					break;
				case 'ecsaveimage': //保存按钮
					optionsFeature.ecsaveimage = {show: true};
					break;
				case 'ecrestore': //还原按钮
					optionsFeature.ecrestore = {show: true};
					break;
				case 'ecdatazoom': //缩放按钮
					optionsFeature.ecdatazoom = {yAxisIndex: 'none'};
					break;
				case 'eclinebar': //柱状图和线图切换
					optionsFeature.eclinebar = {type: ['line', 'bar']};
					break;
				case 'ecstacktiled': //堆叠图和平铺图切换
					optionsFeature.ecstacktiled = {type: ['stack', 'tiled']};
					break;
				default:
				}
			}
		}
		return optionsFeature;
	}
//	获取所有dom元素data-属性
	PoinEchart.prototype.processEchartBashData = function(jqDom){
		var ecdata = {};
		if(jqDom.getAttribute("id") != undefined){
			ecdata.id = jqDom.getAttribute("id");
		}
		if(jqDom.getAttribute("data-title") != undefined){			
			ecdata.titles = jqDom.getAttribute("data-title");
		}	
		if(jqDom.getAttribute("data-subTitle") != undefined){			
			ecdata.subTitle = jqDom.getAttribute("data-subTitle");
		}
		if(jqDom.getAttribute("data-titPos") != undefined){
			ecdata.titPos = jqDom.getAttribute('data-titPos');
		}
		if(jqDom.getAttribute("data-type") != undefined){
			ecdata.chartType = jqDom.getAttribute('data-type');
		}
		if(jqDom.getAttribute("data-typeChild") != undefined){
			ecdata.typeChild = jqDom.getAttribute('data-typeChild');
		}
		if(jqDom.getAttribute('data-background') != undefined){
			ecdata.background = jqDom.getAttribute('data-background');
		}
		if(jqDom.getAttribute('data-typeRadius') != undefined){
			ecdata.typeRadius = jqDom.getAttribute('data-typeRadius');
		}
		if(jqDom.getAttribute('data-typeGrid') != undefined){
			ecdata.typeGrid = jqDom.getAttribute('data-typeGrid');
		}
		if(jqDom.getAttribute('data-height') != undefined){
			ecdata.height = jqDom.getAttribute('data-height');
		}		
		if(jqDom.getAttribute('data-dataZoom') != undefined){
			ecdata.dataZoom = jqDom.getAttribute('data-dataZoom');
		}
		if(jqDom.getAttribute('data-toolBox') != undefined){
			ecdata.toolBox = jqDom.getAttribute('data-toolBox');
		}
		if(jqDom.getAttribute('data-toolBoxSet') != undefined){
			ecdata.toolBoxSet = jqDom.getAttribute('data-toolBoxSet');
		}
		if(jqDom.getAttribute('data-toolBoxOrient') != undefined){
			ecdata.toolBoxSetOrient = jqDom.getAttribute('data-toolBoxOrient');
		}
		if(jqDom.getAttribute('data-toolBoxPos') != undefined){
			ecdata.toolBoxPos = jqDom.getAttribute('data-toolBoxPos');
		}
		if(jqDom.getAttribute('data-toolBoxBrush') != undefined){ 
			ecdata.toolBoxBrush = jqDom.getAttribute('data-toolBoxBrush');
		}
		if(jqDom.getAttribute('data-legend') != undefined){
			ecdata.legend = jqDom.getAttribute('data-legend');
		}
		if(jqDom.getAttribute('data-legendPos') != undefined){
			ecdata.legendPos = jqDom.getAttribute('data-legendPos');
		}
		if(jqDom.getAttribute('data-legendOrient') != undefined){
			ecdata.legendOrient = jqDom.getAttribute('data-legendOrient');
		}
		if(jqDom.getAttribute('data-gap') != undefined){
			ecdata.gap = jqDom.getAttribute('data-gap');
		}
		if(jqDom.getAttribute('data-toolTipFormater') != undefined){
			ecdata.toolTipFormater = jqDom.getAttribute('data-toolTipFormater');
		}
		if(jqDom.getAttribute('data-toolTipTriger') != undefined){
			ecdata.toolTipTriger = jqDom.getAttribute('data-toolTipTriger');
		}
		if(jqDom.getAttribute('data-xAxisType') != undefined){
			ecdata.xAxisType = jqDom.getAttribute('data-xAxisType');
		}
		if(jqDom.getAttribute('data-xAxisName') != undefined){
			ecdata.xAxisName = jqDom.getAttribute('data-xAxisName');
		}
		if(jqDom.getAttribute('data-xAxisFormatter') != undefined){
			ecdata.xAxisFormatter = jqDom.getAttribute('data-xAxisFormatter');
		}
		if(jqDom.getAttribute('data-yAxisType') != undefined){
			ecdata.yAxisType = jqDom.getAttribute('data-yAxisType');
		}
		if(jqDom.getAttribute('data-yAxisName') != undefined){
			ecdata.yAxisName = jqDom.getAttribute('data-yAxisName');
		}
		if(jqDom.getAttribute('data-yAxisFormatter') != undefined){
			ecdata.yAxisFormatter = jqDom.getAttribute('data-yAxisFormatter');
		}
		if(jqDom.getAttribute('data-xAxisType') != undefined){
			ecdata.xAxisType = jqDom.getAttribute('data-xAxisType');
		}
		if(jqDom.getAttribute('data-symbolSize') != undefined){
			ecdata.symbolSize = jqDom.getAttribute('data-symbolSize');
		}
		if(jqDom.getAttribute('data-lineSmooth') != undefined){
			ecdata.lineSmooth = jqDom.getAttribute('data-lineSmooth');
		}
		if(jqDom.getAttribute('data-yAxisMin') != undefined){
			ecdata.yAxisMin = jqDom.getAttribute('data-yAxisMin');
		}
		if(jqDom.getAttribute('data-yAxisMax') != undefined){
			ecdata.yAxisMax = jqDom.getAttribute('data-yAxisMax');
		}
		if(jqDom.getAttribute('data-xAxisMin') != undefined){
			ecdata.xAxisMin = jqDom.getAttribute('data-xAxisMin');
		}
		if(jqDom.getAttribute('data-xAxisMax') != undefined){
			ecdata.xAxisMax = jqDom.getAttribute('data-xAxisMax');
		}
		if(jqDom.getAttribute('data-xAxisRotate') != undefined){
			ecdata.xAxisRotate = jqDom.getAttribute('data-xAxisRotate');
		}
		if(jqDom.getAttribute('data-yAxisRotate') != undefined){
			ecdata.yAxisRotate = jqDom.getAttribute('data-yAxisRotate');
		}
		if(jqDom.getAttribute('data-lineShadow') != undefined){
			ecdata.lineShadow = jqDom.getAttribute('data-lineShadow');
		}
		if(jqDom.getAttribute('data-tooltipAxisPointer') != undefined){
			ecdata.tooltipAxisPointer = jqDom.getAttribute('data-tooltipAxisPointer');
		}
		if(jqDom.getAttribute('data-barWidth') != undefined){
			ecdata.barWidth = jqDom.getAttribute('data-barWidth');
		}
		if(jqDom.getAttribute('data-color') != undefined){
			ecdata.color = jqDom.getAttribute('data-color');
		}
		if(jqDom.getAttribute('data-yAxisTick') != undefined){
			ecdata.yAxisTick = jqDom.getAttribute('data-yAxisTick');
		}
		if(jqDom.getAttribute('data-xAxisTick') != undefined){
			ecdata.xAxisTick = jqDom.getAttribute('data-xAxisTick');
		}
		if(jqDom.getAttribute('data-funnelWidth') != undefined){
			ecdata.funnelWidth = jqDom.getAttribute('data-funnelWidth');
		}
		if(jqDom.getAttribute('data-funnelPos') != undefined){
			ecdata.funnelPos = jqDom.getAttribute('data-funnelPos');
		}
		if(jqDom.getAttribute('data-pieCenter') != undefined){
			ecdata.pieCenter = jqDom.getAttribute('data-pieCenter');
		}
		//事件绑定
		if(jqDom.getAttribute('data-click') != undefined){
			ecdata.onClick = jqDom.getAttribute('data-click');
		}
		if(jqDom.getAttribute('data-mousemove') != undefined){
			ecdata.onMousemove = jqDom.getAttribute('data-mousemove');
		}
		if(jqDom.getAttribute('data-mouseout') != undefined){
			ecdata.onMouseout = jqDom.getAttribute('data-mouseout');
		}
		if(jqDom.getAttribute('data-load') != undefined){
			ecdata.onLodad = jqDom.getAttribute('data-load');
		}	
		return ecdata;
	};
	//事件处理
	PoinEchart.prototype.setEvent = function(){
		var self = this;
		var _clickFun = self.bd._clickFun,
			_onLodadFun = self.bd._onLodad,
			_optionsList = self._options,
			_resDataList = self.resData,
			_mousemoveFun = self.bd._mousemoveFun;
		window.ecClickFun = this.vueObjs[_clickFun]
		window.onLodadFun = this.vueObjs[_onLodadFun]
		window.ecMousemoveFun = this.vueObjs[_mousemoveFun]
//		var eventFn = this.echartsObj.echarts.init(self._renderTo); //事件对象
		var eventFn = this.echartsObj.init(self._renderTo); //事件对象
		//单机事件
		if(typeof this.vueObjs[_clickFun] === 'function'){
			eventFn.on('click',function(params){		
				window.ecClickFun.call(this,params,this);
			})
		}
		//渲染完成事件
		if(typeof this.vueObjs[_onLodadFun] === 'function'){
			eventFn.on('finished',onLodadFun(self,_optionsList,_resDataList,eventFn));
		}
		//移入事件
		if(typeof this.vueObjs[_mousemoveFun] === 'function'){
			eventFn.on('mousemove',function(params){				
				window.ecMousemoveFun.call(this,params,this);				
			})
		}
		
	};
	//工具栏---------配置---start
	PoinEchart.prototype.setToolBox = function(brushFlag,toolBoxFlag){
		var self = this;
		var options = self._options;
		var database = self.bd;
		//区域选择工具栏配置
		if(brushFlag === "true"){
			options.brush = {toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],xAxisIndex: 0};
		}else{
			options.brush = null;
		}
//		基本工具栏配置
		if(toolBoxFlag === "true"){
			options.toolbox.show = true;
			if(database._toolBoxPos[0].length !== 0){
				options.toolbox.top = database._toolBoxPos[0];
			}else{
				delete options.toolbox.top;
			}
			if(database._toolBoxPos[1].length !== 0){
				options.toolbox.right = database._toolBoxPos[1];
			}else{
				delete options.toolbox.right;
			}
			if(database._toolBoxPos[2].length !== 0){
				options.toolbox.bottom = database._toolBoxPos[2];
			}else{
				delete options.toolbox.bottom;
			}
			if(database._toolBoxPos[3].length !== 0){
				options.toolbox.left = database._toolBoxPos[3];
			}else{
				delete options.toolbox.left;
			}
			options.toolbox.orient = database._toolBoxOrient;
			options.toolbox.feature = {
		            dataView : self._toolBoxSetData.ecdataview || null,
		            restore : self._toolBoxSetData.ecrestore || null,
		            saveAsImage : self._toolBoxSetData.ecsaveimage || null,
		            dataZoom:self._toolBoxSetData.ecdatazoom || {show:false},
		            magicType:self._toolBoxSetData.eclinebar || self._toolBoxSetData.ecstacktiled
			}
				}else{
			options.toolbox.show = false;
		  }
	}
	//	图列配置
	PoinEchart.prototype.setLegend = function(legendFlag){
		var self = this;
		var options = self._options;
		var database = self.bd;
		if(legendFlag === "true"){
			if(database._legendPos === "bottom"){
				options.legend = {x:'center',y:'bottom',data:database._legendData,orient:database._legendOrient};
			}else{
				options.legend = {data:database._legendData,orient:database._legendOrient,left:database._legendPos};				
			}
		}else{
			options.legend = null;
		}	
	}	
	//图表间距设置
	PoinEchart.prototype.setGrid = function(gridArr){
		var self = this;
		var options = self._options;
		if(gridArr[0].length !== 0){
			options.grid.top = gridArr[0];
			options.grid.containLabel = true;
		}else{
			delete options.grid.top;
			delete options.grid.containLabel;
		}
		if(gridArr[1].length !== 0){
			options.grid.right = gridArr[1];
			options.grid.containLabel = true;
		}else{
			delete options.grid.right;
			delete options.grid.containLabel;
		}
		if(gridArr[2].length !== 0){
			options.grid.bottom = gridArr[2];
			options.grid.containLabel = true;
		}else{
			delete options.grid.bottom;
			delete options.grid.containLabel;
		}
		if(gridArr[3].length !== 0){
			options.grid.left = gridArr[3];
			options.grid.containLabel = true;
		}else{
			delete options.grid.left;
			delete options.grid.containLabel;
		}
	}
	PoinEchart.prototype.toolTipFormatter = function(formaterType){
		var self = this;
		var database = self.bd;
		var options = self._options;
		var resData = self.resData;
		if( typeof window[formaterType] === 'function'){
			options.tooltip.trigger = database._toolTipTriger;
			options.tooltip.formatter = window[formaterType];
		}else{
			options.tooltip.formatter = formaterType;
			options.tooltip.trigger = database._toolTipTriger;
			delete options.tooltip.triggerOn;
		}	
	}
	/*
	 * parmas vueObjs ------vue对象
	 * parmas vueRef----要渲染的dom元素
	 * parmas echartsObj ------echarts对象
	 * parmas resData ------后台返回数据结构
	 * parmas newoption ------要覆盖的option
	 * */
	export function PoinEcharts(vueObjs,vueRef,echartsObj,resData,newoption){
		if(typeof(resData) == "undefined"){
			throw new Error("\u81F3\u5C11\u4F20\u9012\u4E00\u4E2A\u53C2\u6570");
		}
		if(vueRef instanceof  HTMLElement){
			if(newoption){		
				if(vueRef.getAttribute('data-ec') === 'poin-echarts'){
					_ecOne(vueObjs,vueRef,echartsObj,resData).setOption(newoption).render()					
				}
			}else{			
				if(vueRef.getAttribute('data-ec') === 'poin-echarts'){
					_ecOne(vueObjs,vueRef,echartsObj,resData).render()					
				}					
			}
			
		}else{			
			throw new Error("\u8BE5\u5BF9\u8C61\u4E0D\u662Fdom\u5BF9\u8C61\uFF0C\u8BF7\u4F20\u9012\u4E00\u4E2Adom\u5BF9\u8C61");
		}		
		function _ecOne(vueObjs,vueRef,echartsObj,resData){
			var echartEle = vueRef
			var echart =  new PoinEchart(vueObjs,echartsObj,echartEle,resData);
			var database = echart.processEchartBashData(echartEle);		
			var resData = resData;
			var ecRender = echart._renderTo;
			var options = echart._options;
			var _renderTo = document.getElementById(database.id);//显示容器	
			var _toolTipFormater = echart.bd._toolTipFormater;
			//option拼接
			echart._renderTo = _renderTo; //传递dom节点
			options.title = {text:echart.bd._title,subtext:echart.bd._subTitle,left:echart.bd._titPos}; //拼接标题
			//设置背景色
			if(echart.bd._chartBg !== undefined  ){
				if(echart.bd._chartBg === ''){					
					delete options.backgroundColor;
				}else{					
					options.backgroundColor = echart.bd._chartBg;					
				}				
			}	
			//设置图表颜色			
			if(echart.bd._chartColor !== undefined  ){
				if(echart.bd._chartColor === ''){					
					delete options.color;
				}else{
					options.color = (echart.bd._chartColor.length !== 0) ? echart.bd._chartColor.split(",") : delete options.color;					
				}				
			}			
			//事件配置
			echart.setEvent();
			//图列配置
			echart.setLegend(echart.bd._isLegend);
			//工具栏配置
			echart.setToolBox(echart.bd._isToolBoxBrush,echart.bd._isToolBox);
			
			//toolTip格式化
			echart.toolTipFormatter(_toolTipFormater);
			//图表渲染		
			echart.drawEchart(echart.bd._typeChild,echart.bd._seriesd);
			return echart;						
		}
	}