
$("table").on('click', '#updateBtn', function(event) {
  const tr = $(event.target).parent().parent().parent().parent().parent().parent().get()
  let fullname = $(tr).find('#full_name').text()
  let role = ($(tr).find('#user_role').text() === "Admin") ? 1 : 2
  let id = $(tr).attr('id')
  let status = $(tr).find('.status').hasClass('active') ? 1 : 0;
  id = id.split("_")[1];
  fullname = fullname.split(" ")
  changeAction('update', 'Update', [fullname[0], fullname[1], role, status, id])
});

$(".container").on("click", ".createBtn", function (event){
  changeAction('store', 'Add')
})

$("table").on("click", "#deleteBtn", function (event){
  const tr = $(event.target).parent().parent().parent().parent().parent().parent().get()
  let fullname = $(tr).find('#full_name').text()
  let id = $(tr).attr('id')
  id = id.split("_")[1];
  $("#delete_id").val(id)
  changeActionSingleDelete('delete',fullname, id)
})

$("#selectAllCheckbox").on("click", function (){
  changeCheckBoxCondition()
})

$("#createUpdateModalSubmitButton").on("click", function (){
  deleteErrors()
})
$("#createUpdateModalCloseButton").on("click", function (){
  deleteErrors()
})


$(window).on('click', function (e) {

  const checkBoxes = $('input[id=selectUser]')

  const selected = []
  const selectAll = $('#selectAllCheckbox')

  checkBoxes.each(function () {
    if (this.checked === true){
      selected.push(this.value)
    }
  })
  if (e.target.id == 'selectUser') {
    let value = checkBoxes.length === selected.length ? 'on' : 'off'
    selectAll.val(`${value}`)
    selectAll.prop("checked", checkBoxes.length === selected.length)
  }
})


