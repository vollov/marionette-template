AppManager.module("UserApp.List", function(List, AppManager, Backbone, Marionette, $, _) {

	List.User = Mn.ItemView.extend({
		tagName : "tr",
		template : "#user-list-item",

		events : {
			"click" : "highlightName",
			"click td a.js-show" : "showClicked",
			"click td a.js-edit": "editClicked",
			"click button.js-delete" : "deleteClicked"
		},

		highlightName : function(e) {
			this.$el.toggleClass("warning");
		},

		showClicked : function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger("user:show", this.model);
		},

		deleteClicked : function(e) {
			e.stopPropagation();
			this.trigger("user:delete", this.model);
		},

		editClicked : function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger("user:edit", this.model);
		},
		    
		remove : function() {
			var self = this;
			this.$el.fadeOut(function() {
				Mn.ItemView.prototype.remove.call(self);
			});
		}
	});

	List.Users = Mn.CompositeView.extend({
		tagName : "table",
		className : "table table-hover",
		template : "#user-list",
		childView : List.User,
		childViewContainer : "tbody"
	});
});
