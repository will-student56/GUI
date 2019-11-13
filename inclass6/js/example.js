// ADD NEW ITEM TO END OF LIST
var ul = document.getElementsByTagName('ul')[0];
var last_li = document.createElement('li');
last_li.appendChild(document.createTextNode("cream"));
//last_li.setAttribute("id", "att_name");
ul.appendChild(last_li);

// ADD NEW ITEM START OF LIST
var first_li = document.createElement('li');
first_li.appendChild(document.createTextNode("kale"));
ul.insertBefore(first_li, ul.childNodes[0]);


// ADD A CLASS OF COOL TO ALL LIST ITEMS
var li = document.getElementsByTagName('li');
for (i = 0; i < li.length; i++){
  li[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var header = document.getElementsByTagName('h2')[0];
console.log(header);
var item_count = " (" + String(li.length) + ")";
header.innerHTML += item_count;
