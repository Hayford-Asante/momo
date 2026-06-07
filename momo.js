// MoMo Money Transfer Application - Browser Console Version

let balance = 1000.00;
let bankBalance = 300.00;

function momoUser() {
  console.log("================================");
  console.log("MoMo User Transfer");
  console.log("================================\n");

  let inputpin = prompt("Dial *170*1#:");
  console.clear();

  if (inputpin !== '*170*1#') {
    console.log("================================");
    console.log("Incorrect PIN");
    console.log("================================\n");
    momoUser();
    return;
  }

  main();
}

function main() {
  console.clear();
  console.log("================================");
  console.log("Unlock more deals, try our new MoMo App");
  console.log("1) Transfer Money");
  console.log("2) MoMoPay & Pay Bill");
  console.log("3) Airtime & Bundles");
  console.log("4) Allow cash out");
  console.log("5) Financial");
  console.log("================================\n");

  let option = prompt("Unlock more deals, try our new MoMo App\n1) Transfer Money\n2) MoMoPay & Pay Bill\n3) Airtime & Bundles\n4) Allow cash out\n5) Financial");

  if (option === "1") {
    console.clear();
    moneyTransfer();
  } else {
    console.clear();
    console.log("Unknown Input");
    console.log("Redirecting to main menu...\n");
    setTimeout(main, 2000);
  }
}

function moneyTransfer() {
  console.clear();
  console.log("================================");
  console.log("More offers await on the MoMo App");
  console.log("1) MoMo User");
  console.log("2) Non MoMo User");
  console.log("3) Send with care");
  console.log("4) Favorite");
  console.log("5) Other Network");
  console.log("6) Bank Account");
  console.log("================================\n");

  let moreOffers = prompt("More offers await on the MoMo App\n1) MoMo User\n2) Non MoMo User\n3) Send with care\n4) Favorite\n5) Other Network\n6) Bank Account\n7) Seven");

  console.clear();

  switch (moreOffers) {
    case "1":
      momoUserTransfer();
      break;
    case "2":
      nonMomouser();
      break;
    case "3":
      sendWithcare();
      break;
    case "4":
      favourite();
      break;
    case "5":
      otherNetwork();
      break;
    case "6":
      bank();
      break;
    case "7":
      seven();
      break;
    default:
      console.log("Unknown Input");
      console.log("Redirecting to main menu...\n");
      setTimeout(main, 2000);
  }
}

function momoUserTransfer() {
  console.log("================================");
  console.log("MoMo User Transfer");
  console.log("================================\n");
  
  const number = prompt("Enter Mobile Number:");
  const amount = prompt("Enter Amount (GHC):");
  const referens = prompt("Enter Reference:");
  
  console.clear();
  const amtNum = parseFloat(amount);
  const feeAmt = amtNum * 0.007;
  const taxAmt = amtNum * 0.01;
  const totalAmt = amtNum + feeAmt + taxAmt;
  console.log("================================");
  console.log("Transfer Confirmation");
  console.log("================================");
  console.log(`Transfer to HAYFORD ASANTE ADDE for GHC ${amtNum.toFixed(2)}`);
  console.log(`with reference: ${referens}`);
  console.log(`Fee is GHC ${feeAmt.toFixed(2)}`);
  console.log(`Tax amount is GHC ${taxAmt.toFixed(2)}`);
  console.log(`Total amount is GHC ${totalAmt.toFixed(2)}`);
  console.log("================================\n");
  
  const pin = prompt("Enter PIN (MM) to confirm:");
  
  console.clear();
  if (pin !== '1234') {
    console.log("================================");
    console.log("Incorrect PIN");
    console.log("================================\n");
    showMenu();
    return;
  }
  
  // deduct amount and fees/tax from balance
  balance -= totalAmt;
  const txnId = Math.floor(Math.random() * 1000000);
  console.log("================================");
  console.log("✓ Transaction Successful");
  console.log("================================");
  console.log(`You have sent an amount of GHC ${amtNum.toFixed(2)} to HAYFORD ASANTE ADDE. Fee: GHC ${feeAmt.toFixed(2)}. Tax: GHC ${taxAmt.toFixed(2)}. Message 2. Your balance is GHC ${balance.toFixed(2)}. Transaction ID: ${txnId}`);
  console.log("================================\n");
  
  showMenu();
}

function nonMomouser() {
  console.log("================================");
  console.log("Non MoMo User Transfer");
  console.log("================================\n");
  
  const name = prompt("Enter receiver Name:");
  const amount = prompt("Enter Amount:");
  const referens = prompt("Enter Reference:");
  const secretCode1 = prompt("Enter Secret Code:");
  const secretCode2 = prompt("Confirm Secret Code:");
  
  console.clear();
  
  if (secretCode1 !== secretCode2) {
    console.log("Invalid Input - Secret codes do not match!");
    setTimeout(nonMomouser, 2000);
    return;
  }
  
  console.log("================================");
  console.log("Transfer Confirmation");
  console.log("================================");
  const amtNum = parseFloat(amount);
  const feeAmt = amtNum * 0.007;
  const taxAmt = amtNum * 0.01;
  const totalAmt = amtNum + feeAmt + taxAmt;
  console.log(`Transfer to ${name} for GHC ${amtNum.toFixed(2)}`);
  console.log(`with reference: ${referens}`);
  console.log(`Fee is GHC ${feeAmt.toFixed(2)}`);
  console.log(`Tax amount is GHC ${taxAmt.toFixed(2)}`);
  console.log(`Total amount is GHC ${totalAmt.toFixed(2)}`);
  console.log("================================\n");
  
  const pin = prompt("Enter PIN (MM) to confirm:");
  
  console.clear();
  if (pin !== '1234') {
    console.log("================================");
    console.log("Incorrect PIN");
    console.log("================================\n");
    showMenu();
    return;
  }
  
  // deduct amount and fees/tax from balance
  balance -= totalAmt;
  const txnId = Math.floor(Math.random() * 1000000);
  console.log("================================");
  console.log("✓ Transaction Successful");
  console.log("================================");
  console.log(`You have sent an amount of GHC ${amtNum.toFixed(2)} to ${name}. Fee: GHC ${feeAmt.toFixed(2)}. Tax: GHC ${taxAmt.toFixed(2)}. Message 2. Your balance is GHC ${balance.toFixed(2)}. Transaction ID: ${txnId}`);
  console.log("================================\n");
  
  showMenu();
}

function sendWithcare() {
  console.clear();
  console.log("================================");
  console.log("Send With Care (SwC) Service");
  console.log("================================\n");
  console.log("The SwC product will be unavailable till");
  console.log("30/06/2026. To view your caretaker, beneficiary,");
  console.log("balances or claims, please use WhatsApp on");
  console.log("0243486849");
  console.log("================================\n");
  
  showMenu();
}

function favourite() {
  console.clear();
  console.log("================================");
  console.log("Favourite Contacts");
  console.log("================================");
  console.log("1) Name");
  console.log("2) Find");
  console.log("0) Back");
  console.log("================================\n");
  
  const choice = prompt("Favourite Contacts\n1) Name\n2) Find\n0) Back");
  
  console.clear();
  
  if (choice === "1" || choice === "2") {
    const name = prompt("Enter Name:");
    const pin = prompt("Enter Pin:");
    
    console.clear();
    console.log("================================");
    console.log("No contact found");
    console.log("================================\n");
  }
  
  showMenu();
}

function otherNetwork() {
  console.clear();
  console.log("================================");
  console.log("Transfer Money To Other Network");
  console.log("================================");
  console.log("1) AT");
  console.log("2) Telecel");
  console.log("3) E-zwich");
  console.log("4) G-Money");
  console.log("5) Zeepay");
  console.log("6) GhanaPay");
  console.log("0) Back");
  console.log("================================\n");
  
  option = prompt("Transfer Money To Other Network\n1) AT\n2) Telecel\n3) E-zwich\n4) G-Money\n5) Zeepay\n6) GhanaPay\n0) Back");
  
  console.clear();
  
  const networks = ["AT", "Telecel", "E-zwich", "G-Money", "Zeepay", "GhanaPay"];
  
  if (option >= "1" && option <= "6") {
    processOtherNetworkTransfer(networks[parseInt(option) - 1]);
  } else if (option === "0") {
    main();
  } else {
    console.log("Unknown Input");
    setTimeout(otherNetwork, 2000);
  }
}

function processOtherNetworkTransfer(network) {
  console.log("================================");
  console.log(`${network} Transfer`);
  console.log("================================\n");
  
  const number = prompt("Enter Mobile Number:");
  const amount = prompt("Enter Amount (GHC):");
  const referens = prompt("Enter Reference:");
  
  console.clear();
  const amtNum = parseFloat(amount);
  const feeAmt = amtNum * 0.007;
  const taxAmt = amtNum * 0.01;
  const totalAmt = amtNum + feeAmt + taxAmt;
  console.log("================================");
  console.log("Transfer Confirmation");
  console.log("================================");
  console.log(`Transfer to HAYFORD ASANTE ADDE for GHC ${amtNum.toFixed(2)}`);
  console.log(`Network: ${network}`);
  console.log(`with reference: ${referens}`);
  console.log(`Fee is GHC ${feeAmt.toFixed(2)}`);
  console.log(`Tax amount is GHC ${taxAmt.toFixed(2)}`);
  console.log(`Total amount is GHC ${totalAmt.toFixed(2)}`);
  console.log("================================\n");
  
  const pin = prompt("Enter PIN (MM) to confirm:");
  
  console.clear();
  if (pin !== '1234') {
    console.log("================================");
    console.log("Incorrect PIN");
    console.log("================================\n");
    showMenu();
    return;
  }
  
  // deduct amount and fees/tax from balance
  balance -= totalAmt;
  const txnId = Math.floor(Math.random() * 1000000);
  console.log("================================");
  console.log("✓ Transaction Successful");
  console.log("================================");
  console.log(`You have sent an amount of GHC ${amtNum.toFixed(2)} to HAYFORD ASANTE ADDE via ${network}. Fee: GHC ${feeAmt.toFixed(2)}. Tax: GHC ${taxAmt.toFixed(2)}. Message 2. Your balance is GHC ${balance.toFixed(2)}. Transaction ID: ${txnId}`);
  console.log("================================\n");
  
  showMenu();
}

function bank() {
  console.clear();
  console.log("================================");
  console.log("GHIPSS Bank Transfer Service");
  console.log("================================");
  console.log("1) Wallet to Bank Account");
  console.log("2) Bank Account to your Wallet");
  console.log("0) Back");
  console.log("================================\n");
  
  option = prompt("GHIPSS Bank Transfer Service\n1) Wallet to Bank Account\n2) Bank Account to your Wallet\n0) Back");
  
  console.clear();
  
  if (option === "1") {
    walletToBank();
  } else if (option === "2") {
    bankToWallet();
  } else if (option === "0") {
    main();
  } else {
    console.log("Unknown Input");
    setTimeout(bank, 2000);
  }
}

function walletToBank() {
  console.clear();
  console.log("================================");
  console.log("Select Bank");
  console.log("================================");
  console.log("1) STANCHART");
  console.log("2) ABSA");
  console.log("3) GCB");
  console.log("4) FIDELITY");
  console.log("5) CAL");
  console.log("6) ADB");
  console.log("7) ECOBANK");
  console.log("================================\n");
  
  option = prompt("Select Bank\n1) STANCHART\n2) ABSA\n3) GCB\n4) FIDELITY\n5) CAL\n6) ADB\n7) ECOBANK");
  
  console.clear();
  
  const banks = ["STANCHART", "ABSA", "GCB", "FIDELITY", "CAL", "ADB", "ECOBANK"];
  
  if (option >= "1" && option <= "7") {
    processWalletToBankTransfer(banks[parseInt(option) - 1]);
  } else {
    console.log("Unknown Input");
    setTimeout(walletToBank, 2000);
  }
}

function processWalletToBankTransfer(bank) {
  console.log("================================");
  console.log(`${bank} - Wallet to Bank Transfer`);
  console.log("================================\n");
  
  const accountNumber = prompt("Enter Bank Account Number:");
  const amount = prompt("Enter Amount to Transfer:");
  const referens = prompt("Enter Reference ID:");
  
  console.clear();
  const amtNum = parseFloat(amount);
  const feeAmt = amtNum * 0.007;
  const taxAmt = amtNum * 0.01;
  const totalAmt = amtNum + feeAmt + taxAmt;
  console.log("================================");
  console.log("Transfer Confirmation");
  console.log("================================");
  console.log(`Transfer to HAYFORD ASANTE ADDE for GHC ${amtNum.toFixed(2)}`);
  console.log(`Bank: ${bank}`);
  console.log(`with reference: ${referens}`);
  console.log(`Fee is GHC ${feeAmt.toFixed(2)}`);
  console.log(`Tax amount is GHC ${taxAmt.toFixed(2)}`);
  console.log(`Total amount is GHC ${totalAmt.toFixed(2)}`);
  console.log("================================\n");
  
  const pin = prompt("Enter PIN (MM) to confirm:");
  
  console.clear();
  if (pin !== '1234') {
    console.log("================================");
    console.log("Incorrect PIN");
    console.log("================================\n");
    showMenu();
    return;
  }
  
  // Check if total debit (amount+fee+tax) exceeds current mobile money balance
  if (totalAmt > balance) {
    console.log("================================");
    console.log("Insufficient Balance");
    console.log("You have insufficient money in your mobile wallet");
    console.log("================================");
    console.log(`Mobile Balance: GHC ${balance.toFixed(2)}`);
    console.log(`Required Amount (incl. fees/tax): GHC ${totalAmt.toFixed(2)}`);
    console.log("================================\n");
    showMenu();
    return;
  }
  
  // deduct amount and fees/tax from mobile balance, add to bank balance
  balance -= totalAmt;
  bankBalance += totalAmt;
  const txnId = Math.floor(Math.random() * 1000000);
  console.log("================================");
  console.log("✓ Transaction Successful");
  console.log("================================");
  console.log(`You have transferred GHC ${amtNum.toFixed(2)} to your bank account. Fee: GHC ${feeAmt.toFixed(2)}. Tax: GHC ${taxAmt.toFixed(2)}. Transaction ID: ${txnId}`);
  console.log(`Mobile Balance: GHC ${balance.toFixed(2)}`);
  console.log(`Bank Balance: GHC ${bankBalance.toFixed(2)}`);
  console.log("================================\n");
  
  showMenu();
}

function bankToWallet() {
  console.clear();
  console.log("================================");
  console.log("Select Bank");
  console.log("================================");
  console.log("1) STANCHART");
  console.log("2) ABSA");
  console.log("3) GCB");
  console.log("4) FIDELITY");
  console.log("5) CAL");
  console.log("6) ADB");
  console.log("7) ECOBANK");
  console.log("================================\n");
  
  option = prompt("Select Bank\n1) STANCHART\n2) ABSA\n3) GCB\n4) FIDELITY\n5) CAL\n6) ADB\n7) ECOBANK");
  
  console.clear();
  
  const banks = ["STANCHART", "ABSA", "GCB", "FIDELITY", "CAL", "ADB", "ECOBANK"];
  
  if (option >= "1" && option <= "7") {
    processBankToWalletTransfer(banks[parseInt(option) - 1]);
  } else {
    console.log("Unknown Input");
    setTimeout(bankToWallet, 2000);
  }
}

function processBankToWalletTransfer(bank) {
  console.log("================================");
  console.log(`${bank} - Bank to Wallet Transfer`);
  console.log("================================\n");
  
  const amount = prompt("Enter Amount to Transfer:");
  const referens = prompt("Enter Reference ID:");
  
  console.clear();
  const amtNum = parseFloat(amount);
  const feeAmt = amtNum * 0.007;
  const taxAmt = amtNum * 0.01;
  const totalAmt = amtNum + feeAmt + taxAmt;
  console.log("================================");
  console.log("Withdrawal Confirmation");
  console.log("================================");
  console.log("Dear HAYFORD ASANTE ADDE, please");
  console.log("confirm you want to complete your");
  console.log(`withdrawal request for GHC ${amtNum.toFixed(2)} from`);
  console.log(`${bank}, account name-, account`);
  console.log(`Fee is GHC ${feeAmt.toFixed(2)}`);
  console.log(`Tax amount is GHC ${taxAmt.toFixed(2)}`);
  console.log("================================\n");
  
  const next = prompt("Enter PIN (MM) to confirm:");
  
  console.clear();
  if (next !== '1234') {
    console.log("================================");
    console.log("Incorrect PIN");
    console.log("================================\n");
    showMenu();
    return;
  }
  
  // Check if total debit (amount+fee+tax) exceeds current bank balance
  if (totalAmt > bankBalance) {
    console.log("================================");
    console.log("Insufficient Bank Balance");
    console.log("You have insufficient funds in your bank account");
    console.log("================================");
    console.log(`Bank Balance: GHC ${bankBalance.toFixed(2)}`);
    console.log(`Required Amount (incl. fees/tax): GHC ${totalAmt.toFixed(2)}`);
    console.log("================================\n");
    showMenu();
    return;
  }
  
  bankBalance -= totalAmt;
  balance += totalAmt;
  const txnId = Math.floor(Math.random() * 1000000);
  console.log("================================");
  console.log("Account Statement");
  console.log("================================");
  console.log("Acct: 1*******4582");
  console.log(`Amt: GHC ${amount} CR`);
  console.log("Desc: GHC 100");
  console.log("14375983857:Int.PD:01-08-2025");
  console.log("to 29-08-2025");
  console.log(`Mobile Balance: GHC ${balance.toFixed(2)}`);
  console.log(`Bank Balance: GHC ${bankBalance.toFixed(2)}`);
  console.log("Date: 2025-08-29 10:51:46 PM");
  console.log("Transaction ID: " + txnId);
  console.log("================================\n");
  
  showMenu();
}

function seven() {
  console.clear();
  console.log("================================");
  console.log("Option 7");
  console.log("================================");
  console.log("This option is under development");
  console.log("================================\n");
  
  showMenu();
}

function showMenu() {
  const continueChoice = prompt("1) Menu  2) Exit");
  
  if (continueChoice === "1") {
    main();
  } else if (continueChoice === "2") {
    console.clear();
    console.log("================================");
    console.log("System Exit");
    console.log("Thank you for using MoMo App!");
    console.log("================================");
  } else {
    main();
  }
}

// Start the application
console.clear();
console.log("================================");
console.log("Welcome to MoMo Money Transfer App");
console.log("================================\n");
momoUser();


