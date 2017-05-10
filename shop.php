<?php

@error_reporting ( E_ALL ^ E_WARNING ^ E_NOTICE );
@ini_set ( 'display_errors', false );
@ini_set ( 'html_errors', false );
@ini_set ( 'error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE );

$tax = intval($_POST['tax']);
$min = intval($_POST['min']);
$max = intval($_POST['max']);
$list = $_POST['list'];

if(
	!isset($tax) || !isset($min) || !isset($max) || !is_numeric($tax) || !is_numeric($min) || !is_numeric($max)
	|| sizeof($list)<=0 || empty($list)
) die('error');

$res = array(tax => $tax, min => $min, max => $max, slist => $list);
echo json_encode($res);
