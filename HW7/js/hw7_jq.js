// William Labadie Moseley, UMass Lowell Computer Science, wmoseley@cs.uml.edu Copyright (c) 2019 by William Labadie Moseley.
// All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
// updated by WLM on December 1, 2019 at 12:00 PM
$(function(){
  function flash(elementID){
    $("#" + elementID).fadeOut().fadeIn();
  }

  //prevent invalid keypresses
  $(".form-control").keypress(function(event) {
    //0=null,8=backspace,48-57 for 0-9 numbers.
    //(Stackoverflow.com: How to block +,-,e in inputer type number)
    if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)){
      event.preventDefault();
      $("#alarmmsg").fadeIn()
      .html("Invalid Keypress")
      .fadeOut();
    }
  });

  //prevent copy-cut/paste
  $(".form-control").on("cut copy paste", function(event){
    event.preventDefault();
    $("#alarmmsg").fadeIn()
    .html("Cut, copy, and paste are not allowed")
    .fadeOut(2500);
  });

  //iterate through input boxes, checking each for invalid input
  $("#submitButton").click(function(){
    var inputs = ["rStart", "rEnd", "cStart", "cEnd"]
    var names = ["Row starting Number", "Row ending number",
     "Column starting number", "Column ending number"]
    var error = false;
    for (i = 0; i < inputs.length; i++){
      console.log($("#" + inputs[i]).val());
      if ($("#" + inputs[i]).val() >= 99 || $("#" + inputs[i]).val() <= -99){
        flash(inputs[i]);
        $("#alarmmsg").fadeIn()
        .html("Please enter a valid integer number between -99 and 99 in the " + names[i] + " field")
        .fadeOut(3000);
        error = true;
      }
      else if ($("#" + inputs[i]).val() == ""){
        flash(inputs[i]);
        $("#alarmmsg").fadeIn()
        .html("Please enter a non-empty integer value in the " + names[i] + " field")
        .fadeOut(3000);
        error = true;
      }
      //so the user doesn't get flooded with errors
      if (error){ break; }
    }

    if (!error){
      //create table if there are no errors
      $("#submitButton").attr("onclick","main()");
    }
    else{
      //if there'a already a created table
      //delete it so user doesn't think input was correct
      if ($("#created")){
        $("#created").remove();
      }
    }
  });

});
