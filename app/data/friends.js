 $(document).ready(function() {
    $('select').material_select();
    $('.modal').modal();
  });

var scores = [];
var yourMatch;

 $("a.btn-large").on("click", function(){
 	window.location.href = '/survey';
 });

$(".submit").on("click", function(){
	var userName = $(".validate").val();
	
	var userScoreInput;
	

      event.preventDefault();

      var userInputs = $('.select > option:selected').each(function() {
    	scores.push($(this).val());
    	console.log($(this).val());
    	
    	//console.log(userInputs);
	});

      var userResponses = scores.map(Number);
      var userTotalResponse = userResponses.reduce(function(sum, value) {
      return sum + value; }, 0);


        var newCharacter = {
        name: userName,
        scores: scores,
        totalScore: userTotalResponse
        
      };

       var userInputName = newCharacter.name;
       var usersTotalScore = newCharacter.totalScore;


        var currentURL = window.location.origin;
      $.ajax({ url: currentURL + "/all", method: "GET" })
      .done(function(tableData) {
        // Here we are logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + currentURL + "/all");
        console.log("------------------------------------");
        // Here we then log the NYTData to console, where it will show up as an object.
        console.log(tableData);
        //console.log(tableData[0].name);

        var userTotalScoreArray = [];
        var apitotalscoreArray = [];

        for (var i = 0; i < tableData.length; i++) {
          
          var apiUserName = tableData[i].name;
          var userscores = tableData[i].scores;
          var userScoresInt = userscores.map(Number);
          var total = userScoresInt.reduce(function(sum, value) {
            return sum + value; }, 0);
          userTotalScoreArray.push(total);
          var apiScores = tableData[i].totalScore;
          // var apiscoreInt = apiScores.map(Number);
          apitotalscoreArray.push(apiScores);

        }

              var counts = apitotalscoreArray;
              var matchGoal = usersTotalScore;

              console.log("these are all user scores " + counts);
              console.log("this is the score you need to find closest to " + matchGoal);


              if (apitotalscoreArray.length != 0) {
              var closest = counts.reduce(function(prev, curr) {
                return (Math.abs(curr - matchGoal) < Math.abs(prev - matchGoal) ? curr : prev);
                return; 
              });
          }

              console.log("The closest score is " + closest);


              for (var i = 0; i < tableData.length; i++) {
                if (tableData[i].totalScore == closest) {
                  console.log("Your match is: " + tableData[i].name);
                  yourMatch = tableData[i].name;
                  userResults();
                  $('#modal1').modal();
                  $('#modal1').modal("open");
                  $(".submit").hide();
                }
              }

             $.post("/api/new", newCharacter)
            .done(function(data) {
              console.log(data);
              alert("Adding character...");

              
            });

            //userResults();

        //}
        // if (userInputName != userName && userTotalResponse == total) {

        //     console.log("Your match is: " + userName);
        //     console.log("usertotalscorearray: " + userTotalScoreArray);
        //     return;
        //   } else if (userInputName != userName && userTotalResponse != total) {

        //console.log("api result scores" + apitotalscoreArray);
     });//(ajaxend)
    //}
});


var userResults = function () {
  console.log("hi");
  $("h4").append("The Results Are In!");
  $("p").append("Your Match is: " + yourMatch + "!" );
}

var emptyResults = function () {
  $("h4").empty();
  $("p").empty();
}

	
