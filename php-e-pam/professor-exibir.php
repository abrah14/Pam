<?php

	include("conexao.php");
	echo "Exibir Professores <br />";
	
	
	$stmt =$pdo ->prepare("select * from tbProfessor");
	$stmt ->execute();
	
	while($row = $stmt ->fetch(PDO::FETCH_BOTH)){
		echo $row['idprofessor'];
		echo $row['nomeprofessor'];
        echo $row['materia'];				
		echo "<br />";
	}
?>