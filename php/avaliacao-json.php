<?php
    header("Access-Control-Allow-Origin: *");

    include("./conexao.php");

    $stmt = $pdo->prepare("SELECT * FROM tbAvaliacaoProfessor");	
    $stmt ->execute();

    $data = array();
    while($row = $stmt ->fetch(PDO::FETCH_ASSOC)){        
        $data[] = $row;                   					
    }	

    $tudo = "{\"avaliacoes\":" . json_encode($data) . "}";

    echo $tudo;
?>