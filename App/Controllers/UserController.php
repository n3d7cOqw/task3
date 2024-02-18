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
        $user->status = $_POST["status"] ?? "off";

        $errors = [];

        if (empty(trim($_POST["name"]))) {
            $errors[] = ["name" => "field name is required"];
        }
        if (empty(trim($_POST["surname"]))) {
            $errors[] = ["surname" => "field surname is required"];
        }
        if (empty(trim($_POST["role"]))) {
            $errors[] = ["role" => "field role is required"];
        }


        if (empty($errors)) {
            $user->save();
            $response = [
                "status" => true,
                "error" => null,
                "user" => [
                    "id" => $user->id,
                    "name" => $_POST["name"],
                    "surname" => $_POST["surname"],
                    "status" => $_POST["status"] ?? "off",
                    "role" => $_POST["role"],
                ],
            ];
            echo json_encode($response);
        } else {
            $response = [
                "status" => false,
                "error" => $errors,
            ];
            echo json_encode($response);
        }
    }

    public function update()
    {
        $id = explode("/", $_SERVER["QUERY_STRING"])[1];
        if (User::where('id', $id)->first() === null) {
            echo json_encode(["status" => false, "error" => [["user" => "user not found, please refresh the page"]]]);
        } else {
            $errors = [];

            if (empty(trim($_POST["name"]))) {
                $errors[] = ["name" => "field name is required"];
            }
            if (empty(trim($_POST["surname"]))) {
                $errors[] = ["surname" => "field surname is required"];
            }
            if (empty(trim($_POST["role"]))) {
                $errors[] = ["role" => "field role is required"];
            }

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
                        "role" => $_POST["role"],

                    ],
                ];
                echo json_encode($response);
            } else {
                $response = [
                    "status" => false,
                    "error" => $errors,
                ];
                echo json_encode($response);
            }
        }
    }

    public function delete()
    {
        $id = explode("/", $_SERVER["QUERY_STRING"])[1];
        if (User::where('id', $id)->first() === null) {
            echo json_encode([
                "status" => false,
                "error" => [
                    "code" => 100,
                    "message" => "not found user",
                ],
            ]);
        } else {
            if (User::where("id", $id)->first()->delete()) {
                echo json_encode(["status" => true, "error" => null, "id" => $id]);
            }
        }
    }

    public function multipleEdit()
    {
        $json = [];
        if (isset($_POST["ids"]) && $_POST["action"] === "delete") {
            foreach ($_POST["ids"] as $id) {
                if (($user = User::where("id", $id)->first()) !== null) {
                    $user->delete();
                    $json[] = ["status" => true, "error" => null, "id" => $id];
                } else {
                    $json[] = ["status" => false, "error" => "User not found", "id" => $id];
                }
            }
            echo json_encode($json);
        } elseif (isset($_POST["ids"]) && $_POST["action"] === "off") {
            foreach ($_POST["ids"] as $id) {
                if (($user = User::where("id", $id)->first()) !== null) {
                    $user->update(["status" => "off"]);
                    $json[] = ["status" => true, "error" => null, "id" => $id, "user_status" => "off"];
                } else {
                    $json[] = ["status" => false, "error" => "User not found", "id" => $id];
                }
            }
            echo json_encode($json);
        } elseif (isset($_POST["ids"]) && $_POST["action"] === "on") {
            foreach ($_POST["ids"] as $id) {
                if (($user = User::where("id", $id)->first()) !== null) {
                    $user->update(["status" => "on"]);
                    $json[] = ["status" => true, "error" => null, "id" => $id, "user_status" => "on"];
                } else {
                    $json[] = ["status" => false, "error" => "User not found", "id" => $id];
                }
            }
            echo json_encode($json);
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