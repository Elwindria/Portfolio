<?php
//Vérification Php
//initialisation d'une variable réponse
$reponse = true;

//Vérification input Name
if(!isset($_POST['name']) && empty($_POST['name'])){
    $reponse = "inputName vide";
}

//Vérification input Email
if(!isset($_POST['email']) && empty($_POST['email'])){
    $reponse = "inputEmail vide";
} else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
    $reponse = "inputEmail non valide";
}

//Vérification input textForm
if(!isset($_POST['text_form']) && empty($_POST['text_form'])){
    $reponse = "inputTextForm vide";
}

?>
