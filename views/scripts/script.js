const elem = document.getElementById('createOrUpdateForm')

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

function changeAction (action,  msg = "", info = null) {
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