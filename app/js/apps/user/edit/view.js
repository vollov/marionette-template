AppManager.module("UserApp.Edit", function(Edit, AppManager, Backbone, Marionette, $, _) {
	Edit.User = Mn.ItemView.extend({
		template : "#user-form",

		events : {
			"click button.js-submit" : "submitClicked"
		},
		
		submitClicked : function(e) {
			e.preventDefault();
			console.log("edit contact form submitted");
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
		},
		

		onFormDataInvalid : function(errors) {
			var $view = this.$el;

			var clearFormErrors = function() {
				var $form = $view.find("form");
				$form.find(".help-inline.error").each(function() {
					$(this).remove();
				});
				$form.find(".control-group.error").each(function() {
					$(this).removeClass("error");
				});
			}

			var markErrors = function(value, key) {
				var $controlGroup = $view.find("#user-" + key).parent();
				var $errorEl = $("<span>", {
					class : "help-inline error",
					text : value
				});
				$controlGroup.append($errorEl).addClass("error");
			}

			clearFormErrors();
			_.each(errors, markErrors);
		}
	});
});
