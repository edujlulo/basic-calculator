let buttons = document.querySelectorAll(".button");
let input = document.querySelector(".screen");

let resultShown = false;

// Click to buttons with the mouse

buttons.forEach(function (butt) {
  butt.addEventListener("click", function () {
    if (!butt.classList.contains("button-equal")) {
      let t = butt.getAttribute("data-text");

      if (resultShown) {
        // Clean input if just was shown a result and is not a symbol
        if (!isNaN(t) || t === "." || t === "(" || t === ")") {
          input.value = "";
        }
        resultShown = false;
      }

      if (t) input.value += t;
    }
  });
});

// Resolve operation with = button

document.querySelector(".button-equal").addEventListener("click", function () {
  try {
    let operation = input.value;
    // Only if there is something to evaluate
    if (operation.trim() !== "") {
      input.value = eval(operation);
      resultShown = true;
    } else {
      input.value = "0";
      resultShown = true;
    }
  } catch (error) {
    input.value = "Error";
    resultShown = true;
  }
});

// Detect keys from the keyboard

document.addEventListener("keydown", calculation);

function calculation(e) {
  const validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "=",
    "+",
    "-",
    "/",
    "*",
    ".",
    "(",
    ")",
  ];

  if (validKeys.includes(e.key)) {
    let button1 = document.querySelector(`.button[data-text='${e.key}']`);
    if (button1) {
      button1.click();
      // Activate the press animation
      button1.classList.add("activo");
      setTimeout(() => {
        button1.classList.remove("activo");
      }, 100);
    }
  } else if (e.key === "Enter") {
    document.querySelector(".button-equal").click();
  }
}

const input2 = [
  { product: "Laptop", price: 1200, units: 2 },
  { product: "Smartphone", price: 600, units: 1 },
  { product: "Laptop", price: 1000, units: 1 },
  { product: "Tablet", price: 800, units: 2 },
  { product: "Laptop", price: 1500, units: 2 },
  { product: "Smartphone", price: 500, units: 3 },
];

let newArr = [];
let newObj = {};
let byProduct = {};

for (let producto of input2) {
  if (!newArr.includes(producto.product)) {
    newArr.push(producto.product);
  }
}

for (let producto of newArr) {
  let totalPricePerProduct = 0;
  for (let producto2 of input2) {
    if (producto2.product === producto) {
      totalPricePerProduct += producto2.price * producto2.units;
    }
  }
  byProduct[producto] = totalPricePerProduct;
}

function sumarPrecios() {}

let totalProductsPrice = 0;

for (let i = 0; i < input2.length; i++) {
  totalProductsPrice += input2[i].price * input2[i].units;
}

let resultado = {};

resultado["totalProductsPrice"] = totalProductsPrice;
resultado["byProduct"] = byProduct;

console.log(resultado);

// {
// totalProductsPrice: 10100,
// byProduct: {
// Laptop: 5400,
// Smartphone: 2100,
// Tablet: 1600
// }
// }
