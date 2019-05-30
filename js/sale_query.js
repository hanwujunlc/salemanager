document.write("<script language=javascript src='js/sale.js' charset=\"utf-8\"></script>");



function add_new_sale_query(argument) {
	// body...
	console.log("add_new_sale_query")
	showUserBg();
	show_template_add_tab();
	template_add_tab_title_node = document.getElementById("template_add_tab_title");
	template_add_tab_title_node.innerHTML = "添加查询条件";
	template_add_tab_id_node = document.getElementById("template_add_tab_id");
	clear_node_all_child(template_add_tab_id_node);
	var customer = document.createElement("p");
	customer.innerHTML = "客户";
	customer.id = "add_new_sale_p_customer_id";
	template_add_tab_id_node.appendChild(customer);
	var item = document.createElement("p");
	item.innerHTML = "物品";
	item.id = "add_new_sale_p_item_id";
	template_add_tab_id_node.appendChild(item);

	var begin_time_p = document.createElement("p");
	begin_time_p.innerHTML = "开始时间";
	begin_time_p.id = "add_new_sale_p_begin_time_id";
	template_add_tab_id_node.appendChild(begin_time_p);
	var end_time_p = document.createElement("p");
	end_time_p.innerHTML = "截止时间";
	end_time_p.id = "add_new_sale_p_end_time_id";
	template_add_tab_id_node.appendChild(end_time_p);

	template_add_tab_input_node = document.getElementById("template_add_tab_input");
	clear_node_all_child(template_add_tab_input_node);
	var customer_input = document.createElement("input");
	customer_input.type = "text";
	customer_input.id = "add_new_sale_input_customer_id"
	template_add_tab_input_node.appendChild(customer_input);

	var item_input = document.createElement("input");
	item_input.type = "text";
	item_input.id = "add_new_sale_input_item_id"
	template_add_tab_input_node.appendChild(item_input);

	var  begin_time_input = document.createElement("input");
	begin_time_input.type = "date"
	begin_time_input.id = "add_new_sale_begin_time_id"
	template_add_tab_input_node.appendChild(begin_time_input);

	var end_time_input = document.createElement("input");
	end_time_input.type = "date"
	end_time_input.id = "add_new_sale_end_time_id"
	template_add_tab_input_node.appendChild(end_time_input);


	template_add_tab_bt_confirm_node.onclick = add_new_sale_query_confirm;
    template_add_tab_bt_cancle_node.onclick = add_new_sale_query_cancle;
}


function add_new_sale_query_confirm(argument) {
	// body...
	console.log("add_new_sale_query_confirm");
	
	var customer = document.getElementById("add_new_sale_input_customer_id").value;
	console.log(customer);
	var item = document.getElementById("add_new_sale_input_item_id").value;
	console.log(item);

	var begin_time = document.getElementById("add_new_sale_begin_time_id").value;
	console.log(begin_time);
	var end_time = document.getElementById("add_new_sale_end_time_id").value;
	console.log(end_time);

	if ("" == customer && "" == item && "" == begin_time && "" == end_time) {
		showlogininfo("查询条件为空！")
		return;
	}
	hidder_template_add_tab();
	var data = '{"customer":"' + customer + '", "item":"' + item + 
	 '", "begin_time":"' + begin_time + '", "end_time":"' + end_time + '"}';
	var  urladdr = httpurl + "/php/saleAction.php?action=query&msg=" + data;
	console.log("urladdr = " + urladdr);
	sale_list = [];
	sendHTTPRequest(urladdr, get_sale_func);
}

function query_sale_func(argument) {
	// body...
	sale_list = [];
	console.log("query_sale_func");
	if (xmlhttp.readyState == 4) {
	    console.log("this.status = " + this.status);
	    console.log("this.responseText = " + this.responseText);
	    if (xmlhttp.status == 200) //TODO
	    {
	      var data = this.responseText;
	      console.log(data);
	      result = JSON.parse(data);
	      if ("OK" == result.ret) {
	      	// showlogininfo("新建销售数据成功！");
	      	get_sale_data();
	      } else {
	      	// showlogininfo("新建销售数据失败！")
	      }
		}
	}

}

function add_new_sale_query_cancle(argument) {
	// body...
	console.log("add_new_sale_query_cancle");
	hidder_template_add_tab();
}