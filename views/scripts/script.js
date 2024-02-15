const elem = document.getElementById('createOrUpdateForm')

window.addEventListener("click", function (e){

  const checkBoxes = document.querySelectorAll("#selectUser")
  const selected = []
  const selectAll = document.getElementById("selectAllCheckbox")

  checkBoxes.forEach(function (elem) {
    if (elem.checked) {
      selected.push(elem.value)
    }
  })

  if (e.target.id  == "selectUser" ){
    selectAll.value = checkBoxes.length === selected.length ? "on" : "off"
    selectAll.checked = checkBoxes.length === selected.length
  }
})

function changeCheckBoxCondition (event) {
  const checkBox = document.getElementById('selectAllCheckbox')
  const checkBoxes = document.querySelectorAll('#selectUser')


  if (checkBox.value === 'off') {
    checkBoxes.forEach(function (elem) {
      elem.checked = true
    })
    checkBox.value = 'on'
  } else if (checkBox.value === 'on') {
    checkBoxes.forEach(function (elem) {
      elem.checked = false
    })
    checkBox.value = 'off'
  }
}

function changeActionSingleDelete (action, user) {
  const form = document.getElementById('deleteForm')
  const div = document.querySelector('.modal-confirm-message')
  div.innerHTML = 'Are you sure want to delete ' + user
  form.action = action
}

function deleteErrors(){
  document.getElementById("name_error").innerHTML = "";
  document.getElementById("surname_error").innerHTML = "";
  document.getElementById("role_error").innerHTML = "";
}

function changeAction (action,  msg = "", info = null) {
  deleteErrors()
  elem.action = action
  document.getElementById("createUpdateModalSubmitButton").innerHTML = msg;
  document.getElementById("createUpdateModalTitle").innerHTML = msg +" User";
  if (info != null){
    const name = document.getElementById("name");
    const last_name = document.getElementById("last_name");
    const role = document.getElementById("role");
    const status = document.getElementById("status");
    name.value = info[0];
    last_name.value = info[1];
    role.value = info[2];
    status.checked = info[3] == "on";
  }
}

function closeModal (elem) {
  const modal = bootstrap.Modal.getOrCreateInstance(`${elem}`);
  modal.hide()
}

document.getElementById("selectAction").addEventListener("change", function (e){
  document.getElementById("bottomSelectAction").value = this.value
})

document.getElementById("bottomSelectAction").addEventListener("change", function (e){
  document.getElementById("selectAction").value = this.value

})