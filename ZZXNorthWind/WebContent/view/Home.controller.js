sap.ui.controller("com.north.view.Home", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Home
*/
	onInit: function() {
		var oComponent = this.getOwnerComponent();
		this._router = oComponent.getRouter();
		this.oModel = oComponent.getModel();
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRouteMatched(this.onRouteMatched, this);
	},
	onRouteMatched : function(evt) {
		if ("home" !== evt.getParameter("name"))  {
			return;
		}
		var oThis = this;
		var arrCat =[];
		this.oModel.read("/Categories",null,null,false,function(oData,oResponse){
	     for(var i=0;i<oData.results.length;i++){
	    	 oThis.oModel.read("/Categories"+"("+oData.results[i].CategoryID+")"+"/Products",null,null,false,function(oChildData,oResponse){
	    			 var obj = {
	    					 CatId :  oData.results[i].CategoryID,
		    				 CatName : oData.results[i].CategoryName,
		    				 ProductsLength : oChildData.results.length,
		    		 }
	    			 arrCat.push(obj)
	    	 });
	     }
	     var oJson = new sap.ui.model.json.JSONModel(arrCat);
	     oThis.getView().byId("categoryList").setModel(oJson,"aCategory");
   });
	},
	handleProductListItemPress : function(oEvt){
		var oItem = oEvt.oSource.getBindingContext("aCategory");
		var catId = oItem.getObject().CatId; 
		var catName = oItem.getObject().CatName; 
		this._router.navTo("category",{path : catId,catname :catName});	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Home
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Home
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Home
*/
//	onExit: function() {
//
//	}

});