<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listAnswer();
			break;

		case 'POST':
			addAnswer();
			break;

		case 'PUT':
			editAnswer();
			break;

		case 'DELETE':
			delAnswer();
			break;
	}

	function listAnswer() {

		$question_idquestion = $_GET['question_idquestion'];
		
		$queryString = "SELECT idanswer, question_idquestion, is_correct, title
  						FROM answer
  						WHERE question_idquestion = $question_idquestion";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$answer = array();

		while($result = pg_fetch_assoc($query)){
			$answer[] = $result;
		}

		echo json_encode(array(
			"success" => $success,
			"answer"  => $answer
		));			
	}

	function addAnswer() {
		$info                = $_POST['answer'];
		$data                = json_decode($info);
		$question_idquestion = $data->question_idquestion;
		$title               = $data->title;
		$is_correct          = $data->is_correct;

		$query = "	INSERT INTO answer(question_idquestion, title, is_correct) 
					VALUES ($question_idquestion, '$title', '$is_correct') 
					RETURNING idanswer;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idanswer'];		 				
		}


		echo json_encode(array(
			"success"  => $success,
			"action"   => "Inseri",
			"answer" => array(
				"idanswer"            => $id,
				"title"               => $title,
				"question_idquestion" => $question_idquestion,
				"is_correct"          => $is_correct
			)
		));	
	}

	function editAnswer() {
		parse_str(file_get_contents("php://input"), $post_vars);		
		$info                = $post_vars['answer'];
		$data                = json_decode($info);
		$idanswer            = $data->idanswer;
		$question_idquestion = $data->question_idquestion;
		$title               = $data->title;
		$is_correct          = $data->is_correct;

		$query = "UPDATE answer SET question_idquestion = $question_idquestion, title = '$title', is_correct = '$is_correct' WHERE idanswer = $idanswer;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}
		 
		echo json_encode(array(
			"success"  => $success,
			"action"   => "Atualiza",
			"answer" => array(
				"idanswer"            => $idanswer,
				"title"               => $title,
				"question_idquestion" => $question_idquestion,
				"is_correct"          => $is_correct
			)
		));
	}

	function delAnswer() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info       = $post_vars['answer'];
		$data       = json_decode($info);
		$idanswer = $data->idanswer;

		$query  = "DELETE FROM peopleanswer WHERE answer_idanswer = $idquestion;";
		$query .= "DELETE FROM answer WHERE idanswer = $idanswer;";
		$rs    = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}

		echo json_encode(array(
			"success" => $success,
			"action" => "Exclui",
		));
	}
?>