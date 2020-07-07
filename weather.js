const api={
    key:"ec88929a614513884bf0d7cb17264edb",
    base:"https://api.openweathermap.org/data/2.5/"
}
let zipcode;
let searchbox=document.querySelector('.zip');
searchbox.addEventListener('keydown',function(e){
    if(e.keyCode==13 )
    {
        console.log('INPUT SUCCESSFUL');
   
   getResults(searchbox.value);   
}
}
    )


function getResults(value){
   let validZip= /^\d{5}$|^\d{5}-\d{4}$/.test(value);
     console.log(validZip);
    if( validZip==true ) {
console.log('THIS IS A VALID ZIPCODE');
tryFetch(value);
    }
    else{
        console.log('THIS IS NOT A VALID ZIPCODE');
        alert('Zipcodes must be 5 characters long & numerical')
    }
}
function tryFetch(zipcode){
    fetch(api.base+'weather?zip='+zipcode+'&units=imperial&appid='+api.key)
.then(response=>{
   return response.json()})
.then (displayResult)
}
function displayResult(response){
    let area=document.querySelector('.area');
    let date=document.querySelector('.date');
    let temp=document.querySelector('.temp');
    let main=document.querySelector('.main');
    console.log(response);
    area.innerText=response.name;
    temp.innerHTML=Math.round(response.main.temp) + '<span>°</span>';
    main.innerHTML=response.weather[0].main;
    let todayDate=new Date();
date.innerText=dateBuilder(todayDate);
   // date.innerText=response.
let info=document.querySelector('.info');
info.innerHTML="The high will be "+Math.round(response.main.temp_max)+"°. Winds are "+response.wind.speed+"mph.";
}
function dateBuilder(d){
    let months=["January","Feburary","March","April","May","June","July",
    "August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    let date=d.getDate();
    return day+" "+month+" "+date+" , "+year;
}

