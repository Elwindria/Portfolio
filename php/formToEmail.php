<?php
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

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $textForm = htmlspecialchars($_POST['text_form']);
    $toEmail = "p.lopez2000@laposte.net";

    $expediteur = $name . " <" . $email . '>';

    $header  = 'MIME-Version: 1.0' . "\r\n";
    $header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $header .= 'From: Portfolio' . "\r\n";
    $header .= 'Reply-to: ' . $expediteur ;
    $object = 'Portfolio contact';
    $message = '<p>Message envoyé depuis mon Portfolio</p>
    <p><b>Nom: </b>' . $name . ' </p>
    <p><b>Email : </b>' . $email . '</p>
    <b>Message : </b>' . $textForm . '</p>';

    //Si tout est bon on renvoie true sinon false
    if(mail($toEmail,$object,$message,$header)){
        echo json_encode($reponse);
    } else {
        $reponse = false;
        echo json_encode($reponse);
    }

} else {
    echo json_encode($reponse);
}
?>
