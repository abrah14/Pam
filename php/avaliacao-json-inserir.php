<?php
    header("Access-Control-Allow-Origin: *");

    include("./conexao.php");

    // Getting the received JSON into $json variable.
    $json = file_get_contents('php://input');
 
    // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
 
    $nota = $obj['notaProfessor'];
    $critPositiva = $obj['criticaPositiva'];
    $critNegativa = $obj['criticaNegativa'];
    $idProfessor = 1;

    $sql = "INSERT INTO tbAvaliacaoProfessor(idAvaliacaoProfessor,notaProfessor,criticaPositiva,criticaNegativa,idProfessor) VALUES(?,?,?,?,?)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(["null",$nota,$critPositiva,$critNegativa,$idProfessor]);

?>