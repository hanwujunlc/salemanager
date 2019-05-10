// document.write("<script language=javascript src='js/httprequest.js' charset=\"utf-8\"></script>");

var add_user_tab_node;
var httpurl = "";
var xmlhttp = null;

var user_list = [];
var table_node = document.getElementById("user_info_table");
var user_bottom_node = document.getElementById("user_list_bottom");
var use_list_node;
var list_total_id_node ;
var tab_index_id_node;

var user_data_current_page_index = 0;
var tab_emlent_limit = 9;

function sendHTTPRequest(url, func)
{

  if (xmlhttp == null)
  {
    if (window.XMLHttpRequest) 
    {
      xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  if (xmlhttp != null)
  {
    xmlhttp.onreadystatechange = func;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  else 
  {
    printlog("php is null");
  }
}




function get_customer_list(argument) {
  // body...
  user_list = []
  var  urladdr = httpurl + "/php/getCustomer.php";
  console.log("urladdr = " + urladdr);
  //sendHTTPRequest(urladdr, loginfunc);  
  sendHTTPRequest(urladdr, get_customer_func);
}

function get_customer_func__(argument) {
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
              user_list.push(node);
          } 
        }
      initUserTable();
    }
  }
}

function initUserTable () {
    closeUserTable();
    if (user_list.length > 0) {
        use_list_node.style.height = "551px";
        user_data_current_page_index = 0;
        showUserInfo();

    } else {
        use_list_node.style.height = "310px";
        //showEmptyInfo();
    }
}

function closeUserTable () {
    user_bottom_node.style.display = "block";
    document.getElementById("user_list_nodata_label").style.display = "none";
    var rows = table_node.rows.length; 
    while(rows > 1) {
        table_node.deleteRow(rows - 1);
        rows--; 
    }
}

function showUserInfo () {

    var rows = table_node.rows.length; 
    while(rows > 1) {
        table_node.deleteRow(rows - 1);
        rows--; 
    }
    var data_left = user_list.length - (user_data_current_page_index * tab_emlent_limit);

    var limit = tab_emlent_limit > data_left ? data_left : tab_emlent_limit;

    var data_rows = user_list.length;

    var tab_counts = user_list.length / tab_emlent_limit;

    if (Math.ceil(tab_counts) != Math.floor(tab_counts)) {
        tab_counts = Math.ceil(tab_counts);
    }

    list_total_id_node.innerHTML = data_rows;
    tab_index_id_node.innerHTML = (user_data_current_page_index + 1) + "/" + tab_counts;

    for (var i = 0; i < limit; ++i) {

        var data_index = i + user_data_current_page_index * tab_emlent_limit;

        var newrows = table_node.insertRow(i + 1);
        if (0 == (i + 1) % 2) {
            // /newrows.style.backgroundColor = "#e3e6ea"; //#f7f8fa
            newrows.style.backgroundColor = "#f7f8fa"; //#f7f8fa
            //newrows.style.opacity = 0.27;
        }

        var id_node = newrows.insertCell(0);
        id_node.innerHTML = user_list[data_index].id;

        var user_node = newrows.insertCell(1);
        user_node.innerHTML = user_list[data_index].name;

        var per_node = newrows.insertCell(2);
        per_node.innerHTML = user_list[data_index].telephone;

        var option_node = newrows.insertCell(3);
        //option_node.innerHTML = user_list[i].option;
        option_node.innerHTML = user_list[data_index].addr;

    }

    if (0 == limit) {
      //prev_page();
    }
}

function sale_data_manager() {
	console.log("sale_data_manager")
	//var  urladdr = httpurl + "/php/handler.php?username1="+username1+"&password1="+password1 + "&random=100";
	//console.log("urladdr = " + urladdr);
	//sendHTTPRequest(urladdr, loginfunc);  
	//sendHTTPRequest(urladdr,chkinputfunc);

}

function add_sale_data(argument) {
  showUserBg();
  add_user_tab_node = document.getElementById("add_user_tab");
  add_user_tab_node.style.display = "block";
  var width = (window.innerWidth - add_user_tab_node.offsetWidth) / 2;
  add_user_tab_node.style.left = width + "px";
  //creatOptionByPermissions(document.getElementById("add_user_input_select_id"));
}


var user_manager_bg_node;

function showUserBg () {

	if (!user_manager_bg_node) {
		user_manager_bg_node = document.getElementById("user_manager_bg");
	}
	user_manager_bg_node.style.display = "block";
}

function add_user_bt_cancle(argument) {
  // body...
  hiddenUserBg();

  if (add_user_tab_node) {
    add_user_tab_node.style.display = "none";
  }
}


function add_user_bt_confirm(argument) {
  // body...

  var name = document.getElementById("add_user_input_name");
  var telephone = document.getElementById("add_user_input_telephone");
  var addr = document.getElementById("add_user_input_addr");
  if ("" == name.value || "" == telephone || "" == addr) {
    showlogininfo("输入为空！");
    //return;
  }

  hiddenUserBg();

  if (add_user_tab_node) {
      add_user_tab_node.style.display = "none";
  }

  add_customer(name.value, telephone.value, addr.value);


}


function add_customer(name, telephone, addr) {
  // body...
  var  urladdr = httpurl + "/php/handler.php?name="+name+"&telephone="+telephone + "&addr="+addr;
  console.log("urladdr = " + urladdr);
  //sendHTTPRequest(urladdr, loginfunc);  
  sendHTTPRequest(urladdr,add_customer_func);
}

function add_customer_func(argument) {
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

function hiddenUserBg () {
  if (!user_manager_bg_node) {
    user_manager_bg_node = document.getElementById("user_manager_bg");
  }
  user_manager_bg_node.style.display = "none";
}

function singledialog(content,func_ok){
    this.content = content;
    this.ok = func_ok;
    document.getElementById('singlebutton').style.display = "block";
    document.getElementById('bg').style.display = "block";
}

function showlogininfo(str){
    var dialog1 = new singledialog(str);
    document.getElementById('singlecontent').innerHTML=dialog1.content;
    setTimeout(hidediv,2000);
}

function hidediv() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("show").style.display ='none';
    document.getElementById("singlebutton").style.display ='none';
}