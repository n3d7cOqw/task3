$(document).ready(function () {
  $('#createOrUpdateForm').on('submit', function (event) {
    event.preventDefault()

    let postStatus = $('#status').prop('checked') ? 1 : 0
    const elem = $('#createOrUpdateForm')
    $.post(elem.attr('action'), {
      name: $('#name').val(),
      surname: $('#last_name').val(),
      role: $('#role').val(),
      id: $('#id').val(),
      status: postStatus
    }, function (data) {
      data = JSON.parse(data)
      const form = $('#createOrUpdateForm')
      const action = form.attr('action')
      if (data.error == null) {
        closeModal('#createOrUpdate')
      }
      if (action === 'store' && data.status !== false) {
        const role = (data.user.role === '1') ? 'Admin' : 'User'
        const tbody = $('table tbody')
        tbody.append(`<tr id="user_${data.user.id}"><th scope="row"><div><input class="form-check-input" type="checkbox" id="selectUser" value="${data.user.id}"></div></th><td id="full_name">${data.user.name} ${data.user.surname}</td><td id="user_role">${role}</td><td id="status"><div class="status"></div></td><td style="display: flex; align-items: center; justify-content: center;"><div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group" role="group" aria-label="First group"><button type="button" class="btn btn-outline-secondary px-1 py-1" data-bs-toggle="modal" data-bs-target="#createOrUpdate" id="updateBtn"><span><i class="bi bi-pencil-square"></i></span></button><button type="button" class="btn btn-outline-secondary px-1 py-1" data-bs-toggle="modal" data-bs-target="#deleteModal" id="deleteBtn"><span><i class="bi bi-trash"></i></span></button></div></div></td></tr>`)

        const user_row = $(`#user_${data.user.id}`)
        if (data.user.status == 1) {
          user_row.find('.status').addClass('active')
        }
        if ($('#selectAllCheckbox').prop('checked')) {
          user_row.find('#selectUser').prop('checked', true)
        }

      } else if (action === 'update' && data.status !== false) {
        const tr = $(`#user_${data.user.id}`)
        const full_name = tr.find('#full_name')
        const role = tr.find('#user_role')
        const status_field = tr.find('.status')
        const button = tr.find('button')

        full_name.html(data.user.name + ' ' + data.user.surname)
        role.html(data.user.role === '1' ? 'Admin' : 'User')
        if (data.user.status === '1') {
          status_field.addClass('active')
        } else {
          status_field.removeClass('active')
        }
        button.eq(1).on('click', function () {
          changeActionSingleDelete('/delete/' + data.user.id, `${data.user.name} ${data.user.surname}`)
        })

      } else {
        console.log(data.error)
        data.error.forEach(function (item) {
          const name = Object.keys(item)[0]
          $(`#${name}_error`).html(item[name])
        })

      }

      if (data.user !== undefined && data.user.name !== undefined && data.user.surname !== undefined && data.user.role !== undefined) {
        $('#name').val('')
        $('#last_name').val('')
        $('#status').prop('checked', false)
        $('#role').val('-1')
      }
    })

  })
})