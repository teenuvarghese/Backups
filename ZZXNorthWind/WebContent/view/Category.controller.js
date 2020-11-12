sap.ui.controller("com.north.view.Category", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Category
*/
	onInit: function() {
		var oComponent = this.getOwnerComponent();
		this._router = oComponent.getRouter();
		this._router.getRoute("category").attachMatched(this._loadCategory, this);
},
_loadCategory : function(oEvent){
	var catId = oEvent.getParameter("arguments").path;
	var catName =oEvent.getParameter("arguments").catname;
	this.getView().byId("page").setTitle(catName);
},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Category
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Category
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Category
*/
//	onExit: function() {
//
//	}

});