AppManager.module("UserApp.Show", function(Show, AppManager, Backbone, Marionette, $, _) {
	Show.Controller = {
		showUser : function(id) {
			console.log('Show.Controller.showUser(), id =' + id);
			
			var users = AppManager.request("user:entities");
			console.log('Show.Controller.showUser(), users =' + users.length);
			// fetch from cache
			var model = users.get(id);
			var userView;
			if (model !== undefined) {
				userView = new Show.User({
					model : model
				});
				
				userView.on("user:edit", function(user){
					AppManager.trigger("user:edit", user.get("id"));
		        });
				
			} else {
				userView = new Show.MissingUser();
			}

			AppManager.regions.main.show(userView);
		}
	}
});