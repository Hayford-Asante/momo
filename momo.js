let balance = 1000.0;
let bankBalance = 300.0;

const ui = {
  status: document.getElementById("status"),
  menu: document.getElementById("menu"),
  form: document.getElementById("action-form"),
  fields: document.getElementById("form-fields"),
  submitButton: document.getElementById("submit-btn"),
  backButton: document.getElementById("back-btn"),
  mobileBalance: document.getElementById("mobile-balance"),
  bankBalance: document.getElementById("bank-balance"),
};

let currentAction = null;

function init() {
  ui.form.addEventListener("submit", handleFormSubmit);
  ui.backButton.addEventListener("click", () => {
    if (currentAction === "main") {
      main();
    } else {
      moneyTransfer();
    }
  });
  updateBalances();
  main();
}

function updateBalances() {
  ui.mobileBalance.textContent = `GHC ${balance.toFixed(2)}`;
  ui.bankBalance.textContent = `GHC ${bankBalance.toFixed(2)}`;
}

function showStatus(title, details, type = "info") {
  const detailItems = details.map((detail) => `<li>${detail}</li>`).join("");
  ui.status.innerHTML = `
    <div class="status-card ${type}">
      <h3>${title}</h3>
      <ul>${detailItems}</ul>
    </div>
  `;
}

function renderMenu(buttons) {
  ui.menu.innerHTML = buttons
    .map(
      (button) => `
    <button type="button" class="menu-btn" data-action="${button.action}">
      ${button.label}
    </button>
  `,
    )
    .join("");

  ui.menu.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener(
      "click",
      () => button.dataset.action && window[button.dataset.action](),
    );
  });
}

function renderForm(title, fields, actionName, submitLabel = "Continue") {
  currentAction = actionName || "custom";
  ui.form.dataset.active = currentAction;
  ui.submitButton.textContent = submitLabel;
  ui.fields.innerHTML = `
    <h3>${title}</h3>
    ${fields
      .map(
        (field) => `
      <label>
        <span>${field.label}</span>
        <input type="${field.type || "text"}" name="${field.name}" ${field.placeholder ? `placeholder="${field.placeholder}"` : ""} ${field.step ? `step="${field.step}"` : ""} ${field.required ? "required" : ""} />
      </label>
    `,
      )
      .join("")}
  `;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(ui.form);
  const values = Object.fromEntries(formData.entries());

  if (currentAction === "momoUserTransfer") {
    handleMomoTransfer(values);
  } else if (currentAction === "nonMomouser") {
    handleNonMomoTransfer(values);
  } else if (currentAction === "otherNetworkTransfer") {
    handleOtherNetworkTransfer(values);
  } else if (currentAction === "walletToBankTransfer") {
    handleWalletToBankTransfer(values);
  } else if (currentAction === "bankToWalletTransfer") {
    handleBankToWalletTransfer(values);
  } else if (currentAction === "favourite") {
    handleFavourite(values);
  }
}

function main() {
  currentAction = "main";
  showStatus("Unlock more deals, try our new MoMo App", [
    "Transfer Money",
    "MoMoPay & Pay Bill",
    "Airtime & Bundles",
    "Allow cash out",
    "Financial",
  ]);
  renderMenu([
    { label: "Transfer Money", action: "moneyTransfer" },
    { label: "MoMoPay & Pay Bill", action: "showComingSoon" },
    { label: "Airtime & Bundles", action: "showComingSoon" },
    { label: "Allow cash out", action: "showComingSoon" },
    { label: "Financial", action: "showComingSoon" },
  ]);
  ui.fields.innerHTML = "";
}

function moneyTransfer() {
  currentAction = "moneyTransfer";
  showStatus("More offers await on the MoMo App", [
    "MoMo User",
    "Non MoMo User",
    "Send with care",
    "Favorite",
    "Other Network",
    "Bank Account",
    "Seven",
  ]);
  renderMenu([
    { label: "MoMo User", action: "momoUserTransfer" },
    { label: "Non MoMo User", action: "nonMomouser" },
    { label: "Send with care", action: "sendWithcare" },
    { label: "Favorite", action: "favourite" },
    { label: "Other Network", action: "otherNetwork" },
    { label: "Bank Account", action: "bank" },
    { label: "Seven", action: "seven" },
  ]);
  ui.fields.innerHTML = "";
}

function momoUserTransfer() {
  renderForm(
    "MoMo User Transfer",
    [
      { label: "Enter Mobile Number", name: "number", type: "tel" },
      {
        label: "Enter Amount (GHC)",
        name: "amount",
        type: "number",
        step: "0.01",
      },
      { label: "Enter Reference", name: "reference", type: "text" },
      { label: "Enter PIN (MM) to confirm", name: "pin", type: "password" },
    ],
    "momoUserTransfer",
  );
  showStatus("MoMo User Transfer", [
    "Please enter the transfer details below.",
  ]);
}

function handleMomoTransfer(data) {
  const amount = parseFloat(data.amount);
  if (!amount || amount <= 0) {
    showStatus(
      "Invalid Amount",
      ["Please enter a valid amount greater than zero."],
      "error",
    );
    return;
  }

  if (data.pin !== "1234") {
    showStatus("Incorrect PIN", ["The PIN you entered is incorrect."], "error");
    return;
  }

  const feeAmt = amount * 0.007;
  const taxAmt = amount * 0.01;
  const totalAmt = amount + feeAmt + taxAmt;

  if (totalAmt > balance) {
    showStatus(
      "Insufficient Balance",
      [
        `Your mobile wallet balance is GHC ${balance.toFixed(2)}`,
        `The transfer needs GHC ${totalAmt.toFixed(2)}`,
      ],
      "error",
    );
    return;
  }

  balance -= totalAmt;
  updateBalances();
  const txnId = Math.floor(Math.random() * 1000000);
  showStatus(
    "✓ Transaction Successful",
    [
      `You have sent GHC ${amount.toFixed(2)} to HAYFORD ASANTE ADDE.`,
      `Fee: GHC ${feeAmt.toFixed(2)}`,
      `Tax: GHC ${taxAmt.toFixed(2)}`,
      `Your balance is GHC ${balance.toFixed(2)}`,
      `Transaction ID: ${txnId}`,
    ],
    "success",
  );
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function nonMomouser() {
  renderForm(
    "Non MoMo User Transfer",
    [
      { label: "Enter receiver Name", name: "name", type: "text" },
      { label: "Enter Amount", name: "amount", type: "number", step: "0.01" },
      { label: "Enter Reference", name: "reference", type: "text" },
      { label: "Enter Secret Code", name: "secretCode1", type: "password" },
      { label: "Confirm Secret Code", name: "secretCode2", type: "password" },
      { label: "Enter PIN (MM) to confirm", name: "pin", type: "password" },
    ],
    "nonMomouser",
  );
  showStatus("Non MoMo User Transfer", [
    "Please fill in the details to continue.",
  ]);
}

function handleNonMomoTransfer(data) {
  if (data.secretCode1 !== data.secretCode2) {
    showStatus("Invalid Input", ["The secret codes do not match."], "error");
    return;
  }

  const amount = parseFloat(data.amount);
  if (!amount || amount <= 0) {
    showStatus(
      "Invalid Amount",
      ["Please enter a valid amount greater than zero."],
      "error",
    );
    return;
  }

  if (data.pin !== "1234") {
    showStatus("Incorrect PIN", ["The PIN you entered is incorrect."], "error");
    return;
  }

  const feeAmt = amount * 0.007;
  const taxAmt = amount * 0.01;
  const totalAmt = amount + feeAmt + taxAmt;
  balance -= totalAmt;
  updateBalances();
  const txnId = Math.floor(Math.random() * 1000000);
  showStatus(
    "✓ Transaction Successful",
    [
      `You have sent GHC ${amount.toFixed(2)} to ${data.name}.`,
      `Fee: GHC ${feeAmt.toFixed(2)}`,
      `Tax: GHC ${taxAmt.toFixed(2)}`,
      `Your balance is GHC ${balance.toFixed(2)}`,
      `Transaction ID: ${txnId}`,
    ],
    "success",
  );
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function sendWithcare() {
  showStatus(
    "Send With Care (SwC)",
    [
      "The SwC product will be unavailable till 30/06/2026.",
      "To view your caretaker, beneficiary, balances or claims, please use WhatsApp on 0243486849.",
    ],
    "info",
  );
  ui.fields.innerHTML = "";
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function favourite() {
  renderForm(
    "Favourite Contacts",
    [
      { label: "Enter Name", name: "name", type: "text" },
      { label: "Enter PIN", name: "pin", type: "password" },
    ],
    "favourite",
  );
  showStatus("Favourite Contacts", ["Enter a name and PIN to search."]);
}

function handleFavourite(data) {
  if (data.pin !== "1234") {
    showStatus("Incorrect PIN", ["The PIN you entered is incorrect."], "error");
    return;
  }
  showStatus(
    "No contact found",
    [`No contact was found for ${data.name || "that entry"}.`],
    "info",
  );
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function otherNetwork() {
  currentAction = "otherNetwork";
  showStatus("Transfer Money To Other Network", ["Choose a network below."]);
  renderMenu([
    { label: "AT", action: "selectNetworkAT" },
    { label: "Telecel", action: "selectNetworkTelecel" },
    { label: "E-zwich", action: "selectNetworkEzwich" },
    { label: "G-Money", action: "selectNetworkGMoney" },
    { label: "Zeepay", action: "selectNetworkZeepay" },
    { label: "GhanaPay", action: "selectNetworkGhanaPay" },
    { label: "Back", action: "moneyTransfer" },
  ]);
  ui.fields.innerHTML = "";
}

function selectNetworkAT() {
  processOtherNetworkTransfer("AT");
}
function selectNetworkTelecel() {
  processOtherNetworkTransfer("Telecel");
}
function selectNetworkEzwich() {
  processOtherNetworkTransfer("E-zwich");
}
function selectNetworkGMoney() {
  processOtherNetworkTransfer("G-Money");
}
function selectNetworkZeepay() {
  processOtherNetworkTransfer("Zeepay");
}
function selectNetworkGhanaPay() {
  processOtherNetworkTransfer("GhanaPay");
}

function processOtherNetworkTransfer(network) {
  renderForm(
    `${network} Transfer`,
    [
      { label: "Enter Mobile Number", name: "number", type: "tel" },
      {
        label: "Enter Amount (GHC)",
        name: "amount",
        type: "number",
        step: "0.01",
      },
      { label: "Enter Reference", name: "reference", type: "text" },
      { label: "Enter PIN (MM) to confirm", name: "pin", type: "password" },
    ],
    "otherNetworkTransfer",
  );
  currentAction = "otherNetworkTransfer";
  showStatus(`${network} Transfer`, ["Enter the transfer details below."]);
  ui.form.dataset.network = network;
}

function handleOtherNetworkTransfer(data) {
  const network = ui.form.dataset.network || "Other Network";
  const amount = parseFloat(data.amount);
  if (!amount || amount <= 0) {
    showStatus(
      "Invalid Amount",
      ["Please enter a valid amount greater than zero."],
      "error",
    );
    return;
  }

  if (data.pin !== "1234") {
    showStatus("Incorrect PIN", ["The PIN you entered is incorrect."], "error");
    return;
  }

  const feeAmt = amount * 0.007;
  const taxAmt = amount * 0.01;
  const totalAmt = amount + feeAmt + taxAmt;
  balance -= totalAmt;
  updateBalances();
  const txnId = Math.floor(Math.random() * 1000000);
  showStatus(
    "✓ Transaction Successful",
    [
      `You have sent GHC ${amount.toFixed(2)} to HAYFORD ASANTE ADDE via ${network}.`,
      `Fee: GHC ${feeAmt.toFixed(2)}`,
      `Tax: GHC ${taxAmt.toFixed(2)}`,
      `Your balance is GHC ${balance.toFixed(2)}`,
      `Transaction ID: ${txnId}`,
    ],
    "success",
  );
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function bank() {
  showStatus("GHIPSS Bank Transfer Service", [
    "Choose a transfer direction below.",
  ]);
  renderMenu([
    { label: "Wallet to Bank Account", action: "walletToBank" },
    { label: "Bank Account to your Wallet", action: "bankToWallet" },
    { label: "Back", action: "moneyTransfer" },
  ]);
  ui.fields.innerHTML = "";
}

function walletToBank() {
  currentAction = "walletToBank";
  showStatus("Select Bank", ["Choose your bank below."]);
  renderMenu([
    { label: "STANCHART", action: "selectBankStanchart" },
    { label: "ABSA", action: "selectBankAbsa" },
    { label: "GCB", action: "selectBankGcb" },
    { label: "FIDELITY", action: "selectBankFidelity" },
    { label: "CAL", action: "selectBankCal" },
    { label: "ADB", action: "selectBankAdb" },
    { label: "ECOBANK", action: "selectBankEcobank" },
  ]);
  ui.fields.innerHTML = "";
}

function selectBankStanchart() {
  processWalletToBankTransfer("STANCHART");
}
function selectBankAbsa() {
  processWalletToBankTransfer("ABSA");
}
function selectBankGcb() {
  processWalletToBankTransfer("GCB");
}
function selectBankFidelity() {
  processWalletToBankTransfer("FIDELITY");
}
function selectBankCal() {
  processWalletToBankTransfer("CAL");
}
function selectBankAdb() {
  processWalletToBankTransfer("ADB");
}
function selectBankEcobank() {
  processWalletToBankTransfer("ECOBANK");
}

function processWalletToBankTransfer(bank) {
  renderForm(
    `${bank} Transfer`,
    [
      {
        label: "Enter Bank Account Number",
        name: "accountNumber",
        type: "text",
      },
      {
        label: "Enter Amount to Transfer",
        name: "amount",
        type: "number",
        step: "0.01",
      },
      { label: "Enter Reference ID", name: "reference", type: "text" },
      { label: "Enter PIN (MM) to confirm", name: "pin", type: "password" },
    ],
    "walletToBankTransfer",
  );
  currentAction = "walletToBankTransfer";
  showStatus(`${bank} - Wallet to Bank Transfer`, [
    "Enter your bank transfer details below.",
  ]);
  ui.form.dataset.bank = bank;
}

function handleWalletToBankTransfer(data) {
  const bank = ui.form.dataset.bank || "Selected Bank";
  const amount = parseFloat(data.amount);
  if (!amount || amount <= 0) {
    showStatus(
      "Invalid Amount",
      ["Please enter a valid amount greater than zero."],
      "error",
    );
    return;
  }
  if (data.pin !== "1234") {
    showStatus("Incorrect PIN", ["The PIN you entered is incorrect."], "error");
    return;
  }

  const feeAmt = amount * 0.007;
  const taxAmt = amount * 0.01;
  const totalAmt = amount + feeAmt + taxAmt;
  if (totalAmt > balance) {
    showStatus(
      "Insufficient Balance",
      [
        `Your mobile wallet balance is GHC ${balance.toFixed(2)}`,
        `The transfer needs GHC ${totalAmt.toFixed(2)}`,
      ],
      "error",
    );
    return;
  }

  balance -= totalAmt;
  bankBalance += totalAmt;
  updateBalances();
  const txnId = Math.floor(Math.random() * 1000000);
  showStatus(
    "✓ Transaction Successful",
    [
      `You have transferred GHC ${amount.toFixed(2)} to your bank account.`,
      `Bank: ${bank}`,
      `Fee: GHC ${feeAmt.toFixed(2)}`,
      `Tax: GHC ${taxAmt.toFixed(2)}`,
      `Mobile Balance: GHC ${balance.toFixed(2)}`,
      `Bank Balance: GHC ${bankBalance.toFixed(2)}`,
      `Transaction ID: ${txnId}`,
    ],
    "success",
  );
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function bankToWallet() {
  currentAction = "bankToWallet";
  showStatus("Select Bank", ["Choose the bank account to withdraw from."]);
  renderMenu([
    { label: "STANCHART", action: "selectBankToWalletStanchart" },
    { label: "ABSA", action: "selectBankToWalletAbsa" },
    { label: "GCB", action: "selectBankToWalletGcb" },
    { label: "FIDELITY", action: "selectBankToWalletFidelity" },
    { label: "CAL", action: "selectBankToWalletCal" },
    { label: "ADB", action: "selectBankToWalletAdb" },
    { label: "ECOBANK", action: "selectBankToWalletEcobank" },
  ]);
  ui.fields.innerHTML = "";
}

function selectBankToWalletStanchart() {
  processBankToWalletTransfer("STANCHART");
}
function selectBankToWalletAbsa() {
  processBankToWalletTransfer("ABSA");
}
function selectBankToWalletGcb() {
  processBankToWalletTransfer("GCB");
}
function selectBankToWalletFidelity() {
  processBankToWalletTransfer("FIDELITY");
}
function selectBankToWalletCal() {
  processBankToWalletTransfer("CAL");
}
function selectBankToWalletAdb() {
  processBankToWalletTransfer("ADB");
}
function selectBankToWalletEcobank() {
  processBankToWalletTransfer("ECOBANK");
}

function processBankToWalletTransfer(bank) {
  renderForm(
    `${bank} Transfer`,
    [
      {
        label: "Enter Amount to Transfer",
        name: "amount",
        type: "number",
        step: "0.01",
      },
      { label: "Enter Reference ID", name: "reference", type: "text" },
      { label: "Enter PIN (MM) to confirm", name: "pin", type: "password" },
    ],
    "bankToWalletTransfer",
  );
  currentAction = "bankToWalletTransfer";
  showStatus(`${bank} - Bank to Wallet Transfer`, [
    "Enter the transfer details below.",
  ]);
  ui.form.dataset.bank = bank;
}

function handleBankToWalletTransfer(data) {
  const bank = ui.form.dataset.bank || "Selected Bank";
  const amount = parseFloat(data.amount);
  if (!amount || amount <= 0) {
    showStatus(
      "Invalid Amount",
      ["Please enter a valid amount greater than zero."],
      "error",
    );
    return;
  }
  if (data.pin !== "1234") {
    showStatus("Incorrect PIN", ["The PIN you entered is incorrect."], "error");
    return;
  }

  const feeAmt = amount * 0.007;
  const taxAmt = amount * 0.01;
  const totalAmt = amount + feeAmt + taxAmt;
  if (totalAmt > bankBalance) {
    showStatus(
      "Insufficient Bank Balance",
      [
        `Your bank balance is GHC ${bankBalance.toFixed(2)}`,
        `The transfer needs GHC ${totalAmt.toFixed(2)}`,
      ],
      "error",
    );
    return;
  }

  bankBalance -= totalAmt;
  balance += totalAmt;
  updateBalances();
  const txnId = Math.floor(Math.random() * 1000000);
  showStatus(
    "✓ Transaction Successful",
    [
      `You have transferred GHC ${amount.toFixed(2)} from ${bank} to your wallet.`,
      `Fee: GHC ${feeAmt.toFixed(2)}`,
      `Tax: GHC ${taxAmt.toFixed(2)}`,
      `Mobile Balance: GHC ${balance.toFixed(2)}`,
      `Bank Balance: GHC ${bankBalance.toFixed(2)}`,
      `Transaction ID: ${txnId}`,
    ],
    "success",
  );
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function seven() {
  showStatus("Option 7", ["This option is still under development."], "info");
  ui.fields.innerHTML = "";
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

function showComingSoon() {
  showStatus("Coming Soon", ["This option is not available yet."], "info");
  ui.fields.innerHTML = "";
  renderMenu([{ label: "Back to Main Menu", action: "main" }]);
}

function showMenu() {
  renderMenu([
    { label: "Back to Transfer Menu", action: "moneyTransfer" },
    { label: "Back to Main Menu", action: "main" },
  ]);
}

init();
