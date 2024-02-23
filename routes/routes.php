<?php

use App\Controllers\UserController;
use App\Router;

Router::get("/", "main");
Router::post("/multiple-edit", UserController::class, "multipleEdit");
Router::post("/delete", UserController::class, "delete");
Router::post("/update", UserController::class, "update");
Router::post("/store", UserController::class, "store");


Router::enable();