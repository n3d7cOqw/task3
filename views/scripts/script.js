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

function clearForm(form){
  const clearForm = document.querySelector(form)
  const inputs = clearForm.querySelectorAll("input")
  inputs.forEach(elem => elem.value = "")
  if (form === "#createOrUpdateForm"){
    document.querySelector("#role").value = "0"
    document.querySelector("#status").checked = 0
  }
}

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
  let id = action.split("/")
  console.log(document.getElementById("user_" + id[2]))
  if (document.getElementById("user_" + id[2]) !== null){
    const form = document.getElementById('deleteForm')
    const div = document.querySelector('.modal-confirm-message')
    div.innerHTML = 'Are you sure want to delete ' + user
    form.action = action
  }
  else{
    document.getElementById('deleteForm').action = "error"
    const div = document.querySelector('.modal-confirm-message')
    div.innerHTML = 'Are you sure want to delete ' + user
  }

}

function deleteErrors(){
  document.getElementById("name_error").innerHTML = "";
  document.getElementById("surname_error").innerHTML = "";
  document.getElementById("role_error").innerHTML = "";
  document.getElementById('user_error').innerHTML = "";

}

function changeAction (action,  msg = "", info = null){
  clearForm("#createOrUpdateForm")
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
    status.checked = info[3] === "1";
  }
}

function closeModal (elem) {
  const modal = bootstrap.Modal.getOrCreateInstance(`${elem}`);
  deleteErrors()
  modal.hide()
}

function errorAlertMessage(message){
  const modal = bootstrap.Modal.getOrCreateInstance(`#errorAlert`)
  const modalAlertErrorMessage = document.getElementById("modalAlertErrorMessage");
  modalAlertErrorMessage.innerHTML = message
  modal.show()
}

function outInMultiForm (count, value){
  if (count === 1){
    return `1 user`
  }else{
    return `${count} users`
  }
}

