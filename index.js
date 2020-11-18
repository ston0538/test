const tableRoot = document.querySelector(".table_tbody");
const tableTd = document.querySelectorAll(".table_tbody tr td");
const button = document.querySelector(".input_wrap button");
const input = document.querySelector('input[name="name"]');
const quantity = document.querySelector('input[name="quantity"]');
let products = [];
function add(event) {
  event.preventDefault();
  // input 값 받기
  const nameValue = input.value;
  const quantityValue = quantity.value;
  // itemsElements(nameValue, quantityValue);
  console.log(products);
}
function validation(name, quantity) {
  // console.log(products);
  // console.log(name);
  // console.log(quantity);
  const newArray = [];
  products.reduce((acc, currentValue) => {
    console.log(acc);
    console.log(currentValue);
    if (currentValue.name === name) {
      const result2 = {
        ...acc,
        ["name"]: name,
        ["quantity"]: currentValue.quantity + quantity,
      };
      newArray.push(result2);
    } else {
      const result2 = { ...acc, ["name"]: name, ["quantity"]: quantity };
      newArray.push(result2);
    }
  }, {});
  console.log(newArray);
}
function productUpdate(name, quantity, array) {
  const product = Object.create(null);
  product.name = name;
  product.quantity = quantity;
}
function updateValue(e) {
  const result = e.target.value;
  return result;
}
function itemsElements(nameValue, quantityValue) {
  let tr = document.createElement("tr");
  let name = document.createElement("td");
  let quantityEle = document.createElement("td");
  const items = validation(nameValue, quantityValue);
  items.map((item) => {
    tableRoot.appendChild(tr);
    tableRoot.appendChild(name);
    tableRoot.appendChild(quantityEle);
    name.textContent = item.name;
    const numberChange = parseInt(item.quantity, 10);
    quantityEle.textContent = numberChange;
  });
}

button.addEventListener("click", add);
