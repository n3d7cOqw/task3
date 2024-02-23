const elem = $('#createOrUpdateForm')

function clearForm (form) {
  const clearForm = $(form);
  const inputs = clearForm.find('input');
  inputs.val('');
  if (form === '#createOrUpdateForm') {
    $('#role').val('0');
    $('#status').prop('checked', false);
  }
}

function changeCheckBoxCondition (event) {
  const checkBox = $('#selectAllCheckbox')
  const checkBoxes = $('input[id="selectUser"]');
  console.log(checkBoxes)
  if (checkBox.val() === 'off') {
    checkBoxes.each(function () {
      $(this).prop("checked", true);
    })
    checkBox.val("on")
  } else if (checkBox.val() === 'on') {
    checkBoxes.each(function () {
      $(this).prop("checked", false);
    })
    checkBox.val("off")
  }
}

function changeActionSingleDelete (action, user, id) {
  const form = $('#deleteForm');
  const div = $('.modal-confirm-message');
  if ($('#user_' + id).length !== 0) {
    div.html('Are you sure want to delete ' + user);
    form.attr('action', action);
  } else {
    form.attr('action', 'error');
    div.html('Are you sure want to delete ' + user);
  }

}

function deleteErrors () {
  $('#name_error').html("")
  $('#surname_error').html("")
  $('#role_error').html("")
  $('#user_error').html("")

}

function changeAction(action, msg = '', info = null) {

  clearForm('#createOrUpdateForm');
  deleteErrors();

  elem.attr('action', action);
  console.log(elem.attr('action', action))
  $('#createUpdateModalSubmitButton').html(msg);
  $('#createUpdateModalTitle').html(msg + ' User');
  if (info != null) {
    $('#name').val(info[0]);
    $('#last_name').val(info[1]);
    $('#role').val(info[2]);
    $('#status').prop('checked', info[3] == '1');
    $('#id').val(info[4]);
  }
}

function closeModal (elem) {
  const modal = bootstrap.Modal.getOrCreateInstance(`${elem}`)
  deleteErrors()
  modal.hide()
}

function errorAlertMessage (message) {
  const modal = bootstrap.Modal.getOrCreateInstance(`#errorAlert`)
  const modalAlertErrorMessage = document.getElementById('modalAlertErrorMessage')
  modalAlertErrorMessage.innerHTML = message
  modal.show()
}