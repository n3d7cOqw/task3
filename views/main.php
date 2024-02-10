<?php
$users = \App\Models\User::all();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
    <title>Document</title>
</head>
<body>
<div class="container">
    <div class="actions d-flex my-2">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createOrUpdate" onclick="changeAction('/store')">
Add
    </button>
    <form action="" class="d-flex mx-2" id="multipleEdit">
    <select class="form-select" id="selectAction" name="selectAction">
        <option value="0">-Please-Select-</option>
        <option value="on">Set Active</option>
        <option value="off">Set Not Active</option>
        <option value="delete">Delete</option>
    </select>
    <button type="submit" class="btn btn-primary mx-2">ok</button>
    </form>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="createOrUpdate" tabindex="-1" aria-labelledby="#createOrUpdate" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="/store" method="post" id="createOrUpdateForm">
                <div class="modal-body">
                        <div class="mb-3">
                            <label for="name" class="form-label">First name</label>
                            <input type="text" min="8" class="form-control" id="name" name="name">
                        </div>
                        <div class="mb-3">
                            <label for="last_name" class="form-label">Last name</label>
                            <input type="text" min="8" class="form-control" id="last_name" name="surname">
                        </div>
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <label class="form-check-label" for="status">Status</label>
                                <input class="form-check-input" type="checkbox" role="switch" id="status" name="status">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="role" class="form-label">Role</label>
                            <select class="form-select" aria-label="Default select example" id="role" name="role">
                                <option value="0">-Please Select-</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                        </select>
                        </div>
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <form action="">

    </form>

    <table class="table table-bordered">
        <thead>
        <tr>
            <th scope="col">
                <input type="checkbox" id="selectAllCheckbox" onclick="changeCheckBoxCondition()" value="off">
            </th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <?php  foreach ($users as $user){

        ?>
        <tr>
            <th scope="row">
                <div>
                    <input class="form-check-input" type="checkbox" id="selectUser"  value="<?=$user->id?>">
                </div>
            </th>
            <td><?= $user->name ?> <?= $user->surname ?></td>
            <td><?= $user->role ?></td>
            <td><?php if($user->status == "off"){
                            ?><div style="width: 20px; height: 20px; border-radius: 50%; background: #2c3034; margin-left: auto; margin-right: auto; margin-top: 10px;
 "></div>
               <?php }else{
                ?><div style="width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;"></div>

                <?php }?></td>
            <td>
                <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group" role="group" aria-label="First group">
                        <button type="button" class="btn btn-outline-secondary" onclick="changeAction('/update/<?=$user->id?>')" data-bs-toggle="modal" data-bs-target="#createOrUpdate">Edit</button>

                            <button onclick="changeActionSingleDelete('/delete/<?=$user->id?>','<?=$user->name . " " . $user->surname?>')" type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#deleteModal"><img src="/pictures/delete.svg" width="25" height="20" alt="">

                    </div>
                </div>

            </td>
        </tr>
        <?php
        }
        ?>
        </tbody>
    </table>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" method="post" id="deleteForm">
            <div class="modal-body modal-confirm-message">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger">Delete</button>
            </div>
            </form>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="/bootstrap/js/bootstrap.js" type="text/javascript"></script>
<script>

  const elem = document.getElementById("createOrUpdateForm");

    function changeCheckBoxCondition(event){
      const checkBox = document.getElementById("selectAllCheckbox");
      const checkBoxes = document.querySelectorAll("#selectUser");
      if (checkBox.value === "off"){
        checkBoxes.forEach(function (elem){
          elem.checked = true;
        })
        checkBox.value = "on";
      }else if (checkBox.value === "on"){
        checkBoxes.forEach(function (elem){
          elem.checked = false;
        })
        checkBox.value = "off";
      }
    }

    function changeActionSingleDelete(action, user){
      const form = document.getElementById("deleteForm");
      const div = document.querySelector(".modal-confirm-message");
      div.innerHTML = "Are you sure want to delete " + user
      form.action = action;
    }

    function changeAction(action){
      elem.action = action;
    }

  function closeModal() {
    const modal = new bootstrap.Modal(document.getElementById('createOrUpdate'), {
      keyboard: false
    })
    modal.hide();
  }

  console.log($("#deleteForm").attr('action'))
    $(document).ready(function (){
      $("#deleteForm").on("submit", function (event){
        event.preventDefault();
        const formAction = $(this).attr('action');
        console.log(formAction)
        $.post(formAction, $(this).serialize())
          .done(function(data) {
            console.log("Success:", data);
          })
          .fail(function(xhr, status, error) {
            console.error("Error:", error);
          });
      })
    })

  $(document).ready(function (){
    $("#createOrUpdateForm").on("submit", function (event){
      event.preventDefault();
      // closeModal();
      $.post(elem.action, $(this).serialize())
    })
  })

  $(document).ready(function (){
    $("#multipleEdit").on("submit", function (event){
      event.preventDefault();
      const checkBoxes = document.querySelectorAll('#selectUser');
      const selectedCheckBoxesIds = [];
      checkBoxes.forEach(function (elem){
        if(elem.checked){
          selectedCheckBoxesIds.push(elem.value);
        }
      });
      $.post("/multiple-edit", { ids: selectedCheckBoxesIds, action: $("#selectAction").val() });
    })
  })

</script>
</body>
</html>