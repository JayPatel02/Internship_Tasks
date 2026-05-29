async function displayData(field, option = "") {
  let res = await fetch(`/preLoadData?field=${field}&option=${option}`);
  let data = await res.json();
  let element = document.getElementById(data.fieldName + "Area");

  if (data.tagName == "radio") {
    element.innerHTML = `<label for="">${data.fieldName}</label>`;
    data.optionData.forEach((e) => {
      element.innerHTML += `<input type=${data.tagName} name=${data.fieldName} value=${e.option_value} checked> 
            <label for="">${e.option_label}</label>`;
    });
  }
  if (data.tagName == "select") {
    element.innerHTML = `<label for="">${data.fieldName}</label>`;

    let options = data.optionData.map((res) => {
      return `<option value=${res.option_value}>${res.option_label}</option>`;
    });

    element.innerHTML += `<select name="${data.fieldName}">
        ${options}
        </select>`;
  }
}

async function displayGrid(field) {
  if (field == "Lang") {
    option = "Lang_option";
  }
  if (field == "Tech") {
    option = "Tech_option";
  }

  let selectRes = await fetch(`/preLoadData?field=${field}`);
  let selectData = await selectRes.json();
  // console.log(selectData)

  let optionRes = await fetch(`/preLoadData?field=${field}&option=${option}`);
  let optionValue = await optionRes.json();
  // console.log(optionValue)

  let element = document.getElementById(selectData.fieldName + "tbl");

  let header = optionValue.optionData
    .map((option) => {
      return `<td>${option.option_value}</td>`;
    })
    .join("");

  element.innerHTML = `<tr><td></td>${header}</tr>`;

  selectData.optionData.forEach((ele) => {
    let body = "";
    if (optionValue.tagName == "checkbox") {
      body = optionValue.optionData
        .map((t) => {
          return `<td><input type=${optionValue.tagName} name="${selectData.fieldName}[${ele.option_value}][${t.option_value}]" value="true" class="options"></td>`;
        })
        .join("");
    } else {
      body = optionValue.optionData
        .map((t) => {
          return `<td><input type=${optionValue.tagName} name="${selectData.fieldName}[${ele.option_value}][ability]" value="${t.option_value}" class="options"></td>`;
        })
        .join("");
    }

    let row = `<td><input type=${selectData.tagName} name="${selectData.fieldName}[${ele.option_value}][selected]" class="optionHeading" hidden>
                   <label>${ele.option_value}</label></td>
                   ${body}
                   `;
    // console.log(row)
    element.innerHTML += `<tr class="optionRow">${row}</tr>`;
  });

  element.querySelectorAll(".optionRow").forEach((row) => {
    row.addEventListener("change", () => {
      let isChecked = false;
      row.querySelectorAll(".options").forEach((t) => {
        if (t.checked == true) {
          isChecked = true;
        }
      });
      if (isChecked) {
        row.querySelector(".optionHeading").checked = true;
        isChecked = false;
      } else {
        row.querySelector(".optionHeading").checked = false;
      }
    });
  });
}

window.onload = async () => {
  await displayData("Gender");
  await displayData("Relationship");
  await displayData("Departments");
  await displayData("State");
  await displayGrid("Lang");
  await displayGrid("Tech");
};
