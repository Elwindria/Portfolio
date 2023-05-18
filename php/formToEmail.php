<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require __DIR__ .'/../vendor/autoload.php';

// Chargement des variable de mon .env avec la bibliothèque PhPDotEnv (super pratique et sécu)
// /!\ Attention mon fichier .env est à la racine et mon fichier php est dans un sous dossier, faut donc rajouter après __DIR__ le './../' pour bien remonter à la racine
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$gmail = $_ENV['USERNAME'];
$gmail_password = $_ENV['PASSWORD'];
$boite_mail_reception = $_ENV['MAILPERSO'];

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
        $mail->SMTPDebug = 0;                                   //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $gmail;                               //SMTP username
        $mail->Password   = $gmail_password;                               //SMTP password
        $mail->SMTPSecure = 'ssl';                                  //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom($gmail, 'Mon PortFolio');
        $mail->addAddress($boite_mail_reception);                                  //Add a recipient
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Mail envoye depuis mon Portfolio';
        $mail->Body    = '<p>Message envoye depuis mon Portfolio</p>
            <p></p>
            <p><b>Nom: </b>' . $name . ' </p>
            <p><b>Email : </b>' . $email . '</p>
            <b>Message : </b>' . $textForm . '</p>';
    
        $mail->send();

        echo json_encode($reponse);
    } catch (Exception $e) {
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        $reponse = false;
        echo json_encode($reponse);
    }

} else {
    echo json_encode($reponse);
}
?>
