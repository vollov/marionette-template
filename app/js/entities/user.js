AppManager.module("Entities", function(Entities, AppManager, Backbone, Marionette, $, _){



	Entities.User = Backbone.Model.extend({
		urlRoot: '/api/t/user',
		

		validate : function(attrs, options) {
			var errors = {}
			if (!attrs.name) {
				errors.name = "can't be blank";
			}
			if (!attrs.email) {
				errors.email = "can't be blank";
			} else {
				if (attrs.email.length < 2) {
					errors.email = "is too short";
				}
			}
			if (!_.isEmpty(errors)) {
				return errors;
			}
		},
	});

	Entities.UserCollection = Backbone.Collection.extend({
		url: '/api/t/user',
		model : Entities.User,
		comparator : "name"
	});

	var users;

	var initializeUsers = function() {
		users = new Entities.UserCollection();

		var defer = $.Deferred();
		users.fetch({
			success : function(data) {
				defer.resolve(data);
			}
		});
	    
		var promise = defer.promise();
	      $.when(promise).done(function(data){
	        if(fetchedContacts.length === 0){
	          // if we don't have any contacts yet, create some for convenience
	          var models = initializeContacts();
	          contacts.reset(models);
	        }
	      });
	      return promise;
	};

	var API = {
		getUserEntities : function() {
			//console.log('getUserEntities(), 1 users =' + users.length);
			// fetch as cache
			if (users === undefined) {
				initializeUsers();
			}
			
			console.log('getUserEntities(), 2 users =' + users.length);
			
//			var users = new Entities.UserCollection();
//			users.fetch();
			return users;
		},
		getUserEntity : function(id) {
			var user = new Entities.User({id: id});
			user.fetch();
			return user;
		}
	};

	AppManager.reqres.setHandler("user:entities", function() {
		return API.getUserEntities();
	});
	
	AppManager.reqres.setHandler("user:entity", function(id) {
		return API.getUserEntity(id);
	});
});
