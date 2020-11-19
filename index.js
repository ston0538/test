const add = document.querySelector(".input_wrap button.add");
const del = document.querySelector(".input_wrap button.delete");
const input = document.querySelector('input[name="name"]');
const quantity = document.querySelector('input[name="quantity"]');
const tableRoot = document.querySelector(".table_tbody");
const tableTr = document.querySelector(".table_tbody tr");

document.addEventListener("DOMContentLoaded", getItems);
function addItem(event) {
  event.preventDefault();
  event.stopPropagation();
  const nameValue = input.value;
  const quantityValue = parseInt(quantity.value, 10);
  const item = newItem(nameValue, quantityValue);
  const state = quantityState(item.items());
  console.log(state);
  if (state) {
    updateQuantity(item.items());
  } else {
    saveLocalItems(item.items());
  }
}

function localStorageStore() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

function updateQuantity(item) {
  const items = localStorageStore();
  const newItems = items.map((product) => {
    return product.name === item.name
      ? { ...product, quantity: product.quantity + item.quantity }
      : product;
  });
  console.log(newItems);
  localStorage.setItem("items", JSON.stringify(newItems));
}

function quantityState(item) {
  const items = localStorageStore();
  const findName = (product) => product.name === item.name;
  return items.every(findName);
}
function saveLocalItems(item) {
  const items = localStorageStore();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}
function newItem(nameArgs, quantityArgs) {
  function name() {
    return nameArgs;
  }
  function quantity() {
    return quantityArgs;
  }
  function items() {
    return { name: name(), quantity: quantity() };
  }
  return Object.freeze({
    name: name(),
    quantity: quantity(),
    items,
  });
}

function getItems() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  if (items.length > 0) {
    items.forEach((item) => {
      const tr = document.createElement("tr");
      const name = document.createElement("td");
      const quantityEle = document.createElement("td");
      name.innerText = item.name;
      tr.appendChild(name);
      quantityEle.innerText = item.quantity;
      tr.appendChild(quantityEle);
      tableRoot.appendChild(tr);
    });
  }
}
function deleteItem() {
  localStorage.removeItem("items");
}
add.addEventListener("click", addItem);
del.addEventListener("click", deleteItem);
