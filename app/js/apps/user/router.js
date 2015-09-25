AppManager.module("UserApp", function(UserApp, AppManager, Backbone, Marionette, $, _){
	UserApp.Router = Mn.AppRouter.extend({
		appRoutes : {
			"user" : "listUsers",
			"user/:id" : "showUser",
			"user/:id/edit": "editUser"
		}
	});

	var controller = {
		listUsers : function() {
			UserApp.List.Controller.listUsers();
		},

		showUser : function(id) {
			UserApp.Show.Controller.showUser(id);
		},
		
	    editUser: function(id){
	        UserApp.Edit.Controller.editUser(id);
	    }
	};

	AppManager.on("users:list", function() {
		console.log('event users:list fire');
		AppManager.navigate("user");
		controller.listUsers();
	});

	AppManager.on("user:show", function(id) {
		console.log('event user:show fire');
		AppManager.navigate("user/" + id);
		controller.showUser(id);
	});
	
	AppManager.on("user:edit", function(id) {
		console.log('event user:edit fire');
		AppManager.navigate("user/" + id + "/edit");
		controller.editUser(id);
	});

	UserApp.on("start", function() {
		console.log('UserApp start');
		new UserApp.Router({
			controller : controller
		});
	});
});