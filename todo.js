var array = [];

fetch('https://jsonplaceholder.typicode.com/todos').then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    }).then((data) => {
      data.forEach((item)=>{
      	console.log(item.title);
        array.push(item.title);
      })

    
    if (array.length == 0){
		alert("NO Tasks was found")
	}

    let list = document.getElementById("UnList");
    if (list) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
      array.forEach((item)=> {
         var li = document.createElement('li');
         li.innerText =  item;
         var li1 = document.createElement('hr');
         list.appendChild(li);
         list.appendChild(li1);
      })

    console.log(array);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.log('Error:', error.message);
    });

function details() {
	var in1 = document.getElementById("input1").value;

	if (in1.length == 0){
		alert("task or id can't be null")
	}
	else{
		array.splice(0,0,in1);
		alert("task Added successfully")
	}


	let list = document.getElementById("UnList");
    if (list) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
      array.forEach((item)=> {
         var li = document.createElement('li');
         li.innerText = item;
         var li1 = document.createElement('hr');
         list.appendChild(li);
         list.appendChild(li1);
      })

    
}

function details1() {
	var in1 = document.getElementById("input3").value;

	if (in1.length == 0){
		alert("task or id can't be null")
	}
	else{
		if (true){
		array.splice(parseInt(in1) - 1,1);
		alert("task deleted successfully")
		}
		else {
			alert("task with this id doesnt exist.")
		}
		
	}

	
	let list = document.getElementById("UnList");
    if (list) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
      array.forEach((item)=> {
         var li = document.createElement('li');
         li.innerText = item;
         var li1 = document.createElement('hr');
         list.appendChild(li);
         list.appendChild(li1);
      })

}
