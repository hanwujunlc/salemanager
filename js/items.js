document.write("<script language=javascript src='js/index.js' charset=\"utf-8\"></script>");

var xmlhttp = null;
var items_list = [];
var template_div_node;
var template_table_node;
var template_new_bt_node;
var template_add_tab_bt_cancle_node;
var template_add_tab_bt_confirm_node;

function item_data_manager(argument) {
	// body...
    console.log("item_data_manager")
    template_div_node = document.getElementById("template_tab_div");
    template_div_node.style.display = "block";
    template_table_node = document.getElementById("template_table_tab");
    template_new_bt_node = document.getElementById("template_new_bt");

    //template_new_bt_node.setAttribute('onclick', add_new_item_data);
    //template_new_bt_node.attachEvent("onclick", add_new_item_data);
    template_new_bt_node.onclick = add_new_item_data;
    template_add_tab_bt_confirm_node = document.getElementById("template_add_tab_bt_confirm");
    template_add_tab_bt_cancle_node = document.getElementById("template_add_tab_bt_cancle");
    template_add_tab_bt_confirm_node.onclick = add_new_item_data_confirm;
    template_add_tab_bt_cancle_node.onclick = add_new_item_data_cancle;
    init_item_table_th();
    get_items_data();
}

var template_add_tab_node;
var template_add_tab_title_node;
var template_add_tab_id_node;
var template_add_tab_input_node;
function add_new_item_data(argument) {
	// body...
	console.log("add_new_item_data")
	showUserBg();
	show_template_add_tab();
	template_add_tab_title_node = document.getElementById("template_add_tab_title");
	template_add_tab_title_node.innerHTML = "添加物品";
	template_add_tab_id_node = document.getElementById("template_add_tab_id");
	clear_node_all_child(template_add_tab_id_node);
	var name = document.createElement("p");
	name.innerHTML = "名称";
	name.id = "add_new_iterm_p_name_id";
	template_add_tab_id_node.appendChild(name);
	template_add_tab_input_node = document.getElementById("template_add_tab_input");
	clear_node_all_child(template_add_tab_input_node);
	var name_input = document.createElement("input");
	name_input.type = "text";
	name_input.id = "add_new_iterm_input_name_id"
	template_add_tab_input_node.appendChild(name_input);


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
	// var width = (window.innerWidth - template_add_tab_node.offsetWidth - 20 ) / 2;
	// template_add_tab_node.style.left = width + "px";
}


function clear_node_all_child(node) {
	// body...
	index = node.childElementCount;
	for (i = index - 1 ; i >= 0; --i) {
		node.removeChild(node.children[i])
	}
}


function add_new_item_data_confirm(argument) {
	// body...
	console.log("add_new_item_data_confirm");
	hidder_template_add_tab();
	

	var value = document.getElementById("add_new_iterm_input_name_id").value;
	console.log(value);

	if ("" == value) {
		showlogininfo("输入为空！");
	}

	var data = '{"name":"' + value + '"}';
	var  urladdr = httpurl + "/php/itemAction.php?action=insert&msg=" + data;
	console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	sendHTTPRequest(urladdr, inser_item_func);
}

function inser_item_func(argument) {
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

function add_new_item_data_cancle(argument) {
	// body...
	console.log("add_new_item_data_cancle");
	hidder_template_add_tab();
}

function get_items_data(argument) {
	// body...

	items_list = [];
	var data = '{}';
	var  urladdr = httpurl + "/php/itemAction.php?action=list&msg=" + data;
	console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	sendHTTPRequest(urladdr, get_item_func);

}

function get_item_func(argument) {
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
				if(3 == array2.length)
				{ 
					var node = {};
					node.id = array2[0];
					node.name = array2[1];
					items_list.push(node);
				} 
			}
			show_item_info()
		}
	}
}


function show_item_info () {
	console.log("show_item_info");
    var rows = template_table_node.rows.length; 
    while(rows > 1) {
        template_table_node.deleteRow(rows - 1);
        rows--; 
    }
    // var data_left = items_list.length - (user_data_current_page_index * tab_emlent_limit);

    // var limit = tab_emlent_limit > data_left ? data_left : tab_emlent_limit;

    // var data_rows = items_list.length;

    // var tab_counts = items_list.length / tab_emlent_limit;

    // if (Math.ceil(tab_counts) != Math.floor(tab_counts)) {
    //     tab_counts = Math.ceil(tab_counts);
    // }

    // list_total_id_node.innerHTML = data_rows;
    // tab_index_id_node.innerHTML = (user_data_current_page_index + 1) + "/" + tab_counts;

    for (var i = 0; i < items_list.length; ++i) {

       // var i = i + user_data_current_page_index * tab_emlent_limit;

        var newrows = template_table_node.insertRow(i + 1);
        if (0 == (i + 1) % 2) {
            // /newrows.style.backgroundColor = "#e3e6ea"; //#f7f8fa
            newrows.style.backgroundColor = "#f7f8fa"; //#f7f8fa
            //newrows.style.opacity = 0.27;
        }

        var id_node = newrows.insertCell(0);
        id_node.innerHTML = items_list[i].id;

        var user_node = newrows.insertCell(1);
        user_node.innerHTML = items_list[i].name;

    }

}

function init_item_table_th(argument) {
	// body...
	console.log("init_item_table_th");
	var rows = template_table_node.rows.length; 
	template_table_node.deleteRow(0);
	var throws = template_table_node.insertRow(0);

	var id_node = creatThByValue("ID");
	throws.appendChild(id_node);
	var name_node = creatThByValue("名称");
	throws.appendChild(name_node);

}