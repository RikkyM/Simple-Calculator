const numbers = document.querySelectorAll("#number");
const arithmetic = document.querySelectorAll(".amt");
const display = document.getElementById("display");
const temp = document.getElementById("temp");
const equals = document.getElementById("equals");
const dot = document.getElementById("dot");
const percent = document.getElementById("percent");
const clearAll = document.getElementById("clear-all");
const del = document.getElementById("delete");

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (display.value === "0") {
      display.value = number.textContent;
    } else {
      display.value += number.textContent;
    }
  });
});

arithmetic.forEach((amt) => {
  amt.addEventListener("click", () => {
    let expression = temp.value
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/−/g, "-");
    if (display.value) {
      display.placeholder = ""
      if (temp.value) {
        if (eval(expression + display.value) === Infinity) {
          display.value = "";
          display.placeholder = "Tidak terdefinisi";
          temp.value = "";
        } else {
          temp.value = eval(expression + display.value) + amt.textContent;
          display.value = "";
        }
      } else {
        temp.value = display.value + amt.textContent;
        display.value = "";
      }
    } else if (temp.value.slice(-1).match(/−|\+|\×|\÷/)) {
      temp.value = temp.value.slice(0, -1) + amt.textContent;
    }
  });
});

percent.addEventListener("click", () => {
  let expression = temp.value
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-");
  let parts = expression.split(/[-+*/]/);
  let tempNilai = parts[parts.length - 2];

  if (display.value) {
    if (temp.value) {
      let prsn;
      if (expression.includes("*") || expression.includes("/")) {
        prsn = display.value / 100;
      } else {
        prsn = (tempNilai / 100) * display.value;
      }
      display.placeholder = eval(expression + prsn)
      display.value = "";
      temp.value = "";
    } else {
      display.value /= 100;
    }
  }
});

equals.addEventListener("click", () => {
  let expression = temp.value
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-");

  if (display.value || display.placeholder) {
    if (temp.value) {
      let result = eval(expression + display.value);
      if (result === Infinity || isNaN(result)) {
        display.placeholder = "Tidak terdefinisi";
      } else {
        display.placeholder = result;
      }
      display.value =""
      temp.value = "";
    } else {
      display.value = display.value;
      temp.value = "";
    }
  } else {
    display.placeholder = temp.value.slice(0, -1)
    temp.value = "";
  }
});

dot.addEventListener("click", () => {
  if (!display.value.includes(".")) {
    if (display.value === "") {
      display.value = "0.";
    } else {
      display.value += dot.textContent;
    }
  }
});

del.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
  if (display.value.slice(-1) == "") {
    display.value = "0";
  }
});

clearAll.addEventListener("click", () => {
  temp.value = "";
  display.value = 0;
});
