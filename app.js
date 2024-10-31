let api= "https://v6.exchangerate-api.com/v6/b7e8f8114c19044524a51260/latest/USD";


const dropdowns =document.querySelectorAll(".dropdown select")
const  btn= document.querySelector(" form button");
const fromSelect=document.querySelector(".from select");
const toSelect=document.querySelector(".To select")
const msg= document.querySelector(".msg")
 




for (let select of dropdowns) {
    
    for ( currCode  in countryList){
        let newOptions=document.createElement("option")
         newOptions.innerHTML = currCode;
         newOptions.value = currCode;
        
       
        if ( select.name==="from" && currCode === "USD"){
               newOptions.selected="selected";
        }
        else if ( select.name ==="to" &&  currCode === "INR"){
           newOptions.selected="selected" ;   
        }

        select.append(newOptions);
    }
   
    select.addEventListener(("change"),(evt)=>{
        updateFlage(evt.target);
  
      });
   
}

const updateFlage =(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector('img');
   img.src = newSrc;
   
   
}


upDateExchangeRate=async()=>{
 
    let amount=document.querySelector(".amount input").value;
    let fromCurr =fromSelect.value;
    let toCurr = toSelect.value;

    if (amount==="" || amount<1 ){
       alert("plese inter the Amount")
    }
   
    let response= await fetch(api)
    let data= await response.json();
    let fromExchangeRate = data.conversion_rates[fromCurr];
    let toExchangeRate = data.conversion_rates[toCurr];

  let finalExchangeRate= (toExchangeRate/fromExchangeRate)*amount;
   msg.innerHTML=`${amount} ${fromCurr} = ${finalExchangeRate.toFixed(2)} ${toCurr}` ;
}


btn.addEventListener("click" , (evt)=>{
    evt.preventDefault();
   
     upDateExchangeRate();
});

window.addEventListener("load",()=>{
    upDateExchangeRate();
})

