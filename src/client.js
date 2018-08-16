//###############################CONSTANTS#############################//
let intext = 'in';
let outtext = 'out';
let selectJSON = 'selectFiles';
//###############################CONSTANTS#############################//

function setText(textareaid, text) {
    document.getElementById(textareaid).innerHTML = text;
}


function loadJSON(){
    let files = document.getElementById(selectJSON).files;
    let value = document.getElementById(selectJSON).value;
    let filereader = new FileReader();
//проверка на попытку загрузки пустого файла
    if (value == '') {
        
        console.log(document.getElementById(outtext).value);
        if (document.getElementById(outtext).value == "") { //проверка формы, если форма содержит текст - попытка загрузить текст
            alert('empty');
        }
        else {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    alert('данные записаны:'+ this.responseText);
                }
            };
            xmlhttp.open('POST', document.URL+'senddata');
            xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xmlhttp.send(document.getElementById(outtext).value);
        }
    }

    else {

        filereader.onload = function(e) {
            let result = JSON.parse(e.target.result);
            let formatted = JSON.stringify(result, null, 2);
            document.getElementById(outtext).value = formatted;
            let xmlhttp = new XMLHttpRequest();// new HttpRequest instance
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    setText(outtext,this.responseText);
                    alert('данные записаны:'+this.responseText);
                }
            };
            xmlhttp.open('POST', document.URL+'senddata');
            xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xmlhttp.send(formatted);
    };
        filereader.readAsText(files.item(0));
}
}


function findJSON() {

    let xmlhttp = new XMLHttpRequest();
    let key1 = document.getElementById('key').value;
    let val = document.getElementById('value').value;
    let data = '{'+'"'+key1+'"'+':'+val+'}';
    if ((val == '' && key1 != '') || (val != '' && key1 == '')) {
        alert('Please, enter key and value for search')
    }
    else {
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(intext).innerHTML =
                    this.responseText;
            }
        };
        xmlhttp.open('POST', document.URL + 'getdata');
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        if (data == '{"":}') {
            xmlhttp.send();
        }
        else xmlhttp.send((data));
    }
}


function findlastJSON() {

    let xmlhttp = new XMLHttpRequest();
    let key1 = document.getElementById('key').value;
    let val = document.getElementById('value').value;
    if ((val == '' && key1 != '') || (val != '' && key1 == '')) {
        alert('Please, enter key and value for search')
    }
    else {
        let data = '{'+'"'+key1+'"'+':'+val+'}';
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(intext).innerHTML = this.responseText;
            }
        };
    xmlhttp.open('POST', document.URL+'getlastdata');
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    if (data == '{"":}') {
        xmlhttp.send();
    }
    else xmlhttp.send((data));
    }
}


function deleteJSON() {
    let id = document.getElementById('deleteid').value;
    if (id == '') {
        alert('Please enter _id');
    }
    else {
        let result = confirm('are you shure?');
        if (result) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(intext).innerHTML = this.responseText;
                console.log(this.responseText);
            }
        };
        xmlhttp.open('DELETE', document.URL + 'deletedata/' + id, true);
        xmlhttp.send();
    }
    else {alert('selected object deleted')}
    }
}


function mongoConnect() {
    document.getElementById('bconnect').disabled = true;
    let connectionString = document.getElementById('mongo').value;
    let bd = document.getElementById('bd').value;
    let schema = document.getElementById('schema').value;
    if (connectionString == '' || bd == '' || schema == '') {
        document.getElementById('response').innerHTML = '<p>Empty uri field</p>';
        document.getElementById('bconnect').disabled = false;
    }
    else {
        let xmlhttp = new XMLHttpRequest();
        document.getElementById('response').innerHTML = '<p>Connecting...</p>'+'<img src="./loading.gif" width="50" height="50"/>';
        xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('response').innerHTML = '<p>'+this.responseText+'</p>';
            document.getElementById('bconnect').disabled = false;
        }
    };
    xmlhttp.open('POST', document.URL+'setmongoconnect/');
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xmlhttp.send(('{'+'"string"'+':'+'"'+connectionString+'"'+','
        +'"bd"'+':'+'"'+bd+'"'+','+'"schema"'+':'+'"'+schema+'"'+'}'));
    }
}