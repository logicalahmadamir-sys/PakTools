

// Loan EMI Calculator
function calculateEMI(){

let amount=document.getElementById('amount').value;
let rate=document.getElementById('rate').value/12/100;
let months=document.getElementById('months').value;

let emi=(amount*rate*Math.pow(1+rate,months))/(Math.pow(1+rate,months)-1);

if(isFinite(emi)){
document.getElementById('emiResult').innerHTML='Monthly EMI: PKR '+emi.toFixed(2);
}else{
document.getElementById('emiResult').innerHTML='Please Enter Valid Values';
}

}

// Salary Tax Calculator
function calculateTax(){

let salary=parseFloat(document.getElementById('salary').value);
let tax=0;

if(salary<=600000){
tax=0;
}
else if(salary<=1200000){
tax=(salary-600000)*0.05;
}
else if(salary<=2200000){
tax=30000+(salary-1200000)*0.15;
}
else{
tax=180000+(salary-2200000)*0.25;
}

document.getElementById('taxResult').innerHTML='Estimated Tax: PKR '+tax.toFixed(2);

}

// Currency Converter
async function convertCurrency(){

let amount=document.getElementById('currencyAmount').value;
let from=document.getElementById('fromCurrency').value;
let to=document.getElementById('toCurrency').value;

let response=await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
let data=await response.json();

let rate=data.rates[to];

let result=amount*rate;

document.getElementById('currencyResult').innerHTML='Converted Amount: '+result.toFixed(2)+' '+to;

}

// Gold Calculator
function calculateGold(){

let rate=document.getElementById('goldRate').value;
let quantity=document.getElementById('quantity').value;
let unit=document.getElementById('unit').value;

let total=rate*quantity;

if(unit==='10gram'){
total=total*0.857;
}

document.getElementById('goldResult').innerHTML='Gold Price: PKR '+total.toFixed(2);

}

// Scroll Animation
window.addEventListener('scroll',()=>{

document.querySelectorAll('.tool-box').forEach((box)=>{

let position=box.getBoundingClientRect().top;
let screen=window.innerHeight;

if(position<screen-100){
box.style.opacity='1';
box.style.transform='translateY(0px)';
}

});

});

