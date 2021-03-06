
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
    id = LIST.length; //set id to last elem in LIST
    loadList(LIST);
}else{
    LIST=[];
    id=0;
}

/*load items to users interface */
function loadList(list){
    list.forEach(function(item){
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
    if(trash){return;} //if item is in the trash, do nothing

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

//function that takes care of adding the input to the toDo list
function addThis(){
    const toDo = input.value;
    //if input is not empty
    if(toDo){
        addToDo(toDo, id, false, false);
        //add the ToDo to the list
        LIST.push( {
            name : toDo,
                id : id,
                done : false,
                trash : false
            });
            id++;
            //add where LIST is updated
            localStorage.setItem("TODO", JSON.stringify(LIST));
        } else{
            console.log("empty input");
            alert("Please Fill The Input Field");
        }
        //to clear the input field after an input is added.
        input.value = ""; 
       
}

//a function to be executed when the plus circle is clicked
function plusButtonAdd(){
    console.log("+ button was clicked");
    addThis();
}
//add an intem to the list when the user presses Enter
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13 ){  //ascii code for enter key: 13
        addThis();
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
    //updating LIST
    localStorage.setItem("TODO", JSON.stringify(LIST));
});



//fetching the quotes api
fetch("https://type.fit/api/quotes") 
  .then( //trasnforming received data into json format
     response => response.json() 
    )
    .then(data => {
       // console.log(data[18].author); prints author in index 18
       // console.log(data[17].text); prints text in index 17
       //console.log(data);  prints all elements of the array 
        showQuote(data);
    } )
    .catch(error => console.log("Error"));


    showQuote = quote =>{
        const quoteDiv = document.getElementById("quotes");
        const quoteText = document.createElement('p');
        const quoteAuthor = document.createElement('p');

        //quote index to display
        const idx = Math.floor((Math.random() * 1000) + 1);
        quoteText.innerText = `"${quote[idx].text}"`;
        if(quote[idx].author){
            quoteAuthor.innerText = `-${quote[idx].author}`;
        } else{ //if author val is null 
            quoteAuthor.innerText = "-Lee Hwak";
        }
        
        //console.log(quoteText);
        //console.log(quoteText.textContent);
        //console.log(quoteText.textContent.length);
    
        //animating the quote
        //console.log(quoteText);
        //console.log(quoteText.textContent);
        const spltTxt = quoteText.textContent.split("");
        quoteText.innerHTML = "";
        for(let i=0 ; i<spltTxt.length ; i++){
          quoteText.innerHTML += "<span>"+spltTxt[i]+"</span>";
        }

        //to loop through all the spans
        let char=0;
        let timer = setInterval(onTick, 50);

        function onTick(){
          const span = quoteText.querySelectorAll('span')[char];
          span.classList.add('text-fade');
          char++;

          if(char === spltTxt.length){
            sala();
            //shows the author name 1s atfter the quote is shown
            setTimeout( s => quoteDiv.append(quoteAuthor) , 1000);
            return;
          }
        }
        //end it
        function sala(){
          clearInterval(timer);
          timer = null;
        }
        
        quoteDiv.append(quoteText);
 
    }


//displaying different images in the header background when the page is refershed
function addImage(){
    //an array to store the links of background images we want to be shown
    var links = [
        "url('https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",

        "url('https://images.pexels.com/photos/258112/pexels-photo-258112.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')",

        "url('https://images.pexels.com/photos/733995/pexels-photo-733995.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')",

        "url('https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",

        "url('https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')",

        "url('https://images.pexels.com/photos/1785493/pexels-photo-1785493.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",

        "url('https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",

        "url('https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",

        "url('https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",

        "url('https://images.pexels.com/photos/4261096/pexels-photo-4261096.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",

        "url('https://images.pexels.com/photos/5185041/pexels-photo-5185041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",

        "url('https://images.pexels.com/photos/6439051/pexels-photo-6439051.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",

        "url('https://images.pexels.com/photos/4641231/pexels-photo-4641231.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",

        "url('https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",

        "url('https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",

        "url('https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"

    ];
    //var to store the random generated number which will work as index of links
    var random = Math.floor( Math.random()*links.length );
    console.log("random is: "+random);

    //adding the background-image property to the css sytlesheet
    document.getElementsByClassName('header')[0].style.backgroundImage=links[random];


}
addImage();





