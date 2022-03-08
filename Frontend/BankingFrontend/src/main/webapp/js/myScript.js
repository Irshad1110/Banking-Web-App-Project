// BackEnd URL
const BASE_URL = "http://localhost:9090/api";

// UI URL
const UI_URL = "http://localhost:8080/BankingFrontend";

function doLogin() {

	const email = document.getElementById('email').value;
	const pass = document.getElementById('pass').value;

	//TODO : add validation for each field
	const loginObj = {};

	loginObj.email = email;
	loginObj.password = pass;

	checkLogin(loginObj);

}
async function checkLogin(loginObj) {
	const url = BASE_URL + '/login';

	const data = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(loginObj)
	};
	const rawResponse = await fetch(url, data);
	const customer = await rawResponse.json();

	if (customer) {
		alert('Login Successful');
		localStorage.setItem("ACC_NUM", customer.accountNo);
		window.location.href = UI_URL + '/dashBoard.html';
	}
	else { alert('Login failed'); }


	console.log(customer);
}

function openAccount(){

	const firstName = document.getElementById('firstName').value;
	if(!firstName){
	alert('First name cannot be empty');
	return;
	}
	const lastName = document.getElementById('lastName').value;
	if(!lastName){
	alert('Last name cannot be empty');
	return;
	}
	const email = document.getElementById('email').value;
	if(!email){
	alert('Email cannot be empty');
	return;
	}
	const phone = document.getElementById('phone').value;
	if(!phone){
	alert('Phone number cannot be empty');
	return;
	}
	const dob = document.getElementById('dob').value;
	if(!dob){
	alert('Date of birth cannot be empty');
	return;
	}
	const pass = document.getElementById('pass').value;
	if(!pass){
	alert('Password cannot be empty');
	return;
	}
	const cpass = document.getElementById('cpass').value;
	if(cpass!==pass){
	alert('Password and confirm password should be same');
	return;
	}
	
	const accountType = document.getElementById('accountType').value;

    //if(pass === cpass)  {
    const customerObj = {};
		customerObj.firstname = firstName;
		customerObj.lastName = lastName;
		customerObj.email = email;
		customerObj.phone = phone;
		customerObj.password = pass;
		customerObj.dob = dob;
		customerObj.accountType = accountType;

		addCustomer(customerObj);
		
	//} else {
		//alert('Password and confirm password should be same');
	//}
}

async function addCustomer(customerObj) {
	const url = BASE_URL + '/customer';

	const data = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(customerObj)
	};
	const rawResponse = await fetch(url, data);
	const customer = await rawResponse.json();
	if (customer) {
		alert('Registraion Successful');

		window.location.href = UI_URL + '/login.html';
	}
	else { alert('Registration failed'); }

	console.log(customer);
}
function fetchAccountNum() {
	const span = document.getElementById('accountNum');
	const accountNumber = localStorage.getItem("ACC_NUM");
	span.innerHTML = accountNumber;

}


function fetchBalance() {

	const accountNum = localStorage.getItem("ACC_NUM");
	callFetchBalanceAPI(accountNum);

}

async function callFetchBalanceAPI(accountNum) {

	const url = BASE_URL + '/balance/' + accountNum;

	const data = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const rawResponse = await fetch(url, data);
	const returnedCustomer = await rawResponse.json();
	/**document.getElementById('showBalance').innerHTML="Available Balance: " + returnedCustomer.balance+ " Rupees";**/
	document.getElementById('fname').innerHTML = returnedCustomer.firstname;
	document.getElementById('lname').innerHTML = returnedCustomer.lastName;
	document.getElementById('accountnum').innerHTML = returnedCustomer.accountNo;
	document.getElementById('email').innerHTML  = returnedCustomer.email;
	document.getElementById('accountType').innerHTML = returnedCustomer.accountType;
	document.getElementById('phone').innerHTML = returnedCustomer.phone;
	document.getElementById('dob').innerHTML = returnedCustomer.dob;
	document.getElementById('showBalance').innerHTML = "Rs. " + returnedCustomer.balance;

	console.log(returnedCustomer);
}



function deposite() {

	const accountNum = document.getElementById('accNum').value;
	const amount = document.getElementById('amount').value;
	const source = document.getElementById('source').value;
	const remark = document.getElementById('remark').value;

	const transactionObj = {}
	transactionObj.accountNum = accountNum;
	transactionObj.amount = amount;
	transactionObj.source = source;
	transactionObj.remark = remark;
	transactionObj.type = "CREDIT";

	callDepositeAPI(transactionObj);

}

async function callDepositeAPI(transactionObj) {
	const url = BASE_URL + '/deposite';

	const data = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(transactionObj)
	};
	const rawResponse = await fetch(url, data);
	const message = await rawResponse.json();
	if (message) {
		alert('Transaction completed Successfully');
		window.location.href = UI_URL + '/dashBoard.html';
	} else { alert('Transaction failed');  }


	console.log(message);
}

function withdraw() {

	const accountNum = document.getElementById('accNum').value;
	const amount = document.getElementById('amount').value;
	const source = document.getElementById('source').value;
	const remark = document.getElementById('remark').value;

	const transactionObj = {}
	transactionObj.accountNum = accountNum;
	transactionObj.amount = amount;
	transactionObj.source = source;
	transactionObj.remark = remark;
	transactionObj.type = "DEBIT";

	callWithdrawAPI(transactionObj);

}

async function callWithdrawAPI(transactionObj) {
	const url = BASE_URL + '/withdraw';

	const data = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(transactionObj)
	};
	const rawResponse = await fetch(url, data);
	const message = await rawResponse.json();
	if (message) {
		alert('Transaction completed Successfully');
		window.location.href = UI_URL + '/dashBoard.html';
	} else { alert('Transaction failed'); }


	console.log(message);
}

function fetchTransactionData() {

	const accountNum = localStorage.getItem("ACC_NUM");


	callTransactionDataAPI(accountNum);

}

async function callTransactionDataAPI(accountNum) {

	const url = BASE_URL + '/transaction/' + accountNum;

	const data = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const rawResponse = await fetch(url, data);
	const allTransactions = await rawResponse.json();

	fillStatementTable(allTransactions)

	console.log(allTransactions);
}

function fillStatementTable(allTransactions) {

	const tbody = document.getElementById('statements');
	for (transaction of allTransactions) {


		let row = document.createElement('tr');

		let idCol = document.createElement('td');
		idCol.innerHTML = transaction.id;

		let accountNumCol = document.createElement('td');
		accountNumCol.innerHTML = transaction.accountNum;

		let amountCol = document.createElement('td');
		amountCol.innerHTML = transaction.amount;

		let typeCol = document.createElement('td');
		typeCol.innerHTML = transaction.type;

		let sourceCol = document.createElement('td');
		sourceCol.innerHTML = transaction.source;

		let dateCol = document.createElement('td');
		dateCol.innerHTML = transaction.date;

		let remarksCol = document.createElement('td');
		remarksCol.innerHTML = transaction.remark;

		row.append(idCol);
		row.append(accountNumCol);
		row.append(amountCol);
		row.append(typeCol);
		row.append(sourceCol);
		row.append(dateCol);
		row.append(remarksCol);

		tbody.append(row);
	}
}

/*********Fund Transfer********/

function fundTransfer() {

	const payerAccNum = document.getElementById('payerAccNum').value;
	const payeeAccNum = document.getElementById('payeeAccNum').value;
	const amount = document.getElementById('amount').value;
	const source = document.getElementById('source').value;
	const remark = document.getElementById('remark').value;


	const transactionCreditObj = {}
	transactionCreditObj.accountNum = payeeAccNum;
	transactionCreditObj.amount = amount;
	transactionCreditObj.source = source;
	transactionCreditObj.remark = remark;
	transactionCreditObj.type = "CREDIT";

	const transactionDebitObj = {}
	transactionDebitObj.accountNum = payerAccNum;
	transactionDebitObj.amount = amount;
	transactionDebitObj.source = source;
	transactionDebitObj.remark = remark;
	transactionDebitObj.type = "DEBIT";

	const transactionArr = [];
	transactionArr.push(transactionDebitObj);
	transactionArr.push(transactionCreditObj);

	callFundTransferAPI({ transactions: transactionArr });

}

async function callFundTransferAPI(transactionObj) {
	const url = BASE_URL + '/fundTransfers';

	const data = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(transactionObj)
	};
	const rawResponse = await fetch(url, data);
	const message = await rawResponse.json();

	if (message) {
		alert('Transaction completed Successfully');
		window.location.href = UI_URL + '/dashBoard.html';
	} else { alert('Transaction failed'); }

	console.log(message);
}
