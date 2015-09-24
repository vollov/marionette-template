var MyApp = new Mn.Application();

MyApp.User = Backbone.Model.extend({
	urlRoot: '/api/t/user',
});

MyApp.UserCollection = Backbone.Collection.extend({
	url: '/api/t/user',
	model : MyApp.User,
	comparator : 'name'
});

MyApp.UserItemView = Mn.ItemView.extend({
	tagName : 'tr',
	template : '#user-list-item',
	
	events: {
		'click': 'highlightName',
		"click td a.js-show": "showClicked",
		"click button": 'deleteClicked'
	},
	
	highlightName: function(e){
		e.preventDefault();
		this.$el.toggleClass('warning');
	},
	
    showClicked: function(e){
        e.preventDefault();
        e.stopPropagation();
//        this.trigger("user:show", this.model);
        this.trigger("user:show", this.model.get('id'));
        
    },
      
//	showContact: function(model){
//	      var contactView = new Show.Contact({
//	        model: model
//	      });
//
//	      MyApp.regions.main.show(usersView);
//	}
    
	deleteClicked : function(e) {
		e.stopPropagation();
		//alert("delete button was clicked");
		//this.model.collection.remove(this.model);
		
		this.model.destroy({
			  success: function () {
				  //this.$el.fadeOut();
				  console.log('model user destroyed');
			  }
		});
	},
});

MyApp.UserShowView = Mn.ItemView.extend({
	//model : MyApp.User,
	template: "#user-view",
	

});

MyApp.UsersView = Mn.CompositeView.extend({
	tagName: 'table',
	className: 'table table-hover',
	template: '#user-list',
	childView: MyApp.UserItemView,
	childViewContainer: 'tbody'
});

var RegionContainer = Mn.LayoutView.extend({
	el : '#app-container',
	regions : {
		main : '#main-region'
	}
});

MyApp.on('before:start', function(options) {
	MyApp.regions = new RegionContainer();	  
});

//================ Routing ==================

var routeController = {
	listUsers : function() {
		console.log("route to list users was triggered");
		
		var users = new MyApp.UserCollection();
		users.fetch();
		
		var usersView = new MyApp.UsersView({
			collection : users
		});

		usersView.on("childview:user:show", function(childView, model){
	        //ContactManager.ContactsApp.Show.Controller.showContact(model);
			console.log('user:show model=' + model);
			var userView = new MyApp.UserShowView({
	        	model : model
	        });
	        MyApp.regions.main.show(userView);
	    });
	    
		MyApp.regions.main.show(usersView);
	},

	showUser : function(){
		console.log('showUser');
		//.trigger("contact:show", model.get("id"));
		//MyApp.trigger("user:show", model);
	}
}

MyApp.Router = Mn.AppRouter.extend({
	// default routes
    appRoutes: {
      "users": "listUsers"
    },

	/* standard routes can be mixed with appRoutes/Controllers above */
	routes : {
	  "users/:id" : "showUser"
	},
	
	controller: routeController,
});


MyApp.on('before:start', function(options) {
	// setup region container (edited for brevity)

});

MyApp.on('start', function(options) {

	new MyApp.Router({
		controller: routeController
	});
	
	if (Backbone.history) {
		//Backbone.history.start();
		Backbone.history.start({pushState: true});
		
		if(Backbone.history.fragment === ""){
			Backbone.history.navigate("users");
			routeController.listUsers();
			//ContactManager.ContactsApp.List.Controller.listContacts();
		}
	}
});

MyApp.start();