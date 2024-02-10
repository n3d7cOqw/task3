$(document).ready(function () {
  $('#deleteForm').on('submit', function (event) {
    event.preventDefault()
    const action = document.getElementById("deleteForm").action
    closeModal('#deleteModal');
    $.post(action, $(this).serialize())
  })
})

$(document).ready(function () {
  $('#createOrUpdateForm').on('submit', function (event) {
    event.preventDefault()
    closeModal("#createOrUpdate");
    $.post(elem.action, $(this).serialize())
  })
})

$(document).ready(function () {
  $('#multipleEdit').on('submit', function (event) {
    event.preventDefault()
    const checkBoxes = document.querySelectorAll('#selectUser')
    const selectedCheckBoxesIds = []
    if (document.getElementById("selectAction").value == 0){
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`);
      msg = document.querySelector(".modal-body-alert");
      msg.innerHTML = "Select action!"
      modal.show()
    }

    checkBoxes.forEach(function (elem) {
      if (elem.checked) {
        selectedCheckBoxesIds.push(elem.value)
      }
    })

    if (selectedCheckBoxesIds.length === 0){
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`);
      const msg = document.querySelector(".modal-body-alert");
      msg.innerHTML = "Select users!"
      modal.show()
    }

    if (document.getElementById("selectAction").value == "delete" && selectedCheckBoxesIds.length > 0){
        const form = document.getElementById("deleteMultipleForm");
        const msg = document.querySelector(".modal-delete-confirm");
        const modalDelete = bootstrap.Modal.getOrCreateInstance(`#deleteMultipleModal`);

        msg.innerHTML = "Are you sure that you want delete " + selectedCheckBoxesIds.length + " users?"
        form.action = "/multiple-edit"
        modalDelete.show();
        $('#deleteMultipleForm').on('submit', function (event) {
          event.preventDefault()
          closeModal('#deleteMultipleModal');
          $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() })
        });
    }else{
      $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() })
    }
  })
})