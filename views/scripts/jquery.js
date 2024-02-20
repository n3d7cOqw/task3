$(document).ready(function () {
  $('#deleteForm').on('submit', function (event) {
    event.preventDefault()
    const action = document.getElementById('deleteForm').action

    if (action.split("/")[3] !== "error"){
    closeModal('#deleteModal')
    $.post(action, $(this).serialize(), function (data) {
      data = JSON.parse(data)
      if (data.status === true) {
        document.getElementById('user_' + data.id).remove()
      } else {
        const modal = bootstrap.Modal.getOrCreateInstance(`#errorAlert`)
        modal.show()
      }
    })
    }else {
      closeModal('#deleteModal')
      const modal = bootstrap.Modal.getOrCreateInstance(`#errorAlert`)
      modal.show()
    }
  })
})

$(document).ready(function () {
  $('#createOrUpdateForm').on('submit', function (event) {
    event.preventDefault()

    let postStatus = document.getElementById('status').checked ? 1 : 0

    $.post(elem.action, {
      name: $('#name').val(),
      surname: $('#last_name').val(),
      role: $('#role').val(),
      status: postStatus
    }, function (data) {

      const form = document.querySelector('#createOrUpdateForm')
      data = JSON.parse(data)
      const action = form.action.split('/')[3]

      if (data.error == null) {
        closeModal('#createOrUpdate')
      }

      if (action === 'store' && data.status !== false) {
        const role = (data.user.role === '1') ? 'Admin' : 'User'
        const tbody = document.querySelector('table')
        const status = data.user.status === '1' ? '<div style="width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;"></div>'
          : '<div style="width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;"></div>'
        tbody.insertAdjacentHTML('beforeend', `<tr id="user_${data.user.id}"><th scope=\"row\"><div><input class=\"form-check-input\" type=\"checkbox\" id=\"selectUser\" value=\"${data.user.id}\"></div></th><td id="full_name">${data.user.name} ${data.user.surname}</td><td id="user_role">${role}</td><td id="status">${status} </td> <td style=" display: flex; align-items: center; justify-content: center;"><div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group" role="group" aria-label="First group"><button type="button" class="btn btn-outline-secondary px-1 py-1" onclick="changeAction('/update/${data.user.id}', 'Update', ['${data.user.name}', '${data.user.surname}','${data.user.role}', '${data.user.status}'])" data-bs-toggle="modal" data-bs-target="#createOrUpdate"><span><i class="bi bi-pencil-square"></i></span></button><button onclick="changeActionSingleDelete('/delete/${data.user.id}','${data.user.name} ${data.user.surname}')" type="button" class="btn btn-outline-secondary px-1 py-1" data-bs-toggle="modal" data-bs-target="#deleteModal"><span><i class="bi bi-trash"></i></span></div></div></td>`)

        const user_row = document.getElementById(data.user.id)
        if (document.getElementById('selectAllCheckbox').value === 'on') {
          user_row.querySelector('#selectUser').checked = true
        }

      } else if (action === 'update' && data.status !== false) {

        const tr = document.getElementById('user_' + data.user.id)
        const full_name = tr.querySelector('#full_name')
        const role = tr.querySelector('#user_role')
        const status_field = tr.querySelector('#status')
        const button = tr.querySelector('button')

        full_name.innerHTML = data.user.name + ' ' + data.user.surname
        role.innerHTML = data.user.role === '1' ? 'Admin' : 'User'

        if (data.user.status === '1') {
          status_field.innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
        } else {
          status_field.innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
        }
        console.log(data.user.status)
        tr.querySelectorAll('button')[1].onclick = changeActionSingleDelete('/delete/' + data.user.id, `${data.user.name} ${data.user.surname}`)
        button.onclick = function () {
          changeAction('/update/' + data.user.id, 'Update', [data.user.name, data.user.surname, data.user.role, data.user.status])
        }

      } else {
        console.log(data.error)
        data.error.forEach(function (item) {
          const name = Object.keys(item)
          document.querySelector(`#${name}_error`).innerHTML = item[name]
        })

      }

      if (data.user !== undefined && data.user.name !== undefined && data.user.surname !== undefined && data.user.role !== undefined) {
        document.getElementById('name').value = ''
        document.getElementById('last_name').value = ''
        document.getElementById('last_name').value = ''
        document.getElementById('status').checked = false
        document.getElementById('role').value = '-1'
      }
    })

  })
})

$(document).ready(function () {
  $('#multipleEdit').on('submit', function (event) {
    event.preventDefault()
    const checkBoxes = document.querySelectorAll('#selectUser')
    let selectedCheckBoxesIds = []

    if (document.getElementById('selectAction').value == -1) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select action!'
      modal.show()
    }

    let idErrors = []
    checkBoxes.forEach(function (elem) {
      if (elem.checked) {
        const tr = document.querySelector('#user_' + elem.value)
        if (tr !== null) {
          let selected = tr.querySelector('#selectUser')
          selected = selected.parentElement.parentElement.parentElement
          if (selected === tr) {
            selectedCheckBoxesIds.push(elem.value)
          }
        } else {
          idErrors.push(elem.value)
        }
      }
    })
    if (selectedCheckBoxesIds.length === 0 && idErrors.length === 0) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      const msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select users!'
      modal.show()
    }
    console.log(idErrors)
    if (document.getElementById('selectAction').value == 'delete' && selectedCheckBoxesIds.length > 0 && idErrors.length === 0) {
      const form = document.getElementById('deleteMultipleForm')
      const msg = document.querySelector('.modal-delete-confirm')
      const modalDelete = bootstrap.Modal.getOrCreateInstance(`#deleteMultipleModal`)

      msg.innerHTML = 'Are you sure that you want delete ' + selectedCheckBoxesIds.length + ' users?'
      form.action = '/multiple-edit'
      modalDelete.show()

      $('#deleteMultipleForm').off('submit')

      $('#deleteMultipleForm').on('submit', function (event) {
        event.preventDefault()
        closeModal('#deleteMultipleModal')
        $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() }, function (data) {
          data = JSON.parse(data)

          selectedCheckBoxesIds = []
          if (document.getElementById('selectAction').value === 'delete' && (idErrors.length > 0 || data.status === false)) {
            errorAlertMessage(`Error occurred. Please refresh the page to delete users`)
          } else if (data.users.length > 1) {
            let errors = 0
            if (selectedCheckBoxesIds.length > 0 && data.status !== false) {
              data.users.forEach(function (item) {
                if (document.getElementById('user_' + item.id) === null) { //item.status === false ||
                  errors++
                }
              })
            }
            if (errors === 0) {
              data.users.forEach(function (item) {
                document.getElementById('user_' + item.id).remove()
              })
            }
          } else if (data.users.length === 1 && data[0].status !== false) {
            document.getElementById('user_' + data.users[0].id).remove()
          }
        })
      })
    } else if (document.getElementById('selectAction').value === 'delete' && selectedCheckBoxesIds.length > 0 && idErrors.length > 0 ) {
      errorAlertMessage(`Error occurred. Please refresh the page to delete users`)
    }
    if ((document.getElementById('selectAction').value == 0 || document.getElementById('selectAction').value == 1) && selectedCheckBoxesIds.length > 0 && idErrors.length === 0) {
      $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() }, function (data) {
        data = JSON.parse(data)

        let errors = 0
        if (selectedCheckBoxesIds.length > 0 && data.status !== false) {
          data.users.forEach(function (item) {
            const tr = document.getElementById('user_' + item.id)
            if (item.status === false || tr === null) {
              errors++
            }
          })
          if (idErrors.length === 0 && data[0]['status'] === true) {
            data.users.forEach(function (item) {
              const tr = document.getElementById('user_' + item.id)
              let full_name = tr.querySelector('#full_name').innerHTML
              full_name = full_name.split(' ')
              const name = full_name[0]
              const surname = full_name[1]
              let role = tr.querySelector('#user_role').innerHTML
              role = role === "User" ? 2 : 1
              if (item.status !== false) {

                if (item.user_status === 1) {
                  tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
                  tr.querySelector('button').onclick = changeAction('/update/' + item.id, 'Update', [name, surname, role, 1])

                } else {
                  tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
                  tr.querySelector('button').onclick = changeAction('/update/' + item.id, 'Update', [name, surname, role, 0])

                }
              }
            })
          }
        }
        else if ((document.getElementById('selectAction').value == 0 || document.getElementById('selectAction').value == 1) && (idErrors.length > 0 || data.status === false)) {
          errorAlertMessage(`Error occurred. Please refresh the page to update status of this users`)
        }
      })
    }else if ((document.getElementById('selectAction').value == 0 || document.getElementById('selectAction').value == 1) && idErrors.length > 0) {
      errorAlertMessage(`Error occurred. Please refresh the page to update status of this users`)
    }

  })
})

$(document).ready(function () {
  $('#bottomMultipleEdit').on('submit', function (event) {
    event.preventDefault()
    const checkBoxes = document.querySelectorAll('#selectUser')
    let selectedCheckBoxesIds = []
    if (document.getElementById('bottomSelectAction').value == '-1') {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      let msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select action!'
      modal.show()
    }

    let idErrors = []
    checkBoxes.forEach(function (elem) {
      if (elem.checked) {
        const tr = document.querySelector('#user_' + elem.value)
        if (tr !== null) {
          let selected = tr.querySelector('#selectUser')
          selected = selected.parentElement.parentElement.parentElement
          if (selected === tr) {
            selectedCheckBoxesIds.push(elem.value)
          }
        } else {
          idErrors.push(elem.value)
        }
      }
    })

    if (selectedCheckBoxesIds.length === 0 && idErrors.length === 0) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      const msg = document.querySelector('.modal-body-alert')
      msg.innerHTML = 'Select users!'
      modal.show()
    }

    if (document.getElementById('bottomSelectAction').value === 'delete' && selectedCheckBoxesIds.length > 0 && idErrors.length === 0) {
      const form = document.getElementById('deleteMultipleForm')
      const msg = document.querySelector('.modal-delete-confirm')
      const modalDelete = bootstrap.Modal.getOrCreateInstance(`#deleteMultipleModal`)

      msg.innerHTML = 'Are you sure that you want delete ' + selectedCheckBoxesIds.length + ' users?'
      form.action = '/multiple-edit'
      modalDelete.show()

      $('#deleteMultipleForm').off('submit')

      $('#deleteMultipleForm').on('submit', function (event) {
        event.preventDefault()
        closeModal('#deleteMultipleModal')

        $.post('/multiple-edit', {
          ids: selectedCheckBoxesIds,
          action: $('#bottomSelectAction').val()
        }, function (data) {
          data = JSON.parse(data)
          selectedCheckBoxesIds = []
          if (document.getElementById('bottomSelectAction').value === 'delete' && (idErrors.length > 0 || data.status === false)) {
            errorAlertMessage(`Error occurred. Please refresh the page to delete users`)
          } else if (data.users.length > 1) {
            let errors = 0
            data.users.forEach(function (item) {
              if (document.getElementById('user_' + item.id) === null) { //item.status === false ||
                errors++
              }
            })
            if (errors === 0) {
              data.users.forEach(function (item) {
                document.getElementById('user_' + item.id).remove()
              })
            }
          } else if (data.users.length === 1 && data[0].status !== false) {
            document.getElementById('user_' + data.users[0].id).remove()
          }

        })
      })
    } else if (document.getElementById('bottomSelectAction').value === 'delete'  && (selectedCheckBoxesIds.length > 0 || idErrors.length > 0)) {
      errorAlertMessage(`Error occurred. Please refresh the page to delete users`)
    }

    if ((document.getElementById('bottomSelectAction').value == 0 || document.getElementById('bottomSelectAction').value == 1) && selectedCheckBoxesIds.length > 0 && idErrors.length === 0) {
      $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#bottomSelectAction').val() }, function (data) {
        data = JSON.parse(data)
        console.log(data)
        let errors = 0
        if (selectedCheckBoxesIds.length > 0 && data.status !== false) {
          data.users.forEach(function (item) {
            const tr = document.getElementById('user_' + item.id)
            if (item.status === false || tr === null) {
              errors++
            }
          })
          if (idErrors.length === 0 && data[0]['status'] === true) {
            data.users.forEach(function (item) {
              const tr = document.getElementById('user_' + item.id)
              let full_name = tr.querySelector('#full_name').innerHTML
              full_name = full_name.split(' ')
              const name = full_name[0]
              const surname = full_name[1]
              let role = tr.querySelector('#user_role').innerHTML
              role = role === "User" ? 2 : 1
              if (item.status !== false) {

                if (item.user_status === 1) {
                  tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
                  tr.querySelector('button').onclick = changeAction('/update/' + item.id, 'Update', [name, surname, role, 1])

                } else {
                  tr.querySelector('#status').innerHTML = '<div style=\'width: 20px; height: 20px; border-radius: 50%; background: #a7a7a7; margin-left: auto; margin-right: auto; margin-top: 10px;\'></div>'
                  tr.querySelector('button').onclick = changeAction('/update/' + item.id, 'Update', [name, surname, role, 0])

                }
              }
            })
          }
        }
        else if ((document.getElementById('bottomSelectAction').value == 0 || document.getElementById('bottomSelectAction').value == 1) && (idErrors.length > 0 || data.status === false)) {
          errorAlertMessage(`Error occurred. Please refresh the page to update status of this users`)
        }
      })
    }else if ((document.getElementById('bottomSelectAction').value == 0 || document.getElementById('bottomSelectAction').value == 1) && idErrors.length > 0) {
      errorAlertMessage(`Error occurred. Please refresh the page to update status of this users`)
    }
  })
})

