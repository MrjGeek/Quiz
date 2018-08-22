<?php
	require_once("conecta.php");

	switch ($_SERVER['REQUEST_METHOD']){
		case 'GET':
			listQuiz();
			break;

		case 'POST':
			addQuiz();
			break;

		case 'PUT':
			editQuiz();
			break;

		case 'DELETE':
			delQuiz();
			break;
	}

	function listQuiz() {
		if (isset($_GET['busca'])) {
			$busca = $_GET['busca'];
		}
		else {
			$busca = "";
		}

		$filtro = "";
		if ($busca != "") {
			$filtro = "WHERE title ILIKE '%$busca%'";
		}
		
		$queryString = "SELECT idquiz, title
						FROM quiz
						$filtro ";
		$query = pg_query($queryString);

		if (!$query) {
			$success = false;
		}
		else {
			$success = true;
		} 

		$quiz = array();

		while($result = pg_fetch_assoc($query)){
			$quiz[] = $result;
		}

		echo json_encode(array(
			"success" => $success,
			"quiz"    => $quiz
		));			
	}

	function addQuiz() {
		$info  = $_POST['quiz'];
		$data  = json_decode($info);
		$title = $data->title;

		$query = "	INSERT INTO quiz(title) 
					VALUES ('$title') 
					RETURNING idquiz;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
			$id      = 0;
		}
		else {
			$success = true;
			$row     = pg_fetch_assoc($rs);
			$id      = $row['idquiz'];		 				
		}


		echo json_encode(array(
			"success" => $success,
			"action"  => "Inseri",
			"quiz"    => array(
				"idquiz" => $id,
				"title"  => $title
			)
		));	
	}

	function editQuiz() {
		parse_str(file_get_contents("php://input"), $post_vars);		
		$info   = $post_vars['quiz'];
		$data   = json_decode($info);
		$idquiz = $data->idquiz;
		$title  = $data->title;

		$query = "UPDATE quiz SET title = '$title' WHERE idquiz = $idquiz;";
		$rs = pg_query($query);

		if (!$rs) {
			$success = false;
		}
		else {
			$success = true;
		}
		 
		echo json_encode(array(
			"success" => $success,
			"action"  => "Atualiza",
			"quiz"    => array(
				"idquiz" => $idquiz,
				"title"  => $title
			)
		));
	}

	function delQuiz() {		
		parse_str(file_get_contents("php://input"), $post_vars);
		$info   = $post_vars['quiz'];
		$data   = json_decode($info);
		$idquiz = $data->idquiz;		

		$query  = "DELETE FROM peopleanswer WHERE question_idquestion IN (SELECT idquestion FROM question WHERE quiz_idquiz = $idquiz);";
		$query .= "DELETE FROM answer WHERE question_idquestion IN (SELECT idquestion FROM question WHERE quiz_idquiz = $idquiz);";
		$query .= "DELETE FROM question WHERE quiz_idquiz = $idquiz;";
		$query .= "DELETE FROM quiz WHERE idquiz = $idquiz;";
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