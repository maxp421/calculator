const btnsGrid = document.querySelector(".btns-grid");
const btns = btnsGrid.children;
const inputString = document.querySelector("#inputString");
const outputString = document.querySelector("#outputString");
let enter = false;

btnsGrid.addEventListener("click", buttonClick);
document.documentElement.addEventListener("keydown", (e) => {
  if (e.key === "/") e.preventDefault();
  keyboardInput(e);
});

//Need to classify keys which are just textcontent = inputString and which have special functions
//
//= should work on key = and enter. If there are multiple keys used on one
//button we need a list with key + operation pairs, multiple keys having same
//operation?
//clearEntry should work on key delete

const keyOperations = {
  Backspace: function (inputString) {
    return (inputString = inputString.slice(0, inputString.length - 1));
  },
  Delete: function () {
    return "";
  },
  Enter: function (inputString) {
    outputString.textContent = inputString;
    enter = true;
    return inputString;
  },
};

function buttonClick(e) {
  if (!e.currentTarget.contains(e.target) || e.target.nodeName !== "BUTTON") {
    return;
  }

  console.log(e.target.dataset);
  userInput(e.target.dataset.key);
}

function keyboardInput(e) {
  //Add '=' as enter alternative.
  console.log(e);
  for (const btn of btns) {
    if (btn.dataset.key === e.key) {
      userInput(e.key);
      btn.classList.add("btn--green--active");
      setTimeout(() => {
        btn.classList.remove("btn--green--active");
      }, 100);
    }
  }
}

function userInput(key) {
  if (
    inputString.textContent.length === 57 &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "Enter"
  ) {
    alert("reached maximum limit of characters");
    return;
  }
  if (enter === true) {
    inputString.textContent = "";
    outputString.textContent = "";
    enter = false;
  }

  if (keyOperations[key]) {
    inputString.textContent = keyOperations[key](inputString.textContent);
  } else if (key) {
    for (const btn of btns) {
      if (btn.dataset.key === key)
        inputString.textContent += btn.dataset.character;
    }
  }
}