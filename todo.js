var array = new Map();

function details() {
	var in1 = document.getElementById("input1").value;
	var in2 = document.getElementById("input2").value;

	if (in1.length == 0 || in2.length == 0){
		alert("task or id can't be null")
	}
	else{
		array.set(in2,in1);
		alert("task Added successfully")
	}

	console.log(array);

    
}

function details1() {
	var in1 = document.getElementById("input3").value;

	if (in1.length == 0){
		alert("task or id can't be null")
	}
	else{
		if (array.has(in1)){
		array.delete(in1);
		alert("task deleted successfully")
		}
		else {
			alert("task with this id doesnt exist.")
		}
		
	}
	console.log(array);

}

function details2() {

    let list = document.getElementById("UnList");
    if (list) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
      array.forEach (function(value, key)  {
         var li = document.createElement('li');
         li.innerText = key + " : " + value;
         list.appendChild(li);
      })
    console.log(array);
}