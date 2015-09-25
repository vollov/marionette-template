AppManager.module("UserApp.List", function(List, AppManager, Backbone, Marionette, $, _){

	List.Controller = {
		listUsers : function() {
			var users = AppManager.request("user:entities");

			var usersListView = new List.Users({
				collection : users
			});

			usersListView.on("childview:user:show", function(childView,
					model) {
				AppManager.trigger("user:show", model.get("id"));
			});
			
			usersListView.on("childview:user:edit", function(childView,
					model) {
				AppManager.trigger("user:edit", model.get("id"));
			});

			usersListView.on("childview:user:delete", function(childView,
					model) {
				//users.remove(model);
				model.destroy({
					  success: function () {
						  //this.$el.fadeOut();
						  console.log('model user destroyed');
					  }
				});
			});

			AppManager.regions.main.show(usersListView);
		}
	}
});