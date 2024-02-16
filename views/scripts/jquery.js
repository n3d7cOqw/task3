$(document).ready(function () {
  $('#deleteForm').on('submit', function (event) {
    event.preventDefault()
    const action = document.getElementById('deleteForm').action
    closeModal('#deleteModal')
    $.post(action, $(this).serialize(), function (data) {
      data = JSON.parse(data)
      document.getElementById(data.id).style.display = 'none'
    })
  })
})

$(document).ready(function () {
  $('#createOrUpdateForm').on('submit', function (event) {
    event.preventDefault()

    let postStatus = document.getElementById("status").checked ? "on" : "off"

    $.post(elem.action, {name: $("#name").val(), surname: $("#last_name").val(), role: $("#role").val(), status: postStatus}, function (data) {

      const form = document.querySelector('#createOrUpdateForm')
      data = JSON.parse(data)
      const action = form.action.split('/')[3]

      if (data.error == null) {
        closeModal('#createOrUpdate')
      }

      if (action === 'store' && data.status !== false) {
        const tbody = document.querySelector('table')
        const status = data.user.status === 'on' ? '<div style="width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;"></div>'
          : '<div style="width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;"></div>'
        tbody.insertAdjacentHTML('beforeend', `<tr id="${data.user.id}"><th scope=\"row\"><div><input class=\"form-check-input\" type=\"checkbox\" id=\"selectUser\" value=\"${data.user.id}\"></div></th><td id="full_name">${data.user.name} ${data.user.surname}</td><td id="user_role">${data.user.role}</td><td id="status">${status} </td> <td style=" display: flex; align-items: center; justify-content: center;"><div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group" role="group" aria-label="First group"><button type="button" class="btn btn-outline-secondary px-1 py-1" onclick="changeAction('/update/${data.user.id}', 'Update', ['${data.user.name}', '${data.user.surname}','${data.user.role}', '${data.user.status}'])" data-bs-toggle="modal" data-bs-target="#createOrUpdate"><span><i class="bi bi-pencil-square"></i></span></button><button onclick="changeActionSingleDelete('/delete/${data.user.id}','${data.user.name} ${data.user.surname}')" type="button" class="btn btn-outline-secondary px-1 py-1" data-bs-toggle="modal" data-bs-target="#deleteModal"><span><i class="bi bi-trash"></i></span></div></div></td>`)

        const user_row = document.getElementById(data.user.id)
        if (document.getElementById('selectAllCheckbox').value === 'on') {
          user_row.querySelector('#selectUser').checked = true
        }

      } else if (action === 'update' && data.status !== false) {

        const tr = document.getElementById(data.user.id)
        const full_name = tr.querySelector('#full_name')
        const role = tr.querySelector('#user_role')
        const status_field = tr.querySelector('#status')

        full_name.innerHTML = data.user.name + ' ' + data.user.surname
        role.innerHTML = data.user.role

        if (data.user.status === 'on') {
          status_field.innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
        } else {
          status_field.innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
        }

        const button = tr.querySelector('button')

        button.onclick = function () {
          changeAction('/update/' + data.user.id, 'Update', [data.user.name, data.user.surname, data.user.role, data.user.status])
        }

      } else {
        // deleteErrors()

        // document.getElementById('name_error').innerHTML = ''
        // document.getElementById('surname_error').innerHTML = ''
        // document.getElementById('role_error').value = '0'
        data.error.forEach(function (item) {
          const name = Object.keys(item)
          document.querySelector(`#${name}_error`).innerHTML = item[name]
        })

      }

      if (data.user !== undefined && data.user.name !== undefined && data.user.surname !== undefined && data.user.role !== undefined) {
        document.getElementById('name').value = ''
        document.getElementById('last_name').value = ''
        document.getElementById('status').checked = false
        document.getElementById('role').value = '0'
      }
    })

  })
})

$(document).ready(function () {
  $('#multipleEdit').on('submit', function (event) {
    event.preventDefault()
    const checkBoxes = document.querySelectorAll('#selectUser')
    const selectedCheckBoxesIds = []

    if (document.getElementById('selectAction').value == 0) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select action!'
      modal.show()
    }

    checkBoxes.forEach(function (elem) {
      if (elem.checked) {
        selectedCheckBoxesIds.push(elem.value)
      }
    })

    if (selectedCheckBoxesIds.length === 0) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      const msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select users!'
      modal.show()
    }

    if (document.getElementById('selectAction').value == 'delete' && selectedCheckBoxesIds.length > 0) {
      const form = document.getElementById('deleteMultipleForm')
      const msg = document.querySelector('.modal-delete-confirm')
      const modalDelete = bootstrap.Modal.getOrCreateInstance(`#deleteMultipleModal`)

      msg.innerHTML = 'Are you sure that you want delete ' + selectedCheckBoxesIds.length + ' users?'
      form.action = '/multiple-edit'
      modalDelete.show()
      $('#deleteMultipleForm').on('submit', function (event) {
        event.preventDefault()
        closeModal('#deleteMultipleModal')
        $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() }, function (data) {
          data = JSON.parse(data)
          data.forEach(function (item) {
            document.getElementById(item.id).style.display = 'none'
          })
        })
      })
    } else {
      $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() }, function (data) {
        data = JSON.parse(data)

        if (data.status !== false) {
        data.forEach(function (item) {
          const tr = document.getElementById(item.id)
          if (item.user_status === 'on') {
            tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
          } else {
            tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
          }
        })
        }
      })
    }
  })
})

$(document).ready(function () {
  $('#bottomMultipleEdit').on('submit', function (event) {
    event.preventDefault()
    const checkBoxes = document.querySelectorAll('#selectUser')
    let selectedCheckBoxesIds = []

    if (document.getElementById('bottomSelectAction').value == 0) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select action!'
      modal.show()
    }

    checkBoxes.forEach(function (elem) {
      if (elem.checked) {
        selectedCheckBoxesIds.push(elem.value)
      }
    })

    if (selectedCheckBoxesIds.length === 0) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      const msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select users!'
      modal.show()
    }

    if (document.getElementById('bottomSelectAction').value == 'delete' && selectedCheckBoxesIds.length > 0) {
      const form = document.getElementById('deleteMultipleForm')
      const msg = document.querySelector('.modal-delete-confirm')
      const modalDelete = bootstrap.Modal.getOrCreateInstance(`#deleteMultipleModal`)

      msg.innerHTML = 'Are you sure that you want delete ' + selectedCheckBoxesIds.length + ' users?'
      form.action = '/multiple-edit'
      modalDelete.show()
      $('#deleteMultipleForm').on('submit', function (event) {
        event.preventDefault()
        closeModal('#deleteMultipleModal')
        $.post('/multiple-edit', {
          ids: selectedCheckBoxesIds,
          action: $('#bottomSelectAction').val()
        }, function (data) {
          data = JSON.parse(data)
          data.forEach(function (item) {
            document.getElementById(item.id).remove()
            selectedCheckBoxesIds = []
            // document.getElementById(item.id).checked = false
          })
        })
      })
    } else {
      $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#bottomSelectAction').val() }, function (data) {
        data = JSON.parse(data)
        if (data.status !== false) {

          data.forEach(function (item) {
            const tr = document.getElementById(item.id)
            if (item.user_status === 'on') {
              tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
            } else {
              tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
            }
          })
        }
      })
    }
  })
})

