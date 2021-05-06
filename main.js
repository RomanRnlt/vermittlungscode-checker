function getInt() {
    return Math.floor(Math.random() * 10000 ) + 1000;
}
  
function entry_point(){
    if (!document.body.contains(document.querySelector('input[name="vaccination-approval-checked"][value="0"]'))) {
        //console.log('joined waitingroom');
        var check_waitingroom = setInterval(function() {
            if (document.body.contains(document.querySelector('input[name="vaccination-approval-checked"][value="0"]'))) {
                clearInterval(check_waitingroom);
                //console.log('exit waitingroom');
                document.querySelector('input[name="vaccination-approval-checked"][value="0"]').click();
                check_claim();
            } else {
                //console.log('watingroom refresh');
            }
        }, 100); 
    } else {
        document.querySelector('input[name="vaccination-approval-checked"][value="0"]').click();
        check_claim();
    }     
}

function check_claim() { 
    var checkExist = setInterval(function() {
        if(document.body.contains(document.querySelector('input[formcontrolname="isValid"][value="1"]'))) {
            //console.log('Berechtigt');
            clearInterval(checkExist);
            document.querySelector('input[formcontrolname="isValid"][value="1"]').click()
            var wait_for_age = setInterval(function(){
                if (document.contains(document.querySelector('input[name="age"][maxlength="3"]'))) {
                    //console.log("age textfield visible");
                    clearInterval(wait_for_age);
                    window.open("https://www.youtube.com/watch?v=ZzLlRzpxin0&t=3s&ab_channel=DanielskleineWelt", '_blank').focus();
                    //age_input();
                } else {
                    //console.log("wait for age refresh");
                }
            }, 100);
            
        } else if (document.body.contains(document.querySelector('div[class="alert alert-danger text-center"]'))) {
            //console.log('No appointment available after claim check button');
            location.reload();    
        }
    }, 100);  
}

function age_input(){
    document.querySelector('input[name="age"][formcontrolname="age"]').setAttribute('value','22');
    document.querySelector('input[name="age"][formcontrolname="age"]').addEventListener('input', updateValue);
    document.querySelector('button[type="submit"][class="btn kv-btn btn-magenta text-uppercase d-inline-block"]').disabled = false; 
    document.querySelector('button[type="submit"][class="btn kv-btn btn-magenta text-uppercase d-inline-block"]').click();
    var final_check = setInterval(function() {
        if (document.body.contains(document.querySelector('div[class="alert alert-danger text-center"]'))) {
            console.log('No appointment available after age check');
            clearInterval(final_check);
            window.open("https://www.apple.com/de/", '_blank').focus();
            location.reload();   
        } else {
            clearInterval(final_check);
            console.log("WE DID IT!")
            window.open("https://www.youtube.com/watch?v=ZzLlRzpxin0&t=3s&ab_channel=DanielskleineWelt", '_blank').focus();
        }
    })
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}
  
function page_reload(){
    wait(getInt());
    //console.log('- - - - - - - - - - - - - - -');
    entry_point();
}

window.onload = page_reload();