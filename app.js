const STORAGE_KEY = "finance_transactions_v1";

const form = document.getElementById("transaction-form");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");
const filterType = document.getElementById("filter-type");

let transactions = loadTransactions();

function loadTransactions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderSummary() {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;

  incomeEl.textContent = formatCurrency(income);
  expenseEl.textContent = formatCurrency(expense);
  balanceEl.textContent = formatCurrency(balance);
}

function renderTransactions() {
  const activeFilter = filterType.value;
  transactionList.innerHTML = "";

  const filtered =
    activeFilter === "all"
      ? transactions
      : transactions.filter((item) => item.type === activeFilter);

  if (filtered.length === 0) {
    transactionList.innerHTML = "<li>Nenhum lançamento encontrado.</li>";
    return;
  }

  filtered
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((item) => {
      const li = document.createElement("li");
      li.className = "transaction-item";
      li.innerHTML = `
        <div>
          <strong>${item.description}</strong><br />
          <small>${item.category}</small>
        </div>
        <span class="transaction-amount ${item.type}">${
          item.type === "expense" ? "-" : "+"
        } ${formatCurrency(item.amount)}</span>
        <button class="remove-btn" data-id="${item.id}">Excluir</button>
      `;
      transactionList.appendChild(li);
    });
}

function render() {
  renderSummary();
  renderTransactions();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);

  const description = data.get("description").toString().trim();
  const amount = Number(data.get("amount"));
  const type = data.get("type").toString();
  const category = data.get("category").toString().trim();

  if (!description || !category || !amount || amount <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  transactions.push({
    id: crypto.randomUUID(),
    description,
    amount,
    type,
    category,
    createdAt: Date.now(),
  });

  saveTransactions();
  render();
  form.reset();
});

filterType.addEventListener("change", renderTransactions);

transactionList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const id = target.dataset.id;
  if (!id) {
    return;
  }

  transactions = transactions.filter((item) => item.id !== id);
  saveTransactions();
  render();
});

render();
