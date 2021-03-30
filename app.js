
//select the elements
const clear = document.querySelector(".clear");
const dateEelement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//add classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


//get from local storage
let data = localStorage.getItem("TODO");
//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length-1; //set id to last elem in LIST
    loadList(LIST);
}else{
    LIST=[];
    id=0;
}

/*load items to users interface */
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id , item.done, item.trash);
    })
} 

/*clear local storage */
clear.addEventListener("click", function(event){
    localStorage.clear();
    location.reload();
})  


//show todays date
const options = { weekday:"long" , month:"short" , day:"numeric"};
const today = new Date();
dateEelement.innerHTML = today.toLocaleDateString("en-US", options);

//add todo function
function addToDo(toDo, id, done, trash){
    if(trash){return;} //if item is in the trash, do nada

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done? LINE_THROUGH : "";

    const item = `
    <li class="item">
    <i class="fa ${DONE} complete" job="complete" id=${id}></i>
    <p class="text" ${LINE}>${toDo}</p>
    <i class="fa fa-trash-o delete" job="delete" id=${id}></i> 
    </li>
    `
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
/* to test the function:  
    addToDo("9essi sshi haja", 0,false, true);
    addToDo("9essi sshi haja", 0,true);
    addToDo("tketbat?");
*/

//add an intem to the list when the user presses Enter
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){  //ascii code for enter key: 13
        const toDo = input.value ;
        //if input is not empty
        if(toDo){
            addToDo(toDo);
            //add the toDo to the list
            LIST.push( {
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            id++;
            //add where LIST is updated
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }
        input.value = ""; //to clear the input field after an input is added.
    }
});

//a complete todo function
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    //update the LIST
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove ToDo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
    
}

//target items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; //returns the whole clicked element
    const elementJob = element.attributes.job.value; //delete or complete
    if(elementJob == "delete"){
        removeToDo(element);
    } else if(elementJob == "complete"){
        completeToDo(element);
    }
    //add where LIST is updated
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
