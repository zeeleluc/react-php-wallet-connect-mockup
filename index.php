<?php
include_once 'preload.php';
include_once 'autoloader.php';
include_once 'vendor/autoload.php';
include_once 'utilities.php';

try {
    $init = new \App\Initialize();
    $init->action()->show();
} catch (Exception $e) {
    ob_start();
    require(ROOT . DS . 'templates' . DS . 'layouts' . DS . 'error.phtml');
    $error_page = ob_get_contents();
    ob_end_clean();

    echo $error_page;
}
