<?php
	$user     = $_POST['user'];
	$password = $_POST['password'];

	if ($user == 'trezo' && $password == 'senha') {
		session_start();

		$_SESSION["user"] = $user;

		echo json_encode(array(
			"success"  => true		
		));		
	}
	else {
		echo json_encode(array(
			"failure"  => true		
		));	
	}
?>