<?php

	$action = $_GET['action'];
	$msg = $_GET['msg'];

    $conn=mysqli_connect("localhost","salemanager","123456")or die ("连接数据库服务器失败！".mysql_error());
    $select =mysqli_select_db($conn, "salemanager");

	if ("insert" == $action) {
		insert_new_stock($msg, $conn);//
	} elseif ("list" == $action) {
		list_stock($msg, $conn);
	} elseif ("delete" == $action) {

	}

	function insert_new_stock($value='', $conn)
	{
		# code...
		$node = json_decode($value);
		if($node) {
			if ("" != $node->name) {
				$sql_str = 'INSERT INTO `stock_data` (item_id, number, cost)  values ((SELECT id FROM `items` WHERE name = "' .  $node->name .'"),"' . $node->number . '", "' . $node->cost . '")';
				$ret = mysqli_query($conn, $sql_str);
				if (!$ret)
				{
					echo '{"ret": "INSERT_FAILED", "data": "0"}';
				} 
				else 
				{
					$id = mysqli_insert_id($conn);
					echo '{"ret": "OK", "data": "' . $id . '"}';
				}
			     

			} else {
				echo '{"ret": "PARAM_INVALID", "data": "0"}';
			}
		} else {
			echo '{"ret": "PARAM_INVALID", "data": "0"}';
		}
	}

	function list_stock($value='', $conn)
	{
		# code...
		$sql_str = 'select a.id, b.name, a.number, a.cost, a.stock_time from `stock_data` a inner join `items` b on a.item_id = b.id';
		#echo $sql_str;

		$ret = mysqli_query($conn, $sql_str);

		while($result = mysqli_fetch_array($ret)) {

			echo  $result['id'] . "<br />" . $result['name'] . "<br />" .  $result['number'] . "<br />" . $result['cost'] . "<br />" . $result['stock_time'] . "\r\n";
		}
	}
     
    mysqli_close($conn);
?>

