const balance = document.getElementById("balance"); //the total balance number
const money_pluse = document.getElementById("money-pluse"); //the number of the income
const money_minus = document.getElementById("money-minus"); //the number of the expense
const list = document.getElementById("list"); //ul
const form = document.getElementById("form"); //form
const text = document.getElementById("text"); //text input
const amount = document.getElementById("amount"); //amount input

let = historyArray=[]
let sortAmountObj={
all:[],
plus(){
const plusNum= this.all.filter(num=>num>=0)
.reduce((acc,curr)=>{
 acc+=curr
 return acc
},0)
return plusNum
},
minus(){
  const minusNum= this.all.filter(num=>num<0)
  .reduce((acc,curr)=>{
    acc+=curr
    return acc
  },0)
  return minusNum
}
}
//update local storage
const updateLocalStorage=(historyArray)=>{
 localStorage.setItem("transactions", JSON.stringify(historyArray));
}
//balance UI
const balanceUI=(plus,minus)=>{
  money_pluse.innerHTML = `${plus}`;
  money_minus.innerHTML=`${minus}`
  balance.innerHTML=`${plus+minus}`
}

//balance box
const balanceBox =()=>{
  sortAmountObj['all']=[];
  historyArray.forEach((obj)=>{
  sortAmountObj.all.push(parseInt(obj.amount))
  })
  const sumofPlusAmount = sortAmountObj.plus()
  const sumofMinusAmount = sortAmountObj.minus()
balanceUI(sumofPlusAmount,sumofMinusAmount)
}

//build historyUI
const historyUI = () => {
  list.innerHTML = "";
  historyArray.forEach((obj) => {
    const { id, text, amount } = obj;
    list.innerHTML += `
<li class=${amount >= 0 ? "plus" : "minus"} data-id=${id}>
<button class="delete-btn">X</button>
${text}<span>${amount}<span/></li>
`;
  });
};
//delete Item
const deleteItem=(e)=>{
  if(e.target.nodeName==='BUTTON'){
let clickedID = parseInt(e.target.parentElement.dataset.id)
let arrayAfterDeletion =historyArray.filter(item=>item.id!==clickedID)
historyArray=arrayAfterDeletion
updateLocalStorage(historyArray)
 historyUI();
 balanceBox();

  }
}
const handlesubmision= (e)=>{
e.preventDefault()
const text = e.target.text.value;
const amount = e.target.amount.value;
const tamplateObj ={id:Math.floor(Math.random()*1000),text:text,amount:amount}
historyArray.push(tamplateObj);
updateLocalStorage(historyArray);
 historyUI();
 balanceBox();
 getDataFromLS();
form.reset()
}

form.addEventListener('submit',handlesubmision)
list.addEventListener('click',deleteItem)

//get data from localStorage
const getDataFromLS=()=>{
let historyArrayFromLS = JSON.parse(localStorage.getItem("transactions"));
if(historyArray !==null){
  historyArray=historyArrayFromLS
 historyUI();
  balanceBox();
}else{
  historyArray=[]
}
}
getDataFromLS()

