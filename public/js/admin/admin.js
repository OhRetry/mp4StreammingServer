var parseVal = {};
function _parseStr(x){
    return x;
}
parseVal['str'] = _parseStr;
function _parseBool(x){
    return x == "true" ? true : false;
}
parseVal['bool'] = _parseBool;
function _parseInt(x){
    return parseInt(x);
}
parseVal['int'] = _parseInt;


const singleVal = {
    "NetworkInterface":"str",
    "getIPfromInterface":"bool",
    "ip":"str",
    "https":"bool",
    "port":"int",
    "root":"str"
}

/*
send new setting data with json. server can get json data by req.body.json
*/
function requestSave(){
    var form = document.getElementById("setForm");
    var json = {}

    //single value attribute
    for(var name in singleVal){
        var value = form.querySelector("input[name='" + name + "']").value;
        value = parseVal[singleVal[name]](value);
        json[name] = value;
    }

    //user Setting
    var users = [];
    var users_elem = document.getElementsByName('user');
    for(var elem of users_elem){
        var user = {}
        var value = elem.querySelector("input[name='id']").value;
        user['id'] = value;
        value = elem.querySelector("input[name='password']").value;
        user['password'] = value;
        value = elem.querySelector("input[name='admin']").value;
        user['admin'] = parseVal['bool'](value);
        users.push(user);
    }

    json['users'] = users;
    var body = {};
    body['setting'] = json;

    console.log(body);
    //request change to server
    var xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
        }
    }
    xhr.open('POST',"/adminSet",false);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.send(JSON.stringify(body));
}

function requestReset(){
    var xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
        }
    }
    xhr.open('POST',"/adminReset",false);
    xhr.send("Reset");
}

function addUser(){
    var user_box = document.getElementsByClassName('userBox')[0];
    var new_user = document.createElement('div');
    new_user.setAttribute('name','user');

    new_user.appendChild(document.createTextNode("User ID : "));
    var ipt_id = document.createElement('input');
    ipt_id.setAttribute('type','text');
    ipt_id.setAttribute('name','id');
    new_user.appendChild(ipt_id);

    new_user.appendChild(document.createTextNode("Password : "));
    var ipt_password = document.createElement('input');
    ipt_password.setAttribute('type','text');
    ipt_password.setAttribute('name','password');
    new_user.appendChild(ipt_password);

    new_user.appendChild(document.createTextNode("Admin : "));
    var ipt_admin = document.createElement('input');
    ipt_admin.setAttribute('type','text');
    ipt_admin.setAttribute('name','admin');    
    new_user.appendChild(ipt_admin);

    var ipt_delete = document.createElement('input');
    ipt_delete.setAttribute('type','button');
    ipt_delete.setAttribute('value','Delete');
    ipt_delete.setAttribute('onclick',"deleteUser(this)");
    new_user.appendChild(ipt_delete);

    new_user.appendChild(document.createElement('br'));

    user_box.appendChild(new_user);
}
function deleteUser(kk){
    console.log(kk);
}