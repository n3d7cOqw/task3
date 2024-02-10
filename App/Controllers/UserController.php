<?php

namespace App\Controllers;

use App\Models\User;
use App\Router;
use App\Validator;
use Illuminate\Support\Facades\Schema;

class UserController
{
    public function store()
    {
        $user = new User();
        $user->name = $_POST["name"];
        $user->surname = $_POST["surname"];
        $user->role = $_POST["role"];
        if (isset($_POST["status"])) {
            $user->status = $_POST["status"];
        }

        if (strlen(trim($_POST["name"]) > 1) && strlen(trim($_POST["surname"]) > 1) && $_POST["role"] != 0) {
            $user->save();
            $response = [
                "status" => true,
                "error" => null,
                "user" => [
                    "id" => $user->id,
                    "name" => $_POST["name"],
                    "surname" => $_POST["surname"],
                    "status" => $_POST["status"] ?? "off",
                ],
            ];
            echo json_encode($response);
        } else {
            $response = [
                "status" => false,
                "error" => ["code" => 100, "message" => "Validation Error"],
            ];
            echo json_encode($response);
        }
    }

    public function update()
    {
        $id = explode("/", $_SERVER["QUERY_STRING"])[1];

        if (strlen(trim($_POST["name"]) > 1) && strlen(trim($_POST["surname"]) > 1) && $_POST["role"] != 0) {
            User::where('id', $id)->update([
                "name" => $_POST["name"],
                "surname" => $_POST["surname"],
                "role" => $_POST["role"],
                "status" => $_POST["status"] ?? "off",
            ]);

            $response = [
                "status" => true,
                "error" => null,
                "user" => [
                    "id" => $id,
                    "name" => $_POST["name"],
                    "surname" => $_POST["surname"],
                    "status" => $_POST["status"] ?? "off",
                ],
            ];
            echo json_encode($response);
        } else {
            $response = [
                "status" => false,
                "error" => ["code" => 100, "message" => "Validation Error"],
            ];
            echo json_encode($response);
        }
    }

    public function delete()
    {
        $id = explode("/", $_SERVER["QUERY_STRING"])[1];
        if (User::where("id", $id)->first()->delete()) {
            echo json_encode(["status" => true, "error" => null, "id" => $id]);
        } else {
            echo json_encode([
                "status" => false,
                "error" => [
                    "code" => 100,
                    "message" => "not found user",
                ],
            ]);
        }
    }

    public function multipleEdit()
    {
        $json = [];
        if ($_POST["action"] === "delete") {
            foreach ($_POST["ids"] as $id) {
                User::where("id", $id)->first()->delete();
                $json[] = ["status" => true, "error" => null, "id" => $id];
            }
            echo  json_encode($json);
        } elseif ($_POST["action"] === "off") {
            foreach ($_POST["ids"] as $id) {
                User::where("id", $id)->first()->update(["status" => "off"]);
                $json[] = ["status" => true, "error" => null, "id" => $id, "user_status" => "off"];
            }
            echo  json_encode($json);
        } elseif ($_POST["action"] === "on") {
            foreach ($_POST["ids"] as $id) {
                User::where("id", $id)->first()->update(["status" => "on"]);
                $json[] = ["status" => true, "error" => null, "id" => $id, "user_status" => "on"];
            }
            echo  json_encode($json);
        } else {
            echo json_encode([
                "status" => false,
                "error" => [
                    "code" => 100,
                    "message" => "something went wrong",
                ],
            ]);
        }
    }
}