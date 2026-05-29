let jobForm = document.getElementById("jobForm");
let basicTbl = document.getElementById("basicTbl");
let educationTbl = document.getElementById("Edutbl");
let companyTbl = document.getElementById("Comptbl");
let refTbl = document.getElementById("refTbl");

let strPattern = /^[a-zA-Z\s.]+$/;
let emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]$/;

function valStr(strings) {
  let isValid = true;
  strings.forEach((ele) => {
    let v = ele.value.trim();
    if (v == "" || !strPattern.test(v)) {
      ele.classList.add("error");
      isValid = false;
    } else {
      ele.classList.remove("error");
    }
  });
  return isValid;
}

function valPhNum(nums) {
  let isValid = true;
  nums.forEach((ele) => {
    let v = ele.value;
    if (v == "" || v.length != 10 || !parseInt(v)) {
      ele.classList.add("error");
      isValid = false;
    } else {
      ele.classList.remove("error");
    }
  });
  return isValid;
}

function valDigits(nums) {
  let isValid = true;
  nums.forEach((ele) => {
    let v = ele.value;
    if (v == "" || !parseFloat(v) || !parseInt(v)) {
      ele.classList.add("error");
      isValid = false;
    } else {
      ele.classList.remove("error");
    }
  });
  return isValid;
}

function valEA(email, address1) {
  let isValid = true;
  if (!emailPattern.test(email.value) || email.value == "") {
    email.classList.add("error");
    isValid = false;
  } else {
    email.classList.remove("error");
  }
  if (address1.value == "") {
    address1.classList.add("error");
    isValid = false;
  } else {
    address1.classList.remove("error");
  }
  return isValid;
}

function basicVal() {
  let inputStr = basicTbl.querySelectorAll(".valString");
  let inputPhNum = basicTbl.querySelectorAll(".valPhNum");
  let inputDigits = basicTbl.querySelectorAll(".valDigits");
  let email = document.getElementById("email");
  let address1 = document.getElementById("address1");

  
  let str = valStr(inputStr);
  let ph = valPhNum(inputPhNum);
  let dig = valDigits(inputDigits);
  let checkEA = valEA(email, address1);
  
  if (str && ph && dig && checkEA) {
    return true;
  } else {
    return false;
  }
}

function eduVal() {
  let inputStr = educationTbl.querySelectorAll(".valString");
  let inputDigits = educationTbl.querySelectorAll(".valDigits");

  let str = valStr(inputStr);
  let dig = valDigits(inputDigits);

  if (str && dig) {
    return true;
  } else {
    return false;
  }
}

function compVal() {
  let inputStr = companyTbl.querySelectorAll(".valString");
  let inputPhNum = companyTbl.querySelectorAll(".valPhNum");
  let inputDigits = companyTbl.querySelectorAll(".valDigits");

  let str = valStr(inputStr);
  let ph = valPhNum(inputPhNum);
  let dig = valDigits(inputDigits);

  if (str && ph && dig) {
    return true;
  } else {
    return false;
  }
}

function refVal() {
  let inputStr = refTbl.querySelectorAll(".valString");
  let inputPhNum = refTbl.querySelectorAll(".valPhNum");
  let isValid = true;

  inputStr.forEach((ele) => {
    let v = ele.value.trim();
    if (v != "") {
      if (!strPattern.test(v)) {
        ele.classList.add("error");
        isValid = false;
      } else {
        ele.classList.remove("error");
        isValid = true
      }
    }
  });

  inputPhNum.forEach((num) => {
    let v = num.value.trim();
    if (v != "") {
      if (v == "" || v.length != 10 || !parseInt(v)) {
        num.classList.add("error");
        isValid = false;
      } else {
        num.classList.remove("error");
        isValid = true
      }
    }
  });
  return isValid;
}

jobForm.addEventListener("submit", (e) => {
  if (basicVal() && eduVal() && compVal() && refVal()) {
    jobForm.submit();
  } else {
    e.preventDefault();
  }
});