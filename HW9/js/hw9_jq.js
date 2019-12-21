// William Labadie Moseley, UMass Lowell Computer Science, wmoseley@cs.uml.edu Copyright (c) 2019 by William Labadie Moseley.
// All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
// updated by WLM on December 19, 2019 at 12:00 PM


//global var
var global_json;
var current_tiles = [];
var current_boxes = [];
var score = 0;

//NOTE: update global
function update_tiles(something){
  current_tiles.push(something);
  // console.log(current_tiles); //debug
}

//NOTE: update global
function update_boxes(something){
  current_boxes.push(something);
  // console.log(current_boxes); //debug
}

//NOTE:swaps triple word 'box' value & associated 'tile' value in their arrays
//NOTE:with the values at the end of the arrays for proper score calculation
function adjustForTripleWord(){
  // console.log("current_boxes before swap: " + current_boxes);
  for (var i = 0; i < current_boxes.length - 1; i++){
    if (current_boxes[i] != undefined && current_boxes[i][13] == 'w'){
      var tempBox,tempTile;
      tempBox = current_boxes[current_boxes.length - 1];
      current_boxes[current_boxes.length - 1] = current_boxes[i];
      current_boxes[i] = tempBox;

      tempTile = current_tiles[current_tiles.length - 1];
      current_tiles[current_tiles.length - 1] = current_tiles[i];
      current_tiles[i] = tempTile;
    }
  }
  // console.log("current_boxes after swap: " + current_boxes);
}

//NOTE:Tallys the score based on tiles used, checking for special boxes
//NOTE:then updates the score html and resets the global variables
function tally(){
  adjustForTripleWord();
  var running_total = 0;
  var triple_word = false;
  var triple_letter = false;
  var value = 0;
  // console.log(current_tiles); //
  // console.log(current_boxes); //
  for (var i = 0; i < current_tiles.length; i++){
    var letter = current_tiles[i][20];
    for (var j = 0; j < 27; j++){
      if (global_json['pieces'][j]['letter'] == letter){
        value = global_json['pieces'][j]['value'];
        if (current_boxes[i] != undefined){
          // console.log("defined box"); //
          if (current_boxes[i][13] == 'w'){
            // console.log("triple word");
            triple_word = true; //
          }
          else{
            // console.log("triple letter"); //
            triple_letter = true;
          }
        }
      }
    }
    // console.log("running_total before updates: " + running_total)
    if (triple_word){
      // console.log("value before triple_word: " + value); //
      running_total = ((running_total + value) * 3);
      // console.log("value after triple_word: " + running_total); //
      triple_word = false;
    }
    else if (triple_letter){
      // console.log("value before triple_letter: " + value);
      running_total = running_total + (value * 3);
      // console.log("value after triple_letter: " + running_total);
      triple_letter = false;
    }
    else{
      // console.log("value before normal update: " + value);
      running_total += value;
      // console.log("value after normal update: " + running_total);
    }
    value = 0;
  }
  score += running_total;
  current_tiles = [];
  current_boxes = [];
  $("#score").html(score);
}

//NOTE: saves json into a global variable
function loadJson(json){
  global_json = json;
}

//NOTE: resets the draggable & droppable elements to be used for another game
function refresh(){
  console.log()
  tally();
  $("#_body").load(location.href + " #_body");
  $("#_body2").load(location.href + " #_body2");
  main();
}

//NOTE: attaches tile images to draggables after clearing them
function loadTiles(list){
  for (var i = 1; i <= 7; i++){
    $('#tile' + i + '_img').empty();
    $('#tile' + i + '_img').append('<img src="Tiles/Scrabble_Tile_' + list[i-1] + '.jpg" height="100px" width="100px">');
  }
}

//NOTE: didn't work on chrome but did work on safari for god only knows why
//NOTE: loads json, gets 7 random tiles, and passes them to loadTiles
function setTiles(){
  $.getJSON( "json/scrabble_pieces.json", function( json ) {
    //rand = random(0,27)
    loadJson(json);
    var list = []
    for (var i = 0; i < 7; i++){
      var rand = Math.floor((Math.random() * 27));
      // console.log(json['pieces'][rand]['letter']); //debug
      var letter = json['pieces'][rand]['letter'];
      list += letter;
    }
    // console.log(list); //debug
    loadTiles(list);
  });
}

//Draggable-NOTE: sets draggables so they go back to their original position
//Draggable-NOTE: if not put into a droppable, and makes them snap into place
//Droppable-NOTE: uses drop event to save both the tile and box info in globals
//Droppable-NOTE: and disables movement of draggable inside it to keep calculations static
function main(){
  // Source: http://www.pureexample.com/jquery-ui/draggable-snap-to.html
  // Source: https://stackoverflow.com/questions/5735270/revert-a-jquery-draggable-object-back-to-its-original-container-on-out-event-of
  //draggables: snap to inner and go back to original location if not in droppable
  $( ".my_drag" ).draggable({
    revert : function(event, ui) {
                $(this).data("uiDraggable").originalPosition = {
                  top : 0,
                  left : 0
                };
                return !event;
              },
    snap: ".my_drop",
    snapMode:"inner",
    snapTolerance: 70
  });

  //Source: https://stackoverflow.com/questions/31180439/jquery-draggable-droppable-change-snap
  //droppables: accept and disable first draggable that it finds
  $('.my_drop').droppable({
    drop: function(event, ui, current) {
      // console.log(ui.draggable.find("img").attr("src"));
      update_tiles(ui.draggable.find("img").attr("src"));
      update_boxes($(this).find("img").attr("src"));
      $(this).droppable('option', 'accept', ui.draggable);
      this.draggable("disable");
    },
  });

  setTiles();
}

//NOTE: sets async to false then calls main.
//NOTE: My refresh functions weren't working until i turned async off
$( function() {
  $.ajaxSetup({ async:false});
  main();
});
