const balance = document.getElementById("balance"); //the total balance number
const money_pluse = document.getElementById("money-pluse"); //the number of the income
const money_minus = document.getElementById("money-minus"); //the number of the expense
const list = document.getElementById("list"); //ul
const form = document.getElementById("form"); //form
const text = document.getElementById("text"); //text input
const amount = document.getElementById("amount"); //amount input
let id = 4
const dummytransactions =[
  {id:1,text:'flower',amount:-20},
  {id:2,text:'salary',amount:300},
  {id:3,text:'book',amount:-10},
    {id:4,text:'camera',amount:150}
]
 const localStorageTransactions =JSON.parse(localStorage.getItem('transactions'))
let transactions =(localStorageTransactions!==null)?localStorageTransactions:[];
// generate random number
const randomNumber = ()=>{
  return Math.floor(Math.random()*1000)

}
//Add transacions to the DOM List
const addTransactionDom = (objItem)=>{
    let li = document.createElement('li')
    const sign = (objItem.amount<0)?'-':'+'
    li.classList.add(objItem.amount<0?'minus':'plus')
    li.innerHTML = `
    ${objItem.text}<span>${sign}${Math.abs(
      objItem.amount
    )}</span><button class="delete-btn">X</button>
    `;
    list.appendChild(li)
    // deleat btn functionallty  
    li.addEventListener('click',(e)=>{
  if(e.target.tagName==='BUTTON'){
    deleat(`${parseInt(objItem.id)}`);
  }
  updateBalance()
})
}//end of addTransactionDom

const deleat =(id)=>{
  transactions=transactions.filter(item=>item.id!=id)
  addLocalsrorage()
  inint()
  updateBalance()

}
// loop through the array(that consist the obj) eith the function addTransactionDom
const inint=()=>{
  list.innerHTML=''
  console.log(transactions);
     transactions.forEach(addTransactionDom);
}
//get from local storage

//reflect the history transactions to the balance
const updateBalance = ()=>{
    let positive = transactions.filter(item=>item.amount>0)
    .reduce((acc,curr)=>{
      acc+=parseInt(curr.amount)
      return acc;
    },0)
  money_pluse.innerHTML = `+$${positive.toFixed(2)}`;
  let negative = transactions.filter(item=>item.amount<0)
  .reduce((acc,curr)=>{
    acc +=parseInt(curr.amount);
    return acc;
  },0)
    money_minus.innerHTML = `-$${(negative * (-1)).toFixed(2)}`;
    const total =  positive + negative;
    +total;
 balance.innerHTML = `$${total.toFixed(2)}`;
};//end of updateBalance
updateBalance()
// add new line from the form element to the history
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    if (text.value.trim() !== "" && amount.value.trim() !== "") {
      id++;
      const obj = { id: randomNumber(), text: text.value, amount:parseInt( amount.value)};
      transactions.push(obj);
    }
    text.value=''
    amount.value=''
      updateBalance()
      inint()
      addLocalsrorage()
})//end of eventlistener
//add array of obj to the local storage
const addLocalsrorage = ()=>{
 localStorage.setItem('transactions',JSON.stringify(transactions))
}
inint()
addLocalsrorage()