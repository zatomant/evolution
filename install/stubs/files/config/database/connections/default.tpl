<?php
return [
    'driver' => env('DB_TYPE', 'mysql'), //$database_type
    'host' => env('DB_HOST', '[+database_server+]'), //$database_server
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', '[+dbase+]'), //$dbase
    'username' => env('DB_USERNAME', '[+user_name+]'), //$database_user
    'password' => env('DB_PASSWORD', '[+password+]'), //$database_password
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => env('DB_CHARSET', '[+connection_charset+]'), // $database_connection_charset
    'collation' => env('DB_COLLATION', '[+connection_collation+]'), //$database_collation
    'prefix' => env('DB_PREFIX', '[+table_prefix+]'), //$table_prefix
    'method' => env('DB_METHOD', '[+connection_method+]'), //$database_connection_method
    'strict' => env('DB_STRICT', true),
    'engine' => env('DB_ENGINE'),
];
