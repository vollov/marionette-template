var XApp = Mn.Application.extend({
	initialize : function(options) {
		console.log('My container:', options.container);
	}
});

// Create our Application
var MyApp = new XApp({
	container : '#app'
});

// var MyApp = Marionette.Application.extend({
// initialize: function(options) {
// console.log('My container:', options.container);
// }
// });

// Start history when our application is ready
// app.on('start', function() {
// Backbone.history.start();
// });

// Load some initial data, and then start our application
// loadInitialData().then(app.start);

MyApp.Contact = Backbone.Model.extend({});

MyApp.ContactCollection = Backbone.Collection.extend({
	model : MyApp.Contact,
	comparator : "firstName"
});

MyApp.ContactItemView = Mn.ItemView.extend({
	tagName : "li",
	template : "#contact-list-item"
});

MyApp.ContactsView = Mn.CollectionView.extend({
	tagName : "ul",
	childView : MyApp.ContactItemView
});

// MyApp.ContactView = Mn.ItemView.extend({
// template : "#contact-template"
// });

MyApp.addRegions({
	mainRegion : "#main-region"
});

// MyApp.StaticView = Mn.ItemView.extend({
// template : "#static-template"
// });
//
// var AppLayoutView = Mn.LayoutView.extend({
// template : "#layout-view-template",
//
// regions : {
// menu : "#menu",
// content : "#content"
// }
// });

MyApp.on("start", function(options) {
	console.log("on:start");
	// var staticView = new MyApp.StaticView();
	// MyApp.mainRegion.show(staticView);

	var contacts = new MyApp.ContactCollection([ {
		firstName : "Bob",
		lastName : "Brigham",
		phoneNumber : "555-0163"
	}, {
		firstName : "Alice",
		lastName : "Arten",
		phoneNumber : "555-0184"
	}, {
		firstName : "Charlie",
		lastName : "Campbell",
		phoneNumber : "555-0129"
	} ]);

	var contactsView = new MyApp.ContactsView({
		collection : contacts
	});

	MyApp.mainRegion.show(contactsView);

	if (Backbone.history) {
		Backbone.history.start();
	}
});

MyApp
		.on(
				"before:start",
				function(options) {
					console.log("before:start=>" + options.something);
					options.moreData = "Yo dawg, I heard you like options so I put some options in your options!";
				});

var options = {
	something : "some value",
	another : "#some-selector"
};

MyApp.start(options);