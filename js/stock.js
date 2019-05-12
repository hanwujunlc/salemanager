document.write("<script language=javascript src='js/index.js' charset=\"utf-8\"></script>");

var xmlhttp = null;
var stock_list = [];
var template_div_node;
var template_table_node;
var template_new_bt_node;
var template_add_tab_bt_cancle_node;
var template_add_tab_bt_confirm_node;
 
function stock_data_manager(argument) {
	// body...
    console.log("stock_data_manager")
    template_div_node = document.getElementById("template_tab_div");
    template_div_node.style.display = "block";
    template_table_node = document.getElementById("template_table_tab");
    template_new_bt_node = document.getElementById("template_new_bt");

    //template_new_bt_node.setAttribute('onclick', add_new_stock_data);
    //template_new_bt_node.attachEvent("onclick", add_new_stock_data);
    template_new_bt_node.onclick = add_new_stock_data;
    template_add_tab_bt_confirm_node = document.getElementById("template_add_tab_bt_confirm");
    template_add_tab_bt_cancle_node = document.getElementById("template_add_tab_bt_cancle");
    template_add_tab_bt_confirm_node.onclick = add_new_stock_data_confirm;
    template_add_tab_bt_cancle_node.onclick = add_new_stock_data_cancle;
    get_stock_data();

}

var template_add_tab_node;
var template_add_tab_title_node;
var template_add_tab_id_node;
var template_add_tab_input_node;
function add_new_stock_data(argument) {
	// body...
	console.log("add_new_stock_data")
	showUserBg();
	show_template_add_tab();
	template_add_tab_title_node = document.getElementById("template_add_tab_title");
	template_add_tab_title_node.innerHTML = "添加库存";
	template_add_tab_id_node = document.getElementById("template_add_tab_id");
	clear_node_all_child(template_add_tab_id_node);
	var name = document.createElement("p");
	name.innerHTML = "名称";
	name.id = "add_new_stock_p_name_id";
	template_add_tab_id_node.appendChild(name);
	var number = document.createElement("p");
	number.innerHTML = "数量";
	number.id = "add_new_stock_p_number_id";
	template_add_tab_id_node.appendChild(number);
	var cost = document.createElement("p");
	cost.innerHTML = "单价";
	cost.id = "add_new_stock_p_cost_id";
	template_add_tab_id_node.appendChild(cost);

	template_add_tab_input_node = document.getElementById("template_add_tab_input");
	clear_node_all_child(template_add_tab_input_node);
	var name_input = document.createElement("input");
	name_input.type = "text";
	name_input.id = "add_new_stock_input_name_id"
	template_add_tab_input_node.appendChild(name_input);

	var number_input = document.createElement("input");
	number_input.type = "text";
	number_input.id = "add_new_stock_number_name_id"
	template_add_tab_input_node.appendChild(number_input);

	var cost_input = document.createElement("input");
	cost_input.type = "text";
	cost_input.id = "add_new_stock_input_cost_id"
	template_add_tab_input_node.appendChild(cost_input);


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

function template_add_tab_bt_cancle(argument) {
	// body...
	hidder_template_add_tab();

}

function template_add_tab_bt_confirm(argument) {
	// body...
	hidder_template_add_tab();
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


function add_new_stock_data_confirm(argument) {
	// body...
	console.log("add_new_stock_data_confirm");
	hidder_template_add_tab();
	
	var name = document.getElementById("add_new_stock_input_name_id").value;
	console.log(name);
	var number = document.getElementById("add_new_stock_number_name_id").value;
	console.log(number);
	var cost = document.getElementById("add_new_stock_input_cost_id").value;
	console.log(cost);
	var data = '{"name":"' + name + '", "number":"' + number + '", "cost":"' + cost + '"}';
	var  urladdr = httpurl + "/php/stockAction.php?action=insert&msg=" + data;
	console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	sendHTTPRequest(urladdr, inser_stock_func);
}

function inser_stock_func(argument) {
	// body...
	if (xmlhttp.readyState == 4) {
	    console.log("this.status = " + this.status);
	    console.log("this.responseText = " + this.responseText);
	    if (xmlhttp.status == 200) //TODO
	    {
	      var data = this.responseText;
	      console.log(data);
		}
	}

}

function add_new_stock_data_cancle(argument) {
	// body...
	console.log("add_new_stock_data_cancle");
	hidder_template_add_tab();
}

function get_stock_data(argument) {
	// body...

	stock_list = [];
	var data = '{}';
	var  urladdr = httpurl + "/php/stockAction.php?action=list&msg=" + data;
	console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	sendHTTPRequest(urladdr, get_stock_func);

}

function get_stock_func(argument) {
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
          if(5 == array2.length){ 
              var node = {};
              node.id = array2[0];
              node.name = array2[1];
              node.number =  array2[2];
              node.cost = array2[3];
              node.stock_time = array2[4];
              stock_list.push(node);
          } 
        }
      show_stock_info();
    }
  }
}


function show_stock_info () {
	console.log("show_stock_info");
    var rows = template_table_node.rows.length; 
    while(rows > 1) {
        template_table_node.deleteRow(rows - 1);
        rows--; 
    }
    // var data_left = stock_list.length - (user_data_current_page_index * tab_emlent_limit);

    // var limit = tab_emlent_limit > data_left ? data_left : tab_emlent_limit;

    // var data_rows = stock_list.length;

    // var tab_counts = stock_list.length / tab_emlent_limit;

    // if (Math.ceil(tab_counts) != Math.floor(tab_counts)) {
    //     tab_counts = Math.ceil(tab_counts);
    // }

    // list_total_id_node.innerHTML = data_rows;
    // tab_index_id_node.innerHTML = (user_data_current_page_index + 1) + "/" + tab_counts;

    for (var i = 0; i < stock_list.length; ++i) {

       // var i = i + user_data_current_page_index * tab_emlent_limit;

        var newrows = template_table_node.insertRow(i + 1);
        if (0 == (i + 1) % 2) {
            // /newrows.style.backgroundColor = "#e3e6ea"; //#f7f8fa
            newrows.style.backgroundColor = "#f7f8fa"; //#f7f8fa
            //newrows.style.opacity = 0.27;
        }

        var name_node = newrows.insertCell(0);
        name_node.innerHTML = stock_list[i].name;

        var number_node = newrows.insertCell(1);
        number_node.innerHTML = stock_list[i].number;

		var cost_node = newrows.insertCell(2);
		cost_node.innerHTML = stock_list[i].cost;

		var stock_time_node = newrows.insertCell(3);
		stock_time_node.innerHTML = stock_list[i].stock_time;

    }

}