<?php
    header("Access-Control-Allow-Origin: *");

    include("./conexao.php");

    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');
 
    // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
 
    $nota = $obj['nota'];
    $critPositiva = $obj['criticaPositiva'];
    $critNegativa = $obj['criticaNegativa'];
    $idProfessor = 1;

    $stmt = $pdo->prepare("insert into tbAvaliacaoProfessor values(null,'$nota','$critPositiva','$critNegativa',1");	
    $stmt ->execute();    
?>