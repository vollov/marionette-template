var MyApp = new Mn.Application();

MyApp.User = Backbone.Model.extend({});

MyApp.UserCollection = Backbone.Collection.extend({
	model : MyApp.User,
	comparator : 'name'
});

MyApp.UserItemView = Mn.ItemView.extend({
	tagName : 'tr',
	template : '#user-list-item',
	
	events: {
		'click': 'highlightName',
		'click button.js-delete': 'deleteClicked'
	},
	
	highlightName: function(e){
		//e.preventDefault();
		this.$el.toggleClass('warning');
	},
	
	deleteClicked : function(e) {
		e.stopPropagation();
		//alert('delete button was clicked');
		//this.model.collection.remove(this.model);
		this.trigger("user:delete", this.model);
	}
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

MyApp.on('start', function(options) {
	// controller's function
	var users = new MyApp.UserCollection([ {
		name : 'Bob',
		email : 'Brigham',
		role : '555-0163'
	}, {
		name : 'Alice',
		email : 'Arten',
		role : '555-0184'
	}, {
		name : 'Charlie',
		email : 'Campbell',
		role : '555-0129'
	} ]);

	var usersView = new MyApp.UsersView({
		collection : users
	});

	usersView.on("childview:user:delete", function(childView, model){
		users.remove(model);
	});

	MyApp.regions.main.show(usersView);

	if (Backbone.history) {
		Backbone.history.start();
	}
});

MyApp.start();