// William Labadie Moseley, UMass Lowell Computer Science, wmoseley@cs.uml.edu Copyright (c) 2019 by William Labadie Moseley.
// All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
// updated by WLM on December 1, 2019 at 12:00 PM

/* -------------------------------------------------------*/
//This file is for error checking and communicating with the user
/* -------------------------------------------------------*/

// Source: https://stackoverflow.com/questions/17548520/dynamically-adding-a-tab-on-button-click
function makeTab(){
  var tabs = $("#tabs").tabs();
  var ul = tabs.find( "ul" );
  var tabUl = document.getElementById('tabList');
  lenChildren = (tabUl.childNodes.length);
  // var current_idx = ul.find("li").length + 1; // Get correct index for id
  var current_idx = lenChildren;
  // console.log(current_idx); //debug
  $("<li><a href='#tabs-" + current_idx + "'> save #" + current_idx + "</a></li>" ).appendTo( ul );
  var myTable = document.getElementById('created').cloneNode(true);
  myTable.id = "pic-" + current_idx;
  // tabs.append("<div id='tabs-" + current_idx + "'>" + myTable + "</div>");
  tabs.append("<div id='tabs-" + current_idx + "'>");
  tabs.append(myTable);
  tabs.append("</div>");
  tabs.tabs("refresh");
  // tabs.tabs("select", 2);
}

function deleteTabs(){
  var tabs = $("#tabs").tabs();
  var ul = tabs.find( "ul" );
  var tabUl = document.getElementById('tabList');
  var current_idx = ul.find("li").length;
  for (i = current_idx; i > 0; i--){
    console.log(current_idx); //
    // $('#tabs-' + i).remove();
    $('#pic-' + i).remove();
    // tabUl.remove();
    // ul.find("li").empty;
  }
  tabs.tabs("refresh");
  // $("#tabs").load(get(location.href) + " #tabs");
}

//iterate through input boxes, checking each for invalid input
function myValidate() {
  var inputs = ["rStart", "rEnd", "cStart", "cEnd"]
  var names = ["Row starting Number", "Row ending number",
   "Column starting number", "Column ending number"]
  var error = false;
  for (i = 0; i < inputs.length; i++){
    //console.log($("#" + inputs[i]).val());
    if ($("#" + inputs[i]).val() >= 99 || $("#" + inputs[i]).val() <= -99){
      // flash(inputs[i]);
      error = true;
    }
    else if ($("#" + inputs[i]).val() == ""){
      // flash(inputs[i]);
      error = true;
    }
    //so the user doesn't get flooded with errors
    if (error){
      flash(inputs[i]);
      $("#alarmmsg").fadeIn()
      .html("Please enter a valid (non-empty) integer number between -99 and 99 in the " + names[i] + " field");
      break;
    }
    else{
      unflash(inputs[i]);
    }
  }

  //keeps the alarm message from fading in and out aggressively
  if(!error){
    $("#alarmmsg").fadeOut(3000);
  }

  //if there'a already a created table
  //delete it so user doesn't think input was correct
  if (error){
    if ($("#created")){
      $("#created").remove();
    }
  }

  //allow saving table if there are no errors
  if (!error){
    $("#saveButton").attr("onclick","makeTab()");
  }
  return error;
}

function flash(elementID){
  $("#" + elementID).css("border-color","red");
}

function unflash(elementID){
  $("#" + elementID).css("border-color","black");
}

$(function(){
  //prevent invalid keypresses
  $(".form-control").keypress(function(event) {
    //0=null,8=backspace,45=negative sign, 48-57 for 0-9 numbers.
    //(Stackoverflow.com: "How to block +,-,e in inputer type number")
    if (event.which != 8 && event.which != 0 && event.which != 45 && (event.which < 48 || event.which > 57)){
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

});
