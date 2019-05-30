document.write("<script language=javascript src='js/index.js' charset=\"utf-8\"></script>");

var xmlhttp = null;
var sale_list = [];
var template_div_node;
var template_table_node;
var template_new_bt_node;
var template_add_tab_bt_cancle_node;
var template_add_tab_bt_confirm_node;
 
function sale_data_manager(argument) {
	// body...
    console.log("sale_data_manager")
    template_div_node = document.getElementById("template_tab_div");
    template_div_node.style.display = "block";
    template_table_node = document.getElementById("template_table_tab");

    template_new_bt_node = document.getElementById("template_new_bt");
    template_new_bt_node.onclick = add_new_sale_data;

    template_add_tab_bt_confirm_node = document.getElementById("template_add_tab_bt_confirm");
    template_add_tab_bt_cancle_node = document.getElementById("template_add_tab_bt_cancle");

    init_the_template_new_bt();
    add_new_sale_query_bt();
    init_sale_table_th();
    get_sale_data();

}

var template_add_tab_node;
var template_add_tab_title_node;
var template_add_tab_id_node;
var template_add_tab_input_node;
function add_new_sale_data(argument) {
	// body...
	console.log("add_new_sale_data")
	showUserBg();
	show_template_add_tab();
	template_add_tab_title_node = document.getElementById("template_add_tab_title");
	template_add_tab_title_node.innerHTML = "添加销售数据";
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
	var number = document.createElement("p");
	number.innerHTML = "数量";
	number.id = "add_new_sale_p_number_id";
	template_add_tab_id_node.appendChild(number);
	var prices = document.createElement("p");
	prices.innerHTML = "单价";
	prices.id = "add_new_sale_p_prices_id";
	template_add_tab_id_node.appendChild(prices);

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

	var number_input = document.createElement("input");
	number_input.type = "text";
	number_input.id = "add_new_sale_number_customer_id"
	template_add_tab_input_node.appendChild(number_input);

	var prices_input = document.createElement("input");
	prices_input.type = "text";
	prices_input.id = "add_new_sale_input_prices_id"
	template_add_tab_input_node.appendChild(prices_input);

    template_add_tab_bt_confirm_node.onclick = add_new_sale_data_confirm;
    template_add_tab_bt_cancle_node.onclick = add_new_sale_data_cancle;

}

function add_new_data(argument) {
	// body...
	//add_test_data();
	console.log("add_new_data")
	showUserBg();
	template_add_tab_node = document.getElementById("template_add_tab_div");
	template_add_tab_node.style.display = "block";
	var width = (window.innerWidth - template_add_tab_node.offsetWidth - 20 ) / 2;
	template_add_tab_node.style.left = width + "px";

}

function hidder_template_add_tab(argument) {
	// body...
	hiddenUserBg();

	if (template_add_tab_node) {
		template_add_tab_node.style.display = "none";
	}
}

function show_template_add_tab(argument) {
	// body...
	template_add_tab_node = document.getElementById("template_add_tab_div");
	template_add_tab_node.style.display = "block";
	var width = (window.innerWidth - template_add_tab_node.offsetWidth - 20 ) / 2;
	template_add_tab_node.style.left = width + "px";
}


function clear_node_all_child(node) {
	// body...
	index = node.childElementCount;
	for (i = index - 1 ; i >= 0; --i) {
		node.removeChild(node.children[i])
	}
}


function add_new_sale_data_confirm(argument) {
	// body...
	console.log("add_new_sale_data_confirm");
	
	var customer = document.getElementById("add_new_sale_input_customer_id").value;
	console.log(customer);
	var item = document.getElementById("add_new_sale_input_item_id").value;
	console.log(item);

	var number = document.getElementById("add_new_sale_number_customer_id").value;
	console.log(number);
	var prices = document.getElementById("add_new_sale_input_prices_id").value;
	console.log(prices);

	if ("" == customer || "" == item || "" == number || "" == prices) {
		showlogininfo("添加数据为空！")
		return;
	}
	hidder_template_add_tab();
	var data = '{"customer":"' + customer + '", "item":"' + item + 
	 '", "number":"' + number + '", "prices":"' + prices + '"}';
	var  urladdr = httpurl + "/php/saleAction.php?action=insert&msg=" + data;
	console.log("urladdr = " + urladdr);
	sendHTTPRequest(urladdr, inser_sale_func);
}

function inser_sale_func(argument) {
	// body...
	if (xmlhttp.readyState == 4) {
	    console.log("this.status = " + this.status);
	    console.log("this.responseText = " + this.responseText);
	    if (xmlhttp.status == 200) //TODO
	    {
	      var data = this.responseText;
	      console.log(data);
	      result = JSON.parse(data);
	      if ("OK" == result.ret) {
	      	showlogininfo("新建销售数据成功！");
	      	get_sale_data();
	      } else {
	      	showlogininfo("新建销售数据失败！")
	      }
		}
	}

}

function add_new_sale_data_cancle(argument) {
	// body...
	console.log("add_new_sale_data_cancle");
	hidder_template_add_tab();
}

function get_sale_data(argument) {
	// body...

	sale_list = [];
	var data = '{}';
	var  urladdr = httpurl + "/php/saleAction.php?action=list&msg=" + data;
	console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	sendHTTPRequest(urladdr, get_sale_func);

}

function get_sale_func(argument) {
	// body...

  if (xmlhttp.readyState == 4) {
    console.log("this.status = " + this.status);
    console.log("this.responseText = " + this.responseText);
    if (xmlhttp.status == 200) //TODO
    {
      var data = this.responseText;
      console.log(data);
      var array = data.split("\r\n");
      for(var i = 0; i < array.length; i++) {
          var line = array[i];
          var array2 = line.split("<br />");
          if(6 == array2.length){ 
              var node = {};
              node.id = array2[0];
              node.customer = array2[1];
              node.item = array2[2];
              node.number =  array2[3];
              node.prices = array2[4];
              node.sale_time = array2[5];
              sale_list.push(node);
          } 
        }
      show_sale_info();
    }
  }
}


function show_sale_info () {
	console.log("show_sale_info");
    var rows = template_table_node.rows.length; 
    while(rows > 1) {
        template_table_node.deleteRow(rows - 1);
        rows--; 
    }
    // var data_left = sale_list.length - (user_data_current_page_index * tab_emlent_limit);

    // var limit = tab_emlent_limit > data_left ? data_left : tab_emlent_limit;

    // var data_rows = sale_list.length;

    // var tab_counts = sale_list.length / tab_emlent_limit;

    // if (Math.ceil(tab_counts) != Math.floor(tab_counts)) {
    //     tab_counts = Math.ceil(tab_counts);
    // }

    // list_total_id_node.innerHTML = data_rows;
    // tab_index_id_node.innerHTML = (user_data_current_page_index + 1) + "/" + tab_counts;

    for (var i = 0; i < sale_list.length; ++i) {

       // var i = i + user_data_current_page_index * tab_emlent_limit;

        var newrows = template_table_node.insertRow(i + 1);
        if (0 == (i + 1) % 2) {
            // /newrows.style.backgroundColor = "#e3e6ea"; //#f7f8fa
            newrows.style.backgroundColor = "#f7f8fa"; //#f7f8fa
            //newrows.style.opacity = 0.27;
        }

        var customer_node = newrows.insertCell(0);
        customer_node.innerHTML = sale_list[i].customer;

        var item_node = newrows.insertCell(1);
        item_node.innerHTML = sale_list[i].item;

        var number_node = newrows.insertCell(2);
        number_node.innerHTML = sale_list[i].number;

		var prices_node = newrows.insertCell(3);
		prices_node.innerHTML = sale_list[i].prices;

		var sale_time_node = newrows.insertCell(4);
		sale_time_node.innerHTML = sale_list[i].sale_time;

    }

}

function init_sale_table_th(argument) {
	// body...
	console.log("init_sale_table_th");
	var rows = template_table_node.rows.length; 
	template_table_node.deleteRow(0);
	var throws = template_table_node.insertRow(0);

	var id_node = creatThByValue("客户");
	throws.appendChild(id_node);
	var name_node = creatThByValue("物品");
	throws.appendChild(name_node);
	throws.appendChild(creatThByValue("数量"));
	throws.appendChild(creatThByValue("单价"));
	throws.appendChild(creatThByValue("时间"));

}


function add_new_sale_query_bt(argument) {
	// body...

    // var array = template_div_node.children;
    // for (var i = 0; i < array.length; ++i)
    // {
    // 	if ("template_new_bt" != array[i].id && "DIV" != array[i].tagName) 
    // 		template_div_node.removeChild(array[i]);
    // }
    var array = template_div_node.children;
    node = document.createElement('input');
    node.type = "button"
    node.value = "+ 添加查询";
    node.id = "template_new_sale_query_bt"
    node.onclick = add_new_sale_query
    template_div_node.insertBefore(node, array[array.length - 1]);
}

// function add_new_sale_query(argument) {
// 	// body...
// 	add_new_sale_query();
// }