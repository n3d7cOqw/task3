<div class="modal fade " id="createOrUpdate" tabindex="-1" aria-labelledby="#createOrUpdate" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="createUpdateModalTitle"><?php ?> Create user</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" method="post" id="createOrUpdateForm">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="form-label">First name</label>
                        <input type="text" min="8" class="form-control" id="name" name="name">
                        <div class="invalid-feedback d-block" id="name_error" ></div>
                    </div>
                    <div class="mb-3">
                        <label for="last_name" class="form-label">Last name</label>
                        <input type="text" min="8" class="form-control" id="last_name" name="surname">
                        <div class="invalid-feedback d-block" id="surname_error"></div>

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
                        <div class="invalid-feedback d-block" id="role_error"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="deleteErrors()">Close</button>
                    <button type="submit" class="btn btn-primary" onclick="deleteErrors()"><span id="createUpdateModalSubmitButton"></span></button>
                </div>
            </form>
        </div>
    </div>
</div>