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
let employees =[];
let employeeHTML = "";
const gridContainer = document .querySelector( ".grid-container" );
fetchUrl(`https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`).then(data=>employeesInfo(data.results));
async function employeesInfo(data){
    employees=  await data;
    console.log(employees);
   
    employees.forEach(async(emp)=>{
        let name = emp.name;
        let email = emp.email;
        let city =  emp.location.city;
        let picture=  emp.picture;
// template literals make this so much cleaner
        innerHtml(name, email, city, picture);
    })

}
function innerHtml(name, email, city, picture){
    
    employeeHTML += `
<div class="card" >
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