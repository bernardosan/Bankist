'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements){

  containerMovements.innerHTML = ''

  movements.forEach(function(mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
}

const calcPrintBalance = function(movs){
  const balance = movs.reduce((sum,num) => sum + num);
  labelBalance.textContent = `${balance} €`
}

const greaterMovement = function(movs){
  return movs.reduce((sum,num) => num > sum ? num : sum)
}

const displaySummary = function(acc){
  const movs = acc.movements;
  const income = movs.filter(mov => mov > 0).reduce((acc, val) => acc + val);
  labelSumIn.textContent = `${income}€`;

  const out = movs.filter(mov => mov < 0).reduce((acc, val) => acc + val);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movs
    .filter(mov => mov > 0)
    .map(val => val*acc.interestRate/100)
    .filter(int => int >= 1)
    .reduce((acc, val) => acc+val);
  labelSumInterest.textContent = `${interest}€`;
}

let currentAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.owner.toLowerCase().split(' ').map(name => name[0]).join("") === inputLoginUsername.value
  );

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcome back,  ${currentAccount.owner.split(' ')[0]}`
  }
  containerApp.style.opacity = 100;
  
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  displayMovements(currentAccount.movements);
  calcPrintBalance(currentAccount.movements);
  displaySummary(currentAccount);
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// // const eurToUsd = 1.1;

// // const movementsUsd = movements.map(function(mov){
// //   return mov * eurToUsd
// // })


// // movements.map((mov,i,arr) => {
// //   if (mov > 0){
     
// //   } else {
    
// //   }

// })

const createusername = function(user){
  const username = user.toLowerCase().split(' ').map(name => name[0]).join("");
  return username;
}

const createUsernames = function(accs){
  return accs.map( user => user.owner.toLowerCase().split(' ').map(name => name[0]).join(""));
}

const user = account1.owner;
const username = accounts.map( user => user.owner.toLowerCase().split(' ').map(name => name[0]).join(""));
const deposits = account1.movements.filter( mov => mov > 0);
const balance = account1.movements.reduce( (sum, num) => sum + num);



console.log(balance);
console.log(deposits)
console.log(createusername(account1.owner))
console.log(createUsernames(accounts))