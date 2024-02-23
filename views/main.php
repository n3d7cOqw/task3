<?php
$users = \App\Models\User::all();
$role = require_once "config/info.php";
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="views/style/style.css">
    <title>task 3</title>
</head>
<body>
<div class="container">
<?php require_once "views/layouts/upperMenu.php"?>

    <section class="table">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th scope="col">
                    <input type="checkbox" id="selectAllCheckbox" value="off">
                </th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <?php
            foreach ($users as $user) {
                ?>
                <tr id="user_<?= $user->id ?>">
                    <th scope="row">
                        <div>
                            <input class="form-check-input" type="checkbox" id="selectUser" value="<?= $user->id ?>">
                        </div>
                    </th>
                    <td id="full_name"><?= $user->name ?> <?= $user->surname ?></td>
                    <td id="user_role"><?= $role["role"][$user->role]?></td>
                    <td id="status">
                        <div class="status <?php if ($user->status == 1){
                            echo "active";
                        }?>"></div>
                        </td>
                    <td style=" display: flex; align-items: center; justify-content: center;">
                        <div class="btn-toolbar" role="toolbar"
                             aria-label="Toolbar with button groups" >
                            <div class="btn-group" role="group" aria-label="First group">
                                <button type="button" class="btn btn-outline-secondary px-1 py-1" data-bs-toggle="modal"
                                        data-bs-target="#createOrUpdate" id="updateBtn"><span><i class="bi bi-pencil-square"></i></span>
                                </button>

                                <button type="button" class="btn btn-outline-secondary px-1 py-1" data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"><span><i class="bi bi-trash" id="deleteBtn"></i></span>
                            </div>
                        </div>

                    </td>
                </tr>
                <?php
            }
            ?>
            </tbody>
        </table>
    </section>
<?php require_once "views/layouts/lowerMenu.php"?>
</div>
<?php require_once "views/layouts/createOrUpdateModal.php" ?>
<?php require_once "views/layouts/alertModal.php"?>
<?php require_once "views/layouts/deleteMultipleModal.php"?>
<?php require_once "views/layouts/errorAlert.php"?>
<?php require_once "views/layouts/deleteModal.php"?>


<script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="/bootstrap/js/bootstrap.bundle.js"></script>
<script src="views/scripts/helpers.js"></script>
<script src="views/scripts/events.js"></script>
<script src="views/scripts/delete.js"></script>
<script src="views/scripts/createOrUpdate.js"></script>
<script src="views/scripts/upperMultipleEdit.js"></script>
<script src="views/scripts/bottomMultipleEdit.js"></script>
</body>
</html>