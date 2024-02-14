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
    <title>task 3</title>
</head>
<body>
<div class="container">
    <section class="upperMenu">
        <div class="actions d-flex my-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createOrUpdate"
                    onclick="changeAction('/store','Add')">
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
    </section>

    <?php
    require_once "views/layouts/createOrUpdateModal.php" ?>

    <section class="table">
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
            <?php
            foreach ($users as $user) {
                ?>
                <tr id="<?= $user->id ?>">
                    <th scope="row">
                        <div>
                            <input class="form-check-input" type="checkbox" id="selectUser" value="<?= $user->id ?>">
                        </div>
                    </th>
                    <td id="full_name"><?= $user->name ?> <?= $user->surname ?></td>
                    <td id="user_role"><?= $user->role ?></td>
                    <td id="status"><?php
                        if ($user->status == "off") {
                            ?>
                            <div style="width: 20px; height: 20px; border-radius: 50%; background: #2c3034; margin-left: auto; margin-right: auto; margin-top: 10px;
 "></div>
                            <?php
                        } else {
                            ?>
                            <div style="width: 20px; height: 20px; border-radius: 50%; background: #198754; margin-left: auto; margin-right: auto; margin-top: 10px;"></div>

                            <?php
                        } ?></td>
                    <td>
                        <div class="btn-toolbar justify-content-between" role="toolbar"
                             aria-label="Toolbar with button groups">
                            <div class="btn-group" role="group" aria-label="First group">
                                <button type="button" class="btn btn-outline-secondary"
                                        onclick="changeAction('/update/<?= $user->id ?>', 'Update', ['<?= $user->name ?>', '<?= $user->surname ?>','<?= $user->role ?>', '<?= $user->status?>'])" data-bs-toggle="modal"
                                        data-bs-target="#createOrUpdate">Edit
                                </button>

                                <button onclick="changeActionSingleDelete('/delete/<?=$user->id?>','<?= $user->name." ".$user->surname ?>')"
                                        type="button" class="btn btn-outline-secondary" data-bs-toggle="modal"
                                        data-bs-target="#deleteModal">
                                    <img src="/pictures/delete.svg" width="25" height="20" alt="">
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
<section class="lowerMenu">
    <div class="actions d-flex my-2">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createOrUpdate"
                onclick="changeAction('/store','Add')">
            Add
        </button>
        <form action="" class="d-flex mx-2" id="bottomMultipleEdit">
            <select class="form-select" id="bottomSelectAction" name="selectAction">
                <option value="0">-Please-Select-</option>
                <option value="on">Set Active</option>
                <option value="off">Set Not Active</option>
                <option value="delete">Delete</option>
            </select>
            <button type="submit" class="btn btn-primary mx-2">ok</button>
        </form>
    </div>
</section>
</div>
<?php require_once "views/layouts/alertModal.php"?>
<?php require_once "views/layouts/deleteMultipleModal.php"?>

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
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="/bootstrap/js/bootstrap.bundle.js"></script>
<script src="views/scripts/jquery.js"></script>
<script src="views/scripts/script.js"></script>
</body>
</html>