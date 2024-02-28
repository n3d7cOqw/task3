$(document).ready(function () {
  $('#deleteForm').on('submit', function (event) {
    event.preventDefault()
    const action = $(this).attr('action')
    if (action !== 'error') {
      closeModal('#deleteModal')

      $.post(action, { delete_id: $('#delete_id').val() }, function (data) {

        if (data.status === true) {
          $('#user_' + data.id).remove()
        } else {
          const modal = bootstrap.Modal.getOrCreateInstance('#errorAlert')
          modal.show()
        }
      })
    } else {
      closeModal('#deleteModal')
      const modal = bootstrap.Modal.getOrCreateInstance('#errorAlert')
      modal.show()
    }
  })
})