<?php
	date_default_timezone_set('America/Sao_Paulo');
	require_once("conecta.php");
	$idquiz = $_POST['idquiz'];
	$queryString = "SELECT idquestion, quiz_idquiz, title, type
					FROM question
					WHERE quiz_idquiz = $idquiz";
	$query = pg_query($queryString);

	if (!$query) {
		$success = false;
	}
	else {
		$success = true;
	} 

	$question = array();

	while($result = pg_fetch_assoc($query)){
		

		$queryStringAnswer = "	SELECT idanswer, question_idquestion, is_correct, title
  								FROM answer
  								WHERE question_idquestion =".$result['idquestion'];
		$queryAnswer = pg_query($queryStringAnswer);
		while($result2 = pg_fetch_assoc($queryAnswer)){
			$result['answer'][] = $result2;
		}

		$question[] = $result;
	}

	echo json_encode(array(
		"success"       => $success,
		"question"      => $question,
		"hourquizbegin" => date('H:i:s'), 
		"datequizbegin" => date('Y-m-d')
	));			
?>