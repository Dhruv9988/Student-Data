//Global Variables
var row = null;

function Submit() {
  var dataEntered = retrieveData();
  var readData = readFromLocal(dataEntered);
  if (dataEntered == false) {
    msg.innerHTML =  `<h3 style="color: red;">Please Enter Complete Data!</h3>`;
  } else {
    if (row == null) {
      insert(readData);
      msg.innerHTML = `<h3 style="color: lightgreen;">Data Inserted!</h3>`;
    } else {
      update();
      msg.innerHTML = `<h3 style="color: yellow;">Data Updated!</h3>`;
    }
  }
  document.getElementById("form").reset();
}

//CREATE
function retrieveData() {
  var name1 = document.getElementById("name").value;
  var roll = document.getElementById("roll").value;
  var branch = document.getElementById("branch").value;

  var arr = [name1, roll, branch];
  if (arr.includes("")) {
    return false;
  } else {
    return arr;
  }
}

//READ
//Date in LocalStorage
function readFromLocal(dataEntered) {
  //Storing in LS
  var n = localStorage.setItem("Name", dataEntered[0]);
  var r = localStorage.setItem("Roll No", dataEntered[1]);
  var b = localStorage.setItem("Branch", dataEntered[2]);

  //Getting from LS to Table
  var n1 = localStorage.getItem("Name", n);
  var r1 = localStorage.getItem("Roll No", r);
  var b1 = localStorage.getItem("Branch", b);

  var arr = [n1, r1, b1];
  return arr;
}

//INSERT
function insert(readData) {
  var row = table.insertRow();
  row.insertCell(0).innerHTML = readData[0];
  row.insertCell(1).innerHTML = readData[1];
  row.insertCell(2).innerHTML = readData[2];

  row.insertCell(3).innerHTML = `<button onclick = edit(this)> Edit </button> 
                                 <button onclick = remove(this)> Delete </button>`;
}

// //EDIT
function edit(td) {
  row = td.parentElement.parentElement;
  document.getElementById("name").value = row.cells[0].innerHTML;
  document.getElementById("roll").value = row.cells[1].innerHTML;
  document.getElementById("branch").value = row.cells[2].innerHTML;
}

// //UPDATE
function update() {
  row.cells[0].innerHTML = document.getElementById("name").value;
  row.cells[1].innerHTML = document.getElementById("roll").value;
  row.cells[2].innerHTML = document.getElementById("branch").value;

  row = null;
}

//DELETE
function remove(td) {
  var ans = confirm("Are you sure you want to delete this Entry?");
  if (ans == true) {
    row = td.parentElement.parentElement;
    document.getElementById("table").deleteRow(row.rowIndex);
  }
}
