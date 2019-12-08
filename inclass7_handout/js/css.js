$(function() {
  var backgroundColor = $("#" + "one").css("background-color");

  //styling the appended rgb value
  $("<div></div>").attr('id',"JQ1").appendTo("#" + "page");
  $("#" + "JQ1").html("<h3>Color was: " + String(backgroundColor) + "</h3>");
  $("#" + "JQ1").css("height", "60px")
  $("#" + "JQ1").css("text-align", "center");
  $("#" + "JQ1 h3").css("border", "2px solid white");
  $("#" + "JQ1 h3").css("text-align", "center");
  $("#" + "JQ1 h3").css("border-radius:", "20px");
  $("#" + "JQ1 h3").css("background-color", "white");
  $("#" + "JQ1 h3").css("margin-left", "30px");
  $("#" + "JQ1 h3").css("margin-right", "30px");
  $("#" + "JQ1 h3").css("padding", "5px");
  $("#" + "JQ1 h3").css("color", "gray");

  //updating every <li> in the list
  $("li").each(function() {
    $(this).css("border", "1px solid white");
    $(this).css("background-color", "#c5a996");
    $(this).css("color", "black");
    $(this).css("text-shadow", "none");
    $(this).css("font-family", "Georgia");
  })
});
