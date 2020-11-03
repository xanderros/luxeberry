<?php
$name = $_POST['firstName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$domain = $_SERVER['SERVER_NAME'];

$letter = "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><title>New request for adding vacation home | Luxeberry</title></head><body>";
if ($name) {
    $letter .= "<p>Full Name: ".htmlspecialchars($name)."</p>";
}
if ($email) {
    $letter .= "<p>Email: ".htmlspecialchars($email)."</p>";
}
if ($phone) {
    $letter .= "<p>Phone: ".htmlspecialchars($phone)."</p>";
}
if ($message) {
    $letter .= "<p>Message:</p><div><pre>".htmlspecialchars($message)."</pre></div>";
}
$letter .= "</body></html>";

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: <noreply@$domain>\r\n";
mail("gmshpprd@gmail.com", "New request for adding vacation home | Luxeberry", $letter, $headers);

echo 'OK';
?>