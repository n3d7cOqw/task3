$(document).ready(function () {
  $('#multipleEdit').on('submit', function (event) {
    event.preventDefault()
    const checkBoxes = $('#selectUser')
    let selectedCheckBoxesIds = []

    if ($('#selectAction').val() == -1) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      const msg = $('.modal-body-alert')
      msg.text('Select action!')
      modal.show()
    }

    let idErrors = []
    $('#selectUser:checked').each(function () {
      const tr = $('#user_' + $(this).val())
      if (tr.length !== 0) {
        let selected = $(this).parents('tr')
        if (selected.is(tr)) {
          selectedCheckBoxesIds.push($(this).val())
        }
      } else {
        idErrors.push($(this).val())
      }
    })

    if (selectedCheckBoxesIds.length === 0 && idErrors.length === 0) {
      const modal = bootstrap.Modal.getOrCreateInstance(`#alertModal`)
      const msg = $('.modal-body-alert')
      msg.text('Select users!')
      modal.show()
    }
    if ($('#selectAction').val() == '2' && selectedCheckBoxesIds.length > 0 && idErrors.length === 0) {
      const form = $('#deleteMultipleForm')
      const msg = $('.modal-delete-confirm')
      const modalDelete = bootstrap.Modal.getOrCreateInstance(`#deleteMultipleModal`)

      msg.text('Are you sure that you want delete ' + selectedCheckBoxesIds.length + ' users?')
      form.attr('action', '/multiple-edit')
      modalDelete.show()

      form.off('submit')

      form.on('submit', function (event) {
        event.preventDefault()
        closeModal('#deleteMultipleModal')
        $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() }, function (data) {
          data = JSON.parse(data)

          selectedCheckBoxesIds = []
          if ($('#selectAction').val() == '2' && (idErrors.length > 0 || data.status === false)) {
            errorAlertMessage(`Error occurred. Please refresh the page to delete users`)
          } else if (data.users.length > 1) {
            let errors = 0
            if (selectedCheckBoxesIds.length > 0 && data.status !== false) {
              data.users.forEach(function (item) {
                if ($('#user_' + item.id).length === 0) { //item.status === false ||
                  errors++
                }
              })
            }
            if (errors === 0) {
              data.users.forEach(function (item) {
                $('#user_' + item.id).remove()
              })
            }
          } else if (data.users.length === 1 && data[0].status !== false) {
            $('#user_' + data.users[0].id).remove()
          } else if (($('#selectAction').val() == 0 || $('#selectAction').val() == 1) && (idErrors.length > 0 || data.status === false)) {
            errorAlertMessage(`Error occurred. Please refresh the page to update status of this users`)
          }
          console.log(idErrors)
        })
      })
    } else if ($('#selectAction').val() == '2' && (selectedCheckBoxesIds.length > 0 || idErrors.length > 0)) {
      errorAlertMessage(`Error occurred. Please refresh the page to delete users`)
    }

    if (($('#selectAction').val() == 0 || $('#selectAction').val() == 1) && selectedCheckBoxesIds.length > 0 && idErrors.length === 0) {
      $.post('/multiple-edit', { ids: selectedCheckBoxesIds, action: $('#selectAction').val() }, function (data) {
        data = JSON.parse(data)

        let errors = 0
        if (selectedCheckBoxesIds.length > 0 && data.status !== false) {
          data.users.forEach(function (item) {
            const tr = $(`#user_${item.id}`)
            if (item.status === false || tr === null) {
              errors++
            }
          })
          if (idErrors.length === 0 && data[0]['status'] === true) {
            data.users.forEach(function (item) {
              const tr = $(`#user_${item.id}`)
              let full_name = tr.find('#full_name').html()
              full_name = full_name.split(' ')
              const name = full_name[0]
              const surname = full_name[1]
              let role = tr.find('#user_role').html()
              role = role === 'User' ? 2 : 1
              if (item.status !== false) {

                if (item.user_status === 1) {
                  $(tr).find('.status').addClass('active')
                  tr.on('click', function () {
                    changeAction('update', 'Update', [name, surname, role, 1, item.id])
                  })

                } else {
                  $(tr).find('.status').removeClass('active')
                  tr.on('click', function () {
                    changeAction('update', 'Update', [name, surname, role, 0, item.id])
                  })

                }
              }
            })
          }
        } else if (($('#selectAction').val() == 0 || $('#selectAction').val() == 1) && (idErrors.length > 0 || data.status === false)) {
          errorAlertMessage(`Error occurred. Please refresh the page to update status of this users`)
        }
      })
    } else if (($('#selectAction').val() == 0 || $('#selectAction').val() == 1) && idErrors.length > 0) {
      errorAlertMessage(`Error occurred. Please refresh the page to update status of this users`)
    }

  })
})