<?php

    $conn=mysqli_connect("localhost","salemanager","123456")or die ("连接数据库服务器失败！".mysql_error());
    $select =mysqli_select_db($conn, "salemanager");

	$name = $_GET['name'];
	$telephone = $_GET['telephone'];
	$addr = $_GET['addr'];
	$sql_str = 'INSERT INTO customer (name, telephone, addr) VALUES ("' . $name . '", "' . $telephone . '", "' .  $addr .'")';
	#echo $sql_str;

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
     
    mysqli_close($conn);
?>

