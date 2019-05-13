<?php

	$action = $_GET['action'];
	$msg = $_GET['msg'];

    $conn=mysqli_connect("localhost","salemanager","123456")or die ("连接数据库服务器失败！".mysql_error());
    $select =mysqli_select_db($conn, "salemanager");

	if ("insert" == $action) {
		insert_new_sale_data($msg, $conn);//
	} elseif ("list" == $action) {
		list_sale_data($msg, $conn);
	} elseif ("delete" == $action) {

	}

	function insert_new_sale_data($value='', $conn)
	{
		# code...
		$node = json_decode($value);
		if($node) {
			if ("" != $node->customer) {
				$sql_str = 'INSERT INTO `sale_data` (customer_id, item_id, number, prices)  values ((SELECT id FROM `customer` WHERE name = "' .  $node->customer .'"),(SELECT id FROM `items` WHERE name = "' .  $node->item .'"),"'  . $node->number . '", "' . $node->prices . '")';
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

	function list_sale_data($value='', $conn)
	{
		# code...
		$sql_str = 'select a.id, c.name as customer, b.name as item, a.number, a.prices, a.sale_time 
from `sale_data` a inner join `items` b   inner join `customer` c 
on a.item_id = b.id and a.customer_id = c.id';
		#echo $sql_str;

		$ret = mysqli_query($conn, $sql_str);

		while($result = mysqli_fetch_array($ret)) {

			echo  $result['id'] . "<br />" . $result['customer'] . "<br />" .  $result['item'] . "<br />" .  $result['number'] . "<br />" . $result['prices'] . "<br />" . $result['sale_time'] . "\r\n";
		}
	}
     
    mysqli_close($conn);
?>

