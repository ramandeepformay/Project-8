let employees =[];
let employeeHTML = "";
const gridContainer = document.querySelector( ".grid-container" );
const modalContent = document.querySelector(".modal-content");
const overlay = document.querySelector(".overlay");

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
        </div>
`
    gridContainer.innerHTML = employeeHTML;

}

gridContainer.addEventListener("click", e=>{
    if(e.target!==gridContainer){
        const card=e.target.closest(".card");
        const index =card.getAttribute("data-index");
        display(index);
    }

})
function display(ind){
    console.log(employees[ind]);
    
    let name=`${employees[ind].name.first} ${employees[ind].name.last}` ;
    let email=employees[ind].email;
    let locate=employees[ind].location.state;
    let telephone=employees[ind].phone;
    let image =employees[ind].picture.large;
    let birthday = employees[ind].dob.date;
    let addrees =`${employees[ind].location.street},${locate} ${employees[ind].location.postcode}`
    
console.log(name);
    let modalHtml = `  
    <img class= "avatar" src= "${image}" />
    <div class= "text-container" >
        <h2 class= "name" > ${name} </h2>
        <p class= "email" > ${email}</p>
        <p class= "address" > ${locate}</p>
        <p> (593) 3${telephone} </p>
        <p class= "address"> ${addrees}</p>
        <p> ${birthday} </p>
    </div>`
    
    overlay.classList.remove("hidden");
    modalContent.innerHTML=modalHtml;

}

