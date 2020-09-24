<?php
//читать json фаил
$json = file_get_contents('../goods.json');
$json = json_decode($json, true); //декодирую

//письмо
$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>Телефон: ' . $_POST['ephone'] . '</p>';
$message .= '<p>Почта: ' . $_POST['email'] . '</p>';
$message .= '<p>Клиент: ' . $_POST['ename'] . '</p>';
//корзина пользователя
$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id => $count) {
    $message .= $json[$id]['name'] . ':  - '; //имя товара
    $message .= $count . ' кг.  Цена: '; //колличество товара
    $message .= $count * $json[$id]['cost']; //умножаем колличество на цену
    $message .= '<br>';
    $sum = $sum + $count * $json[$id]['cost']; //считаем всю сумму
}
$message .= '   Всего: ' . $sum .' руб.';

//print_r($message);
//////////////////////////////////////////////////
//отправляем сообщение
$to = 'vvvcom248@gmail.com' . ',';//тут почта владельца магазина
$to .= $_POST['email']; //копия пользователю
$spectext = '<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Заказ</title>
<link rel="stylesheet" href="css/email.css">
</head>
<body>';
//$headers = 'MIME-Version: 1.0' . "\r\n";
//$headers .= 'Content-type: text/html; charset="UTF-8"' . "\r\n";
//////////////////////////
$m = mail($to, $spectext , $message . '</body></html>');
if ($m) {
    echo 1;
} else {
    echo 0;
}
