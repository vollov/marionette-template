AppManager.module("UserApp.Edit", function(Edit, AppManager, Backbone, Marionette, $, _) {
	Edit.Controller = {
		editUser : function(id) {
			//var user = AppManager.request("user:entity", id);

			console.log('Edit.Controller.editUser(), id =' + id);
			
			// fetch from cache
			var users = AppManager.request("user:entities");
			var user = users.get(id);
			
			var view;
			if (user !== undefined) {
				view = new Edit.User({
					model : user
				});
				
				view.on("form:submit", function(data) {
					console.log("edit controller form submitted");
					if (user.save(data)) {
						//AppManager.trigger("user:show", user.get("id"));
						AppManager.trigger("users:list");
					} else {
						view.triggerMethod("form:data:invalid",
								user.validationError);
					}
				});
				
			} else {
				view = new AppManager.UserApp.Show.MissingUser();
			}

			AppManager.regions.main.show(view);
		}
	};
});
