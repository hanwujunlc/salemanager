<?php

	$action = $_GET['action'];
	$msg = $_GET['msg'];

    $conn=mysqli_connect("localhost","salemanager","123456")or die ("连接数据库服务器失败！".mysql_error());
    $select =mysqli_select_db($conn, "salemanager");

	if ("insert" == $action) {
		insert_new_item($msg, $conn);//
	} elseif ("list" == $action) {
		list_items($msg, $conn);
	} elseif ("delete" == $action) {

	}

	function insert_new_item($value='', $conn)
	{
		# code...
		$node = json_decode($value);
		if($node) {
			if ("" != $node->name) {
				$sql_str = 'INSERT INTO items (name) VALUES ("' .  $node->name .'")';
				$ret = mysqli_query($conn, $sql_str);
				if (!$ret)
				{
					//echo '{"ret": "OK", "data": "' . $data . '"}';
					echo '{"ret": "INSERT_FAILED", "data": "0"}';
				} 
				else 
				{
					$useid = mysqli_insert_id($conn);
					echo '{"ret": "OK", "data": "' . $useid . '"}';
				}
			     

			} else {
				echo '{"ret": "PARAM_INVALID", "data": "0"}';
			}
		} else {
			echo '{"ret": "PARAM_INVALID", "data": "0"}';
		}
	}

	function list_items($value='', $conn)
	{
		# code...
		$sql_str = ' select id, name from items';
		#echo $sql_str;

		$ret = mysqli_query($conn, $sql_str);

		while($result = mysqli_fetch_array($ret)) {

			echo  $result['id'] . "<br />"  .$result['name'] . "<br />"  . "\r\n";
		}
	}

	 
     
    mysqli_close($conn);
?>

