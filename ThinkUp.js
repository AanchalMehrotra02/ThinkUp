Comments = new Mongo.Collection("comments");

if (Meteor.isClient) {
    
    Accounts.ui.config({
    	passwordSignupFields: "USERNAME_AND_EMAIL"
  	});

    Template.mainPage.helpers({
        comments: function () {
          return Comments.find({},{sort: {createdAt: -1}});
        },

        totalcomments: function(){
          var currentUserId = Meteor.userId();
        	return Comments.find({owner: currentUserId}).count();
        },
        ownComments: function(){
        var currentUserId = Meteor.userId();
        return Comments.find({owner: currentUserId},
                            {sort: {createdAt: -1},limit: 5});
        }
      });

    Template.mainPage.events({
        "submit .new-comment": function (event) {
          event.preventDefault();
     
          var text = event.target.text.value;
     
          Comments.insert({
            text: text,
            createdAt: new Date(),            
        	  owner: Meteor.userId(),           
        	  username: Meteor.user().username 
          });
     
          event.target.text.value = "";
        },
        "click .delete": function () {
     Comments.remove(this._id);
       }
      });
    }


