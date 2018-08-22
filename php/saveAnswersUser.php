<?php
	require_once("conecta.php");
	$name          = $_POST['name']; 
	$email         = $_POST['email']; 
	$hourquizbegin = $_POST['hourquizbegin']; 
	$datequizbegin = $_POST['datequizbegin']; 
	$questions     = array();

	$query = "	INSERT INTO people(name, email) 
				VALUES ('$name', '$email') 
				RETURNING idpeople;";
	$rs       = pg_query($query);
	$row      = pg_fetch_assoc($rs);
	$idpeople = $row['idpeople'];	

	foreach ($_POST as $key => $valor) {
		if ($key != 'name' && $key != 'email' && $key !='hourquizbegin' && $key !='datequizbegin' ) {
			$questions[] = $key;
		}
	}

	$countQuestions = count($questions);
	$correct        = 0;
	$type           = "";

	for ($a = 0; $a < $countQuestions; $a++) {

		$answer = $_POST[$questions[$a]];
		$questions[$a] = str_replace("rb_", "", $questions[$a]);

		$queryQuestion = "SELECT type FROM question WHERE idquestion = ".$questions[$a];
		$rs            = pg_query($queryQuestion);
		$row           = pg_fetch_assoc($rs);
		$type          = $row['type'];	

		if ($type == 'multi') {
			$queryString = "SELECT COUNT(a.idanswer)
							FROM answer a
							INNER JOIN question q ON q.idquestion = a.question_idquestion 
							WHERE a.is_correct AND a.question_idquestion = ".$questions[$a]." AND a.idanswer = $answer";
		}
		else {
			$queryString = "SELECT COUNT(a.idanswer)
							FROM answer a
							INNER JOIN question q ON q.idquestion = a.question_idquestion 
							WHERE a.is_correct AND a.question_idquestion = ".$questions[$a]." AND a.title ilike '$answer'";			
		}
		
		$query = pg_query($queryString);

		while($result = pg_fetch_assoc($query)){
			$correct += $result['count'];
		}		

		if ($type == 'multi') {
			pg_query("	INSERT INTO peopleanswer(question_idquestion, answer_idanswer,  
					datequizbegin, hourquizbegin, datequizfinish, hourquizfinish, people_idpeople)
    				VALUES (".$questions[$a].", $answer, '$datequizbegin', '$hourquizbegin', CURRENT_DATE, CURRENT_TIME, $idpeople)");
		}	
		else {
			pg_query("	INSERT INTO peopleanswer(question_idquestion, answertext, 
					datequizbegin, hourquizbegin, datequizfinish, hourquizfinish, people_idpeople)
    				VALUES (".$questions[$a].", '$answer','$datequizbegin', '$hourquizbegin', CURRENT_DATE, CURRENT_TIME, $idpeople)");
		}		

			
	}

	echo json_encode(array(
		"success"  => true,
		"correct"  => $correct
	));
?>
