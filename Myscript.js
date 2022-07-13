const balance = document.getElementById("balance"); //the total balance number
const money_pluse = document.getElementById("money-pluse"); //the number of the income
const money_minus = document.getElementById("money-minus"); //the number of the expense
const list = document.getElementById("list"); //ul
const form = document.getElementById("form"); //form
const text = document.getElementById("text"); //text input
const amount = document.getElementById("amount"); //amount input
parseInt(amount.value);
let id = 0; //for the obj
let arr = [];

//Functions
const init = (e) => {
  e.preventDefault();
  id++;
  let obj = { id: `${id}`, text: `${text.value}`, amount: amount.value };
  arr.push(obj);
  arrAmount = arr.map((item) => {
    let num = parseInt(item.amount);
    console.log(num);
    return num;
  });
  console.log(arr);
  history(arr);
  updateIncomExpenseCont(arrAmount);
};
//display transactions lit
const history = (arr) => {
  list.innerHTML = "";
  arr.map((object) => {
    if (object.amount < 0) {
      console.log(typeof object.amount);
      list.innerHTML += `<li class="minus">${object[`text`]}<span>${
        object.amount
      }$</span><button class="delete-btn">X</button></li>`;
    } else {
      list.innerHTML += `<li class="plus">${object.text}<span>${object.amount}$</span><button class="delete-btn">X</button></li>`;
    }
  });
}; //end of history

//update the inc-exp container
const updateIncomExpenseCont = (amount) => {
  const pluse = ((acc,curr)=>{
    if(curr>0)
    acc+=curr 
    return acc 
  }
  )
  const minus = ((acc,curr)=>{
    if(curr<0)
    acc+=curr
    return acc
  }
  )
  
  const income = amount.reduce(pluse,0)
  const expense = amount.reduce(minus,0)
  
  money_pluse.innerHTML = `<p class="money pluse">${income.toFixed(2)}$</p>`;
  money_minus.innerHTML = `<p class="money minus">${expense.toFixed(2)}$</p>`;
  
  totalBalans(income,expense)
}//end of updateIncomExpenseCont

//total balance
const totalBalans =(income,expense)=>{
  let total = 0
  total =income+expense;
  balance.innerHTML=`$${total.toFixed(2)}`
}//end of totalBalance
//delete list from ul and update the inc-exp box 
const del = (e)=>{
  // console.log(e.path);
  // e.path.forEach(item=>{
    //   if(item.tagName==='BUTTON')
    //   console.log(item);
    // })
    if(e.target.tagName=='BUTTON'){
      let string = e.target.parentElement.firstElementChild.innerText
      console.log(string);
      number =  parseInt(string.slice(0,string.length-1))
      console.log(number,typeof number);
      console.log(e.target.parentElement.childNodes,arr);
      let text=e.target.parentElement.childNodes[0].nodeValue;
      let obj = arr.find(obj=>
        obj.text===text
        )
        console.log(obj);
        arr.pop(obj)
        history(arr);
         arrAmount = arr.map((item) => {
    let num = parseInt(item.amount);
    console.log(num);
    return num;
  });
    updateIncomExpenseCont(arrAmount);
      }//end of if
    }//end of del
    //EVENTS
    form.addEventListener("submit", init);
    list.addEventListener('click',del)
    