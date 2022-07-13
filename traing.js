const balance = document.getElementById("balance"); //the total balance number
const money_pluse = document.getElementById("money-pluse"); //the number of the income
const money_minus = document.getElementById("money-minus"); //the number of the expense
const list = document.getElementById("list"); //ul
const form = document.getElementById("form"); //form
const text = document.getElementById("text"); //text input
const amount = document.getElementById("amount"); //amount input
let id = 4;
const dummytransactions = [
  { id: 1, text: "flower", amount: -20 },
  { id: 2, text: "salary", amount: 300 },
  { id: 3, text: "book", amount: -10 },
  { id: 4, text: "camera", amount: 150 },
];
let historyArray=[]


//balance box
const balanceBox =()=>{
  const amountArray = historyArray.map(obj=>parseInt(obj.amount))
  const plussArray = amountArray.filter((num)=>{
    return num>=0
  })
  .
  console.log(plussArray);
}

//build historyUI
const historyUI=()=>{
  list.innerHTML=''
  historyArray.forEach((obj)=>{
    const{id,text,amount}=obj
list.innerHTML+=`<li class="plus" data-id=${id}>${text}<span>${amount}<span/></li>`
  })
}




const handlesubmision= (e)=>{
e.preventDefault()
const text = e.target.text.value;
const amount = e.target.amount.value;
const tamplateObj ={id:Math.floor(Math.random()*1000),text:text,amount:amount}
historyArray.push(tamplateObj);
 historyUI();
 balanceBox()
}

form.addEventListener('submit',handlesubmision)

