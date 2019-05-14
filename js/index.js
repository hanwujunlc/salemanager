
var httpurl = "";
var xmlhttp = null;

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

var user_manager_bg_node;

function showUserBg () {

  if (!user_manager_bg_node) {
    user_manager_bg_node = document.getElementById("user_manager_bg");
  }
  user_manager_bg_node.style.display = "block";
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
    setTimeout(hidediv,2000000);
}

function hidediv() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("show").style.display ='none';
    document.getElementById("singlebutton").style.display ='none';
}



function creatThByValue(value) {
  // body...
  var th_node  = document.createElement("TH");
  var value_node = document.createTextNode(value);
  th_node.appendChild(value_node);
  return th_node;

}