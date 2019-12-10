// William Labadie Moseley, UMass Lowell Computer Science, wmoseley@cs.uml.edu Copyright (c) 2019 by William Labadie Moseley.
// All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
// updated by WLM on December 1, 2019 at 12:00 PM

/* -------------------------------------------------------*/
//this file is for the page's functionality
/* -------------------------------------------------------*/


function autoMain() {
  var error = myValidate();
  if(!error){
    main();
  }
}

function main() {
  var rStart = parseInt(document.getElementById('rStart').value);
  var rEnd = parseInt(document.getElementById('rEnd').value);
  if (rStart > rEnd){
    //swaps rStart and rEnd
    rEnd = [rStart, rStart = rEnd][0];
  }
  var cStart = parseInt(document.getElementById('cStart').value);
  var cEnd = parseInt(document.getElementById('cEnd').value);
  if (cStart > cEnd){
    //swaps rStart and rEnd
    cEnd = [cStart, cStart = cEnd][0];
  }
  createTable(rStart, rEnd, cStart, cEnd);
}

function createTable(rStart, rEnd, cStart, cEnd) {
  var body = document.getElementsByTagName('body')[0];
  //if table already exists, destroy it
  if (document.getElementById('created')){
    old_table = document.getElementById('created');
    old_table.parentNode.removeChild(old_table);
  }
  var table = document.createElement('table');
  table.style.width = '100%';
  table.setAttribute('class', 'table');
  table.setAttribute('id', 'created');
  var tbody= document.createElement('tbody');

  //populate first row
  var tr = document.createElement('tr');
  var blankCell = tr.insertCell(0);
  blankCell.innerHTML = ' ';
  for (var i = rStart; i <= rEnd; i++){
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(i));
    td.style.fontWeight = 'bold';
    td.style.backgroundColor = 'teal';
    tr.appendChild(td);
  }
  tbody.appendChild(tr);

  //populate body of table
  for (var i = cStart; i <= cEnd; i++){
    var tr = document.createElement('tr');
    //next 2 lines populate first column
    var firstCell = tr.insertCell(0);
    firstCell.style.fontWeight = 'bold';
    firstCell.style.backgroundColor = 'teal';
    firstCell.innerHTML = i;
    for (var j = rStart; j <= rEnd; j++) {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(i*j));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  body.appendChild(table);
}

function initializeTextValues(){
  document.getElementById('rStart').value = 0;
  document.getElementById('rEnd').value = 0;
  document.getElementById('cStart').value = 0;
  document.getElementById('cEnd').value = 0;
}

// function makeTab(){
//   var tabUl = document.getElementById('tabList');
//   lenChildren = (tabUl.childNodes.length) - 2;
//   // console.log(lenChildren);
//   var tabLi = document.createElement('li');
//   tabLi.setAttribute('id', 'forTab');
//   // console.log('#tabs-' + String(lenChildren)); //
//   tabLi.setAttribute('href', '#tabs-' + String(lenChildren))
//   tabLi.innerHTML = "save #" + String(lenChildren);
//   tabUl.appendChild(tabLi);
//
//   var myTable = document.getElementById('created');
//
//   var tabDiv = document.getElementById('tabs');
//   var newDiv = document.createElement('div');
//   newDiv.setAttribute('id', 'tabs-' + String(lenChildren));
//   // newDiv.appendChild(myTable);
//   newDiv.innerHTML = "blah";
//   tabDiv.appendChild(newDiv);
// }
