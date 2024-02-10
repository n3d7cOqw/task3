<?php

namespace App;

class Validator
{
    private $data;
    public function __construct($data){
        $this->data = $data;
    }

//    public static function validate($data){
//        $validated = true;
//        foreach ($data as $name => $params){
//            foreach ($params as $param){
//                dd($params);
//                $validated = self::$param();
//            }
//            dd($name, $params);
//        }
//    }

//    public static function required($param){
//        return isset($param);
//    }
//
//    public static function length(int $length){
//        return strlen(trim($params[0])) > $params[1];
//    }
}