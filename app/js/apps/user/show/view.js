AppManager.module("UserApp.Show", function(Show, AppManager, Backbone, Marionette, $, _) {
	Show.MissingUser = Mn.ItemView.extend({
		template : "#missing-user-view"
	});

	Show.User = Mn.ItemView.extend({
		template : "#user-view",
			
		events: {
			"click a.js-edit": "editClicked"
		},
		

		editClicked : function(e) {
			console.log('fire event user:edit from Show.User view');
			e.preventDefault();
			this.trigger("user:edit", this.model);
		}
	});
	
	

});