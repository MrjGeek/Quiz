<html>

	<head>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
		<link rel="stylesheet" type="text/css" href="extjs/resources/ext-theme-classic/ext-theme-classic-all.css">
		<title>Joao Quiz</title>
	</head>

    <body> 

	</body>

	<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="extjs/ext-all.js"></script>
	<script type="text/javascript" src="extjs/locale/ext-lang-pt_BR.js"></script>	

	<?php
		session_start();
		if (isset($_SESSION['user'])) { 
			?>
			<script type="text/javascript" src="app.js?random=<?php echo uniqid();?> "></script>
			<?php
		}
		else {
			?>
			<script type="text/javascript" src="app/view/login/login.js?random=<?php echo uniqid();?> "></script>
			<?php
		}
	?>

	
</html>