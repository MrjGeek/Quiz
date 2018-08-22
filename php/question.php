<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listQuestion();
			break;

		case 'POST':
			addQuestion();
			break;

		case 'PUT':
			editQuestion();
			break;

		case 'DELETE':
			delQuestion();
			break;
	}

	function listQuestion() {

		$quiz_idquiz = $_GET['quiz_idquiz'];
		
		$queryString = "SELECT idquestion, quiz_idquiz, title, type
  						FROM question
  						WHERE quiz_idquiz = $quiz_idquiz";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$question = array();

		while($result = pg_fetch_assoc($query)){
			$question[] = $result;
		}

		echo json_encode(array(
			"success"  => $success,
			"question" => $question
		));			
	}

	function addQuestion() {
		$info        = $_POST['question'];
		$data        = json_decode($info);
		$quiz_idquiz = $data->quiz_idquiz;
		$title       = $data->title;
		$type        = $data->type;

		$query = "	INSERT INTO question(quiz_idquiz, title, type) 
					VALUES ($quiz_idquiz, '$title', '$type') 
					RETURNING idquestion;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idquestion'];		 				
		}


		echo json_encode(array(
			"success"  => $success,
			"action"   => "Inseri",
			"question" => array(
				"idquestion"  => $id,
				"title"       => $title,
				"quiz_idquiz" => $quiz_idquiz,
				"type"        => $type
			)
		));	
	}

	function editQuestion() {
		parse_str(file_get_contents("php://input"), $post_vars);		
		$info        = $post_vars['question'];
		$data        = json_decode($info);
		$idquestion  = $data->idquestion;
		$quiz_idquiz = $data->quiz_idquiz;
		$title       = $data->title;
		$type        = $data->type;

		$query = "UPDATE question SET quiz_idquiz = $quiz_idquiz, title = '$title', type = '$type' WHERE idquestion = $idquestion;";
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
			"question" => array(
				"idquestion"  => $idquestion,
				"title"       => $title,
				"quiz_idquiz" => $quiz_idquiz,
				"type"        => $type
			)
		));
	}

	function delQuestion() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info       = $post_vars['question'];
		$data       = json_decode($info);
		$idquestion = $data->idquestion;

		$query  = "DELETE FROM peopleanswer WHERE question_idquestion = $idquestion;";
		$query .= "DELETE FROM answer WHERE question_idquestion = $idquestion;";
		$query .= "DELETE FROM question WHERE idquestion = $idquestion;";
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