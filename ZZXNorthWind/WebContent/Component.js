sap.ui.core.UIComponent.extend("com.north.Component",{
	metadata:{
		config:{
			serviceConfig:{
				serviceUrl :"proxy/http/services.odata.org/Northwind/Northwind.svc",
			},
		},
		
		routing :{
			config:{
				viewType :"XML",  //View type of the view that is created, for example XML, JS or HTML*/
				viewPath :"com.north.view", //Prefix that is preceding the view
				controlId : "splitApp", //ID of the control that contains the views
				clearTarget : false, // Boolean; if set to true, the aggregation should be cleared before adding the View to it
				bypassed: {
					target: ["home"]
				}
			},
			routes :[
			        {
			          pattern :"",
			          name:"home",
			          target: "home"
			        },
			        {
				          pattern :"category/{path}/{catname}",
				          name:"category",
				          target: "categoryView"
				        }
			],
			targets: {
				categoryView: {
					viewName: "Category",
					viewLevel: 2,
					controlAggregation: "masterPages"
				},
				welcome: {
					viewName: "Welcome",
					viewLevel: 0,
					controlAggregation: "detailPages"
				},
				home:{
					viewName: "Home",
					viewLevel: 1,
					controlAggregation: "masterPages"
				},
			},
		},
	},
	init : function(){
		
		//---------Model Declare-------------------
		var serviceUrl = this.getMetadata().getConfig().serviceConfig.serviceUrl
		var oModel = new sap.ui.model.odata.ODataModel(serviceUrl,{
			json: true,
			loadMetadataAsync: true
		})
		this.setModel(oModel);
		
		//----Router Intializing----------------
		sap.ui.core.UIComponent.prototype.init.apply(this);
		var router = this.getRouter();
		router.initialize();
		//---Welcome Page Display-----------
		if (!sap.ui.Device.system.phone) {
			router.getTargets().display("welcome");
		}
	},
	createContent : function(){
		var oView = sap.ui.view({
			viewName : "com.north.view.App",
			type : sap.ui.core.mvc.ViewType.XML
		})
		return oView;
	},
});