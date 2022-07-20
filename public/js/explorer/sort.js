/*
* 연속된 숫자들은 하나의 수로써 비교.
* consider continous number of string as one integer.
* ex) 1.ts < 2.ts < 10.ts < 20.ts < 100.ts
* ex) abc1.ts < abc12.ts < abc20.ts < abc100.ts
* ex) abc1a.ts < abc12.ts < abc12abc.ts < abc100.ts
*/
function compareFunc_asc_name(a,b){
	a = a.name;
	b = b.name;
	
	var i = 0;
	while(true){
        //same string
        if(i == a.length && i == b.length)
            return 0;
        //b is start with a and b's length is long than a's length
        else if(i >= a.length)
            return -1;
        //a is start with b and a's length is long than b's length
        else if(i >= b.length)
            return 1;

        //number vs number
        //consider number string as positive integer
        //a1 < a12   ,    a1b < a12
        if('0' <= a[i] && a[i] <= '9' && '0' <= b[i] && b[i] <= '9'){
            let result = 0;
            while(true){
                //string end
                if(i == a.length && i == b.length)
                    return result;
                //a's digit is less than b's digit
                else if(i >= a.length)
                    return -1;
                //b's digit is less than a's digit
                else if(i >= b.length)
                    return 1;
                //number's digit is same and there's left character to compare
                else if((a[i] < '0' || a[i] > '9') && ( b[i] < '0' || b[i] > '9')){
                    //number is same. continue comparing with left str.
                    if(result == 0)
                        break;
                    //result already determined by comparing number.
                    return result;
                }
                //a's digit is less than b's digit
                else if(a[i] < '0' || a[i] > '9')
                    return -1;
                //b's digit is less than a's digit
                else if(b[i] < '0' || b[i] > '9')
                    return 1;
                
                
                //if a,b are same number until now
                if(result == 0){
                    if(a[i] > b[i])
                        result = 1;                    
                    else if(a[i] < b[i])
                        result = -1;
                }

                i++;
            }
        }

        //ascii compare
        if(a[i] > b[i])
            return 1;
        else if(a[i] < b[i])
            return -1;

        i++;
    }
}
function compareFunc_asc_ext(a,b){
    return a.ext < b.ext ? -1 : a.ext == b.ext ? 0 : 1;
}
function compareFunc_asc_filename(a,b){
    result = compareFunc_asc_name(a,b);
    if(result == 0){
        result = compareFunc_asc_ext(a,b);
    }
    return result;
}
function sort(targ,compareFunc){
    
    var contents = contents_div.getElementsByClassName(targ);

    contents = Array.from(contents);
    contents_tuple = contents.map(function(content){
        let tuple = {};
        let fullname = content.getElementsByClassName("content-title")[0].textContent;
        let extidx = fullname.lastIndexOf(".");

        if(extidx == -1){
            tuple.name = fullname;
            tuple.ext = '';
        }
        else{
            tuple.name = fullname.substr(0,extidx);
            tuple.ext = fullname.substr(extidx,fullname.length);
        }
        

        tuple.node = content;
        return tuple;
    });

    contents_tuple.sort(compareFunc).forEach(element => contents_div.appendChild(element.node));
}


var contents_div;
//I heared this event is not supported under IE8
window.addEventListener('DOMContentLoaded',function(event){
    contents_div = document.getElementById('contents');
    sort('folder',compareFunc_asc_filename);
    sort('file',compareFunc_asc_filename);
});