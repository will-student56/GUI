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

  var inputs = [rStart, rEnd, cStart, cEnd];
  var error = false;
  var msg = "Please keep the values between [-99,99]"
  for (i = 0; i < inputs.length; i++){
    if (inputs[i] >= 99 || inputs[i] <= -99){
      console.log("ERROR");
      error = true;
    }
  }
  if (error){
    document.getElementById('alarmmsg').innerHTML = msg;
    setTimeout(function(){
    document.getElementById("alarmmsg").innerHTML = '';
    }, 3000);
  }
  else{
    createTable(rStart, rEnd, cStart, cEnd);
  }
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
