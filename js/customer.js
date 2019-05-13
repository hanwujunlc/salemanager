document.write("<script language=javascript src='js/index.js' charset=\"utf-8\"></script>");

var xmlhttp = null;
var customer_list = [];
var template_div_node;
var template_table_node;
var template_new_bt_node;
var template_add_tab_bt_cancle_node;
var template_add_tab_bt_confirm_node;
 
function customer_data_manager(argument) {
	// body...
    console.log("customer_data_manager")
    template_div_node = document.getElementById("template_tab_div");
    template_div_node.style.display = "block";
    template_table_node = document.getElementById("template_table_tab");
    template_new_bt_node = document.getElementById("template_new_bt");

    //template_new_bt_node.setAttribute('onclick', add_new_customer_data);
    //template_new_bt_node.attachEvent("onclick", add_new_customer_data);
    template_new_bt_node.onclick = add_new_customer_data;
    template_add_tab_bt_confirm_node = document.getElementById("template_add_tab_bt_confirm");
    template_add_tab_bt_cancle_node = document.getElementById("template_add_tab_bt_cancle");
    template_add_tab_bt_confirm_node.onclick = add_new_customer_data_confirm;
    template_add_tab_bt_cancle_node.onclick = add_new_customer_data_cancle;
    init_customer_table_th();
    get_customer_data();

}

var template_add_tab_node;
var template_add_tab_title_node;
var template_add_tab_id_node;
var template_add_tab_input_node;
function add_new_customer_data(argument) {
	// body...
	console.log("add_new_customer_data")
	showUserBg();
	show_template_add_tab();
	template_add_tab_title_node = document.getElementById("template_add_tab_title");
	template_add_tab_title_node.innerHTML = "添加客户";
	template_add_tab_id_node = document.getElementById("template_add_tab_id");
	clear_node_all_child(template_add_tab_id_node);
	var name = document.createElement("p");
	name.innerHTML = "名字";
	name.id = "add_new_customer_p_name_id";
	template_add_tab_id_node.appendChild(name);
	var telephone = document.createElement("p");
	telephone.innerHTML = "电话";
	telephone.id = "add_new_customer_p_telephone_id";
	template_add_tab_id_node.appendChild(telephone);
	var addr = document.createElement("p");
	addr.innerHTML = "地址";
	addr.id = "add_new_customer_p_addr_id";
	template_add_tab_id_node.appendChild(addr);

	template_add_tab_input_node = document.getElementById("template_add_tab_input");
	clear_node_all_child(template_add_tab_input_node);
	var name_input = document.createElement("input");
	name_input.type = "text";
	name_input.id = "add_new_customer_input_name_id"
	template_add_tab_input_node.appendChild(name_input);

	var telephone_input = document.createElement("input");
	telephone_input.type = "text";
	telephone_input.id = "add_new_customer_telephone_name_id"
	template_add_tab_input_node.appendChild(telephone_input);

	var addr_input = document.createElement("input");
	addr_input.type = "text";
	addr_input.id = "add_new_customer_input_addr_id"
	template_add_tab_input_node.appendChild(addr_input);


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


function add_new_customer_data_confirm(argument) {
	// body...
	console.log("add_new_customer_data_confirm");
	hidder_template_add_tab();
	
	var name = document.getElementById("add_new_customer_input_name_id").value;
	console.log(name);
	var telephone = document.getElementById("add_new_customer_telephone_name_id").value;
	console.log(telephone);
	var addr = document.getElementById("add_new_customer_input_addr_id").value;
	console.log(addr);
	var data = '{"name":"' + name + '", "telephone":"' + telephone + '", "addr":"' + addr + '"}';
	var  urladdr = httpurl + "/php/customerAction.php?action=insert&msg=" + data;
	console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	sendHTTPRequest(urladdr, inser_customer_func);
}

function inser_customer_func(argument) {
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

function add_new_customer_data_cancle(argument) {
	// body...
	console.log("add_new_customer_data_cancle");
	hidder_template_add_tab();
}

function get_customer_data(argument) {
	// body...

	customer_list = [];
	var data = '{}';
	var  urladdr = httpurl + "/php/customerAction.php?action=list&msg=" + data;
	console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	sendHTTPRequest(urladdr, get_customer_func);

}

function get_customer_func(argument) {
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
          if(4 == array2.length){ 
              var node = {};
              node.id = array2[0];
              node.name = array2[1];
              node.telephone =  array2[2];
              node.addr = array2[3];
              customer_list.push(node);
          } 
        }
      show_customer_info();
    }
  }
}


function show_customer_info () {
	console.log("show_customer_info");
    var rows = template_table_node.rows.length; 
    while(rows > 1) {
        template_table_node.deleteRow(rows - 1);
        rows--; 
    }
    // var data_left = customer_list.length - (user_data_current_page_index * tab_emlent_limit);

    // var limit = tab_emlent_limit > data_left ? data_left : tab_emlent_limit;

    // var data_rows = customer_list.length;

    // var tab_counts = customer_list.length / tab_emlent_limit;

    // if (Math.ceil(tab_counts) != Math.floor(tab_counts)) {
    //     tab_counts = Math.ceil(tab_counts);
    // }

    // list_total_id_node.innerHTML = data_rows;
    // tab_index_id_node.innerHTML = (user_data_current_page_index + 1) + "/" + tab_counts;

    for (var i = 0; i < customer_list.length; ++i) {

       // var i = i + user_data_current_page_index * tab_emlent_limit;

        var newrows = template_table_node.insertRow(i + 1);
        if (0 == (i + 1) % 2) {
            // /newrows.style.backgroundColor = "#e3e6ea"; //#f7f8fa
            newrows.style.backgroundColor = "#f7f8fa"; //#f7f8fa
            //newrows.style.opacity = 0.27;
        }

        // var id_node = newrows.insertCell(0);
        // id_node.innerHTML = customer_list[i].id;

        var user_node = newrows.insertCell(0);
        user_node.innerHTML = customer_list[i].name;

		var telephone_node = newrows.insertCell(1);
		telephone_node.innerHTML = customer_list[i].telephone;

		var addr_node = newrows.insertCell(2);
		addr_node.innerHTML = customer_list[i].addr;

    }

}


function init_customer_table_th(argument) {
	// body...
	console.log("init_customer_table_th");
	var rows = template_table_node.rows.length; 
	template_table_node.deleteRow(0);
	var throws = template_table_node.insertRow(0);

	//throws.appendChild(creatThByValue("ID"));
	throws.appendChild(creatThByValue("名称"));
	throws.appendChild(creatThByValue("电话"));
	throws.appendChild(creatThByValue("地址"));
}