<?php

namespace App;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
use Illuminate\Support\Facades\Schema;

class App
{
    public static function boot(){
        self::db_connect() ? self::db_connect()
            : throw new \Error("database connection failed");

//        if(!Schema::hasTable("users")) self::createUsersTable();
    }

    public static function db_connect(){
        $capsule = new Capsule;
        $config = require_once "config/db.php";

       $capsule->addConnection( [
            "driver" => "mysql",
            "host" => "127.0.0.1",
            "database" => "task3",
            "username" => "root",
            "password" => "",
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
        ]);
        $capsule->setEventDispatcher(new Dispatcher(new Container));

        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        return true;
    }

    public static function createUsersTable(){
        Capsule::schema()->create('users', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->string('surname');
            $table->string('role')->default("User"); // 0 - User 1 - Admin
            $table->string('status')->default("off"); // 0 - grey 1 - green
            $table->timestamps();
        });
    }

}