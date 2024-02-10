<?php

use App\Controllers\UserController;
use App\Router;

$id = explode("/", $_SERVER["QUERY_STRING"])[1] ?? null;


Router::get("/", "main");
Router::get("/test", "test");
Router::post("/multiple-edit", UserController::class, "multipleEdit", true);
Router::post("/delete/$id", UserController::class, "delete", true);
Router::post("/update/$id", UserController::class, "update", true);
Router::post("/store", UserController::class, "store", true);


Router::enable();