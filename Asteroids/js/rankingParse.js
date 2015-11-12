var RankingParse = Class.extend({


  init: function(){
    Parse.initialize("PlHq0MUk90ZbnJSxqQCVktVlmLE6WJsJPybLUYeQ", "aaEOgPm7UXjwJLoqdYE0l8taqUseJCqUsv5pompE");

  },

  save: function(playerName, score) {
    var GameScore = Parse.Object.extend("GameScore");
    var gameScore = new GameScore();

    gameScore.set("score", score);
    gameScore.set("playerName", playerName);
  //	gameScore.set("cheatMode", false);

    gameScore.save(null, {
      success: function(gameScore) {
        // Execute any logic that should take place after the object is saved.
       // alert('New object created with objectId: ' + gameScore.id);
      },
      error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  },

  getScore: function(callback) {
    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    var objects = [];
    query.descending("score"); //ordenando em ordem decrescente o score

      query.find({
        success: function(results) {
          for (var i = 0,len = ((results.length < 5) ? results.length  : 5) ; i < len; i++) {
              var object = results[i];
              objects.push({playerName: object.get('playerName'), score: object.get('score')});

          }
          callback(objects);

        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
    });

  }

});
