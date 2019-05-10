<?php

    $conn=mysqli_connect("localhost","salemanager","123456")or die ("连接数据库服务器失败！".mysql_error());
    $select =mysqli_select_db($conn, "salemanager");

	$sql_str = ' select id, name, telephone, addr from customer';
	#echo $sql_str;

	$ret = mysqli_query($conn, $sql_str);

	while($result = mysqli_fetch_array($ret)) {

        echo $result['id'] . "<br />"  . $result['name'] . "<br />" . $result['telephone'] . "<br />" . $result['addr'] . "\r\n";
    }
     
    mysqli_close($conn);
?>

