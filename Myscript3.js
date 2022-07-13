const balance = document.getElementById("balance"); //the total balance number
const money_pluse = document.getElementById("money-pluse"); //the number of the income
const money_minus = document.getElementById("money-minus"); //the number of the expense
const list = document.getElementById("list"); //ul
const form = document.getElementById("form"); //form
const text = document.getElementById("text"); //text input
const amount = document.getElementById("amount"); //amount input
parseInt(amount.value);
 let arr = [];
let id = 0; //every obj in the array get id number, so we can distinguish between them when we want to delete them

//Functions
const init = (e) => {
  e.preventDefault();
  if(text.value!==''&&amount.value!==''){
    let obj = { id: `${id}`, text: `${text.value}`, amount: `${amount.value}` };
    arr.push(obj);
    text.value='';
    amount.value='';
    arrAmount(arr)
    history(arr);
    upDateLocalStorage()
    id++;
  }
};

const arrAmount = (arr)=>{
  let transactionAmount = arr.map((item) => {
    let num = parseInt(item.amount);
    return num;
  });
  updateIncomExpenseCont(transactionAmount);
}

//display transactions lit
const history = (arr) => {
  list.innerHTML = "";
  arr.map((object) => {
    if (object.amount < 0) {
      list.innerHTML += `<li class="minus">${object[`text`]}<span>${
        object.amount
      }$</span><button class="delete-btn" data-id=${object.id}>X</button></li>`;
    } else {
      list.innerHTML += `<li class="plus">${object.text}<span>${object.amount}$</span><button class="delete-btn" data-id=${object.id}>X</button></li>`;
    } //end else
  }); //end map
}; //end of history

//update the inc-exp container
const updateIncomExpenseCont = (amount) => {
  const pluse = (acc, curr) => {
    if (curr > 0) acc += curr;
    return acc;
  };
  const minus = (acc, curr) => {
    if (curr < 0) acc += curr;
    return acc;
  };
  
  const income = amount.reduce(pluse, 0);
  const expense = amount.reduce(minus, 0);
  
  money_pluse.innerHTML = `<p class="money pluse">${income.toFixed(2)}$</p>`;
  money_minus.innerHTML = `<p class="money minus">${expense.toFixed(2)}$</p>`;
  
  totalBalans(income, expense);
}; //end of updateIncomExpenseCont

//total balance
const totalBalans = (income, expense) => {
  let total = 0;  
  total = income + expense;
  balance.innerHTML = `$${total.toFixed(2)}`;
}; //end of totalBalance
//delete list from ul and update the inc-exp box
const del = (e) => {
  if (e.target.tagName === "BUTTON") {
    let listIndex = e.target.getAttribute("data-id");
    arr.forEach((obj, index) => {
      console.log(obj.id);
      if (obj.id == listIndex) {
        arr.splice(index, 1);
        console.log(arr);
      }//end of if
    });//end of forEach
    history(arr);
    arrAmount(arr);
    upDateLocalStorage()
    console.log(arr);
    
  }//end of if
};//end of del

//set items in local storage
const upDateLocalStorage = ()=>{
  localStorage.setItem('transactions',JSON.stringify(arr))
}

//get items from Local Storage 

const localStorageTrans = ()=>{
 const localStorageTrans =  JSON.parse(localStorage.getItem('transactions'))
 arr = (localStorageTrans) !=null ? localStorageTrans:[];
 history(arr);
 arrAmount(arr);
}
localStorageTrans()

//EVENTS

form.addEventListener("submit", init);
list.addEventListener("click", del);
