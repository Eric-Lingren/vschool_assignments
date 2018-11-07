
// var axios = require('axios');

axios.get('https://api.vschool.io/ericlingren/todo').then(function(response){
    var listArray = response.data
    pullArray(listArray)
   
    }).catch(function(error){
        console.log(error);
    });

function pullArray (listArray){
 
    for (let i = 0; i < listArray.length; i++) {
        var toDoId = listArray[i]._id
        var toDoContainer = document.createElement('div');
        toDoContainer.classList.add ('todo');
        toDoContainer.setAttribute('id', toDoId[i]);
       
        //console.log(toDoId)

        //container.setAttribute('id', toDoId)

            //  Create HTML elements
        var title = document.createElement('h3');
            title.classList.add ('description');
        var description = document.createElement('p');
            description.classList.add ('description');
        var price = document.createElement('p');
            price.classList.add ('price');
        var isCompleted = document.createElement('p');
            isCompleted.classList.add ('completed');

            //Created a complete item button
        var completeButton = document.createElement('img');
        completeButton.setAttribute('src', './complete.png');
        completeButton.classList.add ('completeButton');
        var completeText = document.createTextNode('Complete');
        completeButton.appendChild(completeText);
        completeButton.id = toDoId;

        
        //creates a function to change record between completed and not completed
        completeButton.addEventListener('click', function(){
            console.log(listArray[i].completed)
            if(listArray[i].completed === false) {
            axios.put(`https://api.vschool.io/ericlingren/todo/${this.id}`, { completed: true} ).then(function(response){
            console.log(response.data);
                });
            } else {
                axios.put(`https://api.vschool.io/ericlingren/todo/${this.id}`, { completed: false} ).then(function(response){
            console.log(response.data);
                });
            }
        });
    

         //  Creates an edit item button
         var editButton = document.createElement('img');
         editButton.setAttribute('src', './edit.png');
         editButton.classList.add ('editButton');
         var editText = document.createTextNode('edit');
         editButton.appendChild(editText);
         editButton.id = toDoId;

         //create a variable to pull the title element by id
        //  let titleElementId = document.getElementById(listArray[i].toDoId);
        //  console.log(titleElementId)

        //  creates a function to change the text to an input box
         editButton.addEventListener('click', function(){
            //console.log(listArray[i]._id);
            console.log(listArray[i].title);
            console.log(document.getElementById(toDoId[i]));
            let titleElementId = document.getElementById(toDoId[i])
            //console.log(this.title);
            titleElementId.style.display = 'none';

            //  axios.put(`https://api.vschool.io/ericlingren/todo/${this.id}`, { completed: true} ).then(function(response){
            //  console.log(response.data);
            //      });
         });
 

        
            // Creates a delete button
        var deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', './delete.png');
        deleteButton.classList.add ('deleteButton');
        var deleteText = document.createTextNode('delete');
        deleteButton.appendChild(deleteText);
        deleteButton.id = toDoId;
            //creates a function to delete record when clicked
        deleteButton.addEventListener('click', function(){
            // console.dir(this)
            axios.delete(`https://api.vschool.io/ericlingren/todo/${this.id}`).then(function(response){
            console.log(response.data);
                });
        });

            //  Adds an image to the div element
        var image = document.createElement('img');
        image.setAttribute('src', listArray[i].imgUrl);
        image.classList.add('urlimage');
            //  doesnt display the broken image link if the image has no image.
        if(!listArray[i].imgUrl) {
            image.style.display='none';
        } 


            //  Put the to-do items inside the div element
        title.textContent = listArray[i].title;
        description.textContent = listArray[i].description;
        price.textContent = (`Price: ${listArray[i].price}`);
        isCompleted.textContent = (`Completed: ${listArray[i].completed}`);

       

            // Put the element on the DOM
        toDoContainer.appendChild(title);
        toDoContainer.appendChild(description);
        toDoContainer.appendChild(price);
        toDoContainer.appendChild(isCompleted);
        toDoContainer.appendChild(completeButton);
        toDoContainer.appendChild(editButton);
        toDoContainer.appendChild(deleteButton);
        toDoContainer.appendChild(image);
      
      

        // toDoContainer.appendChild(image);

        document.getElementById('list-container').appendChild(toDoContainer);

            //  Check to see if the item has been completed.  If so, it crosses off the item.
        if (isCompleted.textContent === 'Completed: true'){
            title.style.textDecoration = 'line-through'
            title.style.color = 'black'
            isCompleted.style.color = 'black'
        }  
    }
}

var form = document.listForm;
   
form.addEventListener('submit', function(event){
    event.preventDefault();
    var inputTitle = form.title.value;
    var inputDescription = form.description.value;
    var inputPrice = form.price.value;
    var inputImage = form.image.value;
    var inputComplete = form.complete.checked;
 
var newToDo = {};
    newToDo.title =  inputTitle;
    newToDo.description =  inputDescription;
    newToDo.price =  inputPrice;
    newToDo.imgUrl =  inputImage;
    newToDo.completed =  inputComplete;
          
axios.post('https://api.vschool.io/ericlingren/todo', newToDo).then(function(response){
    console.log(response.data);
    });
});










