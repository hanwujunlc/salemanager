<?php

	$action = $_GET['action'];
	$msg = $_GET['msg'];

    $conn=mysqli_connect("localhost","salemanager","123456")or die ("连接数据库服务器失败！".mysql_error());
    $select =mysqli_select_db($conn, "salemanager");

	if ("insert" == $action) {
		insert_new_customer($msg, $conn);//
	} elseif ("list" == $action) {
		list_customer($msg, $conn);
	} elseif ("delete" == $action) {

	}

	function insert_new_customer($value='', $conn)
	{
		# code...
		$node = json_decode($value);
		if($node) {
			if ("" != $node->name) {
				$sql_str = 'INSERT INTO customer (name, telephone, addr) VALUES ("' . $node->name . '", "' . $node->telephone . '", "' .  $node->addr .'")';
				
				$ret = mysqli_query($conn, $sql_str);
				if (!$ret)
				{
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
			echo '{"ret": "PARAM_INVALID", "data": "2"}';
		}
	}

	function list_customer($value='', $conn)
	{
		# code...
		$sql_str = 'select id, name, telephone, addr from customer';
		#echo $sql_str;

		$ret = mysqli_query($conn, $sql_str);

		while($result = mysqli_fetch_array($ret)) {

			echo $result['id'] . "<br />"  . $result['name'] . "<br />" . $result['telephone'] . "<br />" . $result['addr'] . "\r\n";
		}
	}

	 
     
    mysqli_close($conn);
?>

