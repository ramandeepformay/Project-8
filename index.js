let employees =[];
let employeeHTML = "";
const gridContainer = document.querySelector( ".grid-container" );
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".overlay");
const button = document.querySelector(".modal-close");
const urLink =`https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;

//fetching data function
async function fetchUrl(url){
    try{
        const data = await fetch(url);
        const result = await data.json();
        console.log(result);
        return result;
        
    }
    catch(error){
        console.log(error);
    }
}
//calling fetch function and consuming the promise
fetchUrl(urLink)
//sending the data to employeesInfo function 
.then(data=>employeesInfo(data.results));

async function employeesInfo(data){
    //storing all the data in an array
    employees=  await data;
    //callling map on employyes to extract tne information
    employees.forEach(async(emp, index)=>{
        let name = emp.name;
        let email = emp.email;
        let city =  emp.location.city;
        let picture=  emp.picture;
        let ind = index;
//callling innerHtml function with new extracted data
        innerHtml(name, email, city, picture, ind);
    })
}
//dom manipulation funcation
function innerHtml(name, email, city, picture, ind){ 
    employeeHTML += `
        <div class="card" data-index="${ind}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`
   gridContainer.innerHTML = employeeHTML;
}
//adding event listener on grid container
gridContainer.addEventListener("click", e=>{
    //making sure target never be grid container rather its child elements
    if(e.target!==gridContainer){
        //applying closest method to make sure it returns the closest element
        const card=e.target.closest(".card");
        //extracting data-index
        const index =card.getAttribute("data-index");
        //calling display function
        display(index);
    }
})
//dom manipulation function
function display(ind){
    //using index arg extracting all the information for the particular element;
    let name=`${employees[ind].name.first} ${employees[ind].name.last}` ;
    let email=employees[ind].email;
    let locate=employees[ind].location.state;
    let data =locateSlice(locate);
    let telephone=employees[ind].phone;
    let image =employees[ind].picture.large;
    let birthday = new Date(employees[ind].dob.date);
    let addrees =`${employees[ind].location.street}, ${data} ${employees[ind].location.postcode}`
    
    let modalHtml = `  
    <img class= "avatar" src= "${image}" />
    <div class= "text-container" >
        <h2 class= "name" > ${name} </h2>
        <p class= "email" > ${email}</p>
        <p class= "address" > ${locate}</p>
        <p>${telephone} </p>
        <p class= "address"> ${addrees}</p>
        <p>Birthday: ${birthday.getMonth()}/${birthday.getDate()}/${birthday.getFullYear()} </p>
    </div>`
    
    modalContent.innerHTML=modalHtml;
    overlay.classList.remove("hidden");

}
// extracting the first letter of every word and joining it
function locateSlice(loc){
    let data =loc.match(/\b(\w)/g).join("").toUpperCase();
    return data;

}
//adding event listener to the close button 
button.addEventListener("click",(e)=>{
    if(event.target){
        overlay.classList.add("hidden");
    }
})