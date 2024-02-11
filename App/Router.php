<?php

namespace App;

class Router
{
    public static $routes = [];

    public static function get(string $url, string $page){
        self::$routes[] = [
            "uri" => $url,
            "page" => $page,
            "post" => false
        ];
    }

    public static function post(string $uri, string $class, string $method)
    {
        self::$routes[] = [
            "uri" => $uri,
            "class" => $class,
            "method" => $method,
            "post" => true,
        ];
    }

    public static function enable(){
        $query = $_GET["q"] ?? null;
        foreach (self::$routes as $route) {
            if ($route["uri"] === "/".$query) {

                if ($route["post"] === true && $_SERVER['REQUEST_METHOD'] === "POST") {

                    $action = new $route["class"];
                    $method = $route["method"];
                    $action->$method();
                    die();
                } else {
                    require_once "views/".$route["page"].".php";
                    die();

                }
            }
        }
        self::error(404);
    }

    public static function error($code)
    {
        require_once "views/errors/" . $code .".php";
    }

    public static function redirect($uri){
        header("Location: ". $uri);
    }
}