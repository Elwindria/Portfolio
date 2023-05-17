<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

// Chargement des variable de mon .env avec la bibliothèque PhPDotEnv (super pratique et sécu)
// /!\ Attention mon fichier .env est à la racine et mon fichier php est dans un sous dossier, faut donc rajouter après __DIR__ le './../' pour bien remonter à la racine
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
define('USERNAME', $_ENV['USERNAME']);
define('PASSWORD', $_ENV['PASSWORD']);
define('MYNAME', $_ENV['MYNAME']);

$username = getenv('USERNAME');
$password = getenv('PASSWORD');
$myName = getenv('MYNAME');

//Vérification Php
//initialisation d'une variable réponse
$reponse = true;

//Vérification input Name
if(!isset($_POST['name']) && empty($_POST['name'])){
    $reponse .= " inputNameVide";
}

//Vérification input Email
if(!isset($_POST['email']) && empty($_POST['email'])){
    $reponse .= " inputEmailVide";
} else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
    $reponse .= " inputEmailNonValide";
}

//Vérification input textForm
if(!isset($_POST['text_form']) && empty($_POST['text_form'])){
    $reponse .= " inputTextFormVide";
}

//Si $reponse = true alors tout est bon, on continue sinon on renvoie la réponse
if($reponse){

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $textForm = htmlspecialchars($_POST['text_form']);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.laposte.net';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $username;                               //SMTP username
        $mail->Password   = $password;                               //SMTP password
        $mail->SMTPSecure = 'ssl';                                  //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        $mail->setFrom($username, $password);
        $mail->addAddress($email);                                  //Add a recipient
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Mail envoyé depuis mon Portfolio';
        $mail->Body    = '<p>Message envoyé depuis mon Portfolio</p>
            <p><b>Nom: </b>' . $name . ' </p>
            <p><b>Email : </b>' . $email . '</p>
            <b>Message : </b>' . $textForm . '</p>';
    
        $mail->send();
        echo json_encode($reponse);
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        $reponse = false;
        echo json_encode($reponse);
    }

    // $name = htmlspecialchars($_POST['name']);
    // $email = htmlspecialchars($_POST['email']);
    // $textForm = htmlspecialchars($_POST['text_form']);
    // $toEmail = "p.lopez2000@laposte.net";

    // $expediteur = $name . " <" . $email . '>';

    // $header  = 'MIME-Version: 1.0' . "\r\n";
    // $header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    // $header .= 'From: Portfolio' . "\r\n";
    // $header .= 'Reply-to: ' . $expediteur ;
    // $object = 'Portfolio contact';
    // $message = '<p>Message envoyé depuis mon Portfolio</p>
    // <p><b>Nom: </b>' . $name . ' </p>
    // <p><b>Email : </b>' . $email . '</p>
    // <b>Message : </b>' . $textForm . '</p>';

    // //Si tout est bon on envoit le mail + renvoie true a notre js sinon false
    // if(mail($toEmail,$object,$message,$header)){
    //     echo json_encode($reponse);
    // } else {
    //     $reponse = false;
    //     echo json_encode($reponse);
    // }

} else {
    echo json_encode($reponse);
}
?>
