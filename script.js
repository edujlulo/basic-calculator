let buttons = document.querySelectorAll(".button");
let input = document.querySelector(".screen");

input.value = 0;
let resultShown = true;

// Click to buttons with the mouse

buttons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (
      !["button-equal", "button-delete", "button-AC"].some((cls) =>
        btn.classList.contains(cls)
      )
    ) {
      let t = btn.getAttribute("data-text");

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

// del and AC buttons

document.querySelector(".button-delete").addEventListener("click", function () {
  let value = input.value.split("");
  value.pop();
  input.value = value.join("");
});

document.querySelector(".button-AC").addEventListener("click", function () {
  input.value = 0;
  resultShown = true;
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
