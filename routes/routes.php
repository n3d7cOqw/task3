<?php

use App\Controllers\UserController;
use App\Router;

$id = explode("/", $_SERVER["QUERY_STRING"])[1] ?? null;


Router::get("/", "main");
Router::post("/multiple-edit", UserController::class, "multipleEdit");
Router::post("/delete/$id", UserController::class, "delete");
Router::post("/update/$id", UserController::class, "update");
Router::post("/store", UserController::class, "store");


Router::enable();