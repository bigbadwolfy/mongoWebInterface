//###############################CONSTANTS#############################//
var intext = 'in';
var outtext = 'out';
var selectJSON = 'selectFiles';
//###############################CONSTANTS#############################//


function setText(textareaid, text) {

    document.getElementById(textareaid).innerHTML = text;

}


function loadJSON(){

    var files = document.getElementById(selectJSON).files;
    var value = document.getElementById(selectJSON).value;

    var fr = new FileReader();

//проверка на попытку загрузки пустого файла\
    if (value == "") {
        
        console.log(document.getElementById(outtext).value);
        if (document.getElementById(outtext).value == "") { //проверка формы, если форма содержит текст - попытка загрузить текст
            alert('empty');
        }
        else {
            var xmlhttp = new XMLHttpRequest();
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
    
    fr.onload = function(e) {

        var result = JSON.parse(e.target.result);
        var formatted = JSON.stringify(result, null, 2);
        document.getElementById(outtext).value = formatted;
        var xmlhttp = new XMLHttpRequest();// new HttpRequest instance

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                setText(outtext,this.responseText);
                console.log(this.responseText);
                alert('данные записаны:'+this.responseText);

            }
        };

        xmlhttp.open('POST', document.URL+'senddata');
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlhttp.send(formatted);
    };

    fr.readAsText(files.item(0));
}
}


function findJSON() {

    var xmlhttp = new XMLHttpRequest();
    var key1 = document.getElementById('key').value;
    var val = document.getElementById('value').value;
    var data = '{"'+key1+'":'+val+'}';


    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(intext).innerHTML =
                this.responseText;
            console.log(this.responseText);
        }
    };

    xmlhttp.open('POST', document.URL+'getdata');
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    if (data == '{"":}') {
        xmlhttp.send();
    }
    else xmlhttp.send((data));


}


function findlastJSON() {

    var xmlhttp = new XMLHttpRequest();
    var key1 = document.getElementById('key').value;
    var val = document.getElementById('value').value;

    var data = '{"'+key1+'":'+val+'}';
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(intext).innerHTML =
                this.responseText;
            console.log(this.responseText);
        }
    };

    xmlhttp.open('POST', document.URL+'getlastdata');
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    if (data == '{"":}') {
        xmlhttp.send();
    }
    else xmlhttp.send((data));


}


function deleteJSON() {

    var id = document.getElementById('deleteid').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(intext).innerHTML =
                this.responseText;
            console.log(this.responseText);
        }
    };

    xmlhttp.open('DELETE', document.URL+'deletedata/'+id,true);
    xmlhttp.send();
}


function mongoConnect() {
    document.getElementById('bconnect').disabled = true;
    var connectionString = document.getElementById('mongo').value;
    var xmlhttp = new XMLHttpRequest();
    document.getElementById('response').innerHTML = '<p>Connecting...</p>'+'<img src="./loading.gif" width="50" height="50"/>';
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('response').innerHTML = '<p>'+this.responseText+'</p>';
            document.getElementById('bconnect').disabled = false;
        }
    };
    xmlhttp.open('POST', document.URL+'setmongoconnect/');
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xmlhttp.send(('{'+'"string"'+':'+'"'+connectionString+'"'+'}'));

}