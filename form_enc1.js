//--------------------------------------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
// formsubmit.co
//--------------------------------------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
var namespace='_TB_3448411670_8892005586'; if(!window[namespace]){ window[namespace]={}; } TB=that=window[namespace];
//--------------------------------------------------------------------------------
//################################################################################
//--------------------------------------------------
var tbc=new TB.CryptoRSA_103({"default_key_size":1024});
//--------------------------------------------------
tbc.set_public_key('q[qMqQYoUo~)IeRK[+SNE0q1q+\n0Ug8<]-WfKXWjU[kfM(\\IM4]=j-P9Z<\\OM8\\4M&%;U:\\)O\u0027-(76FU/f9H$-I\n\\4TER%LE\\DQK)HfT+MNZ8M7\\(qZq(q&Pj~(IWRD[fS<EgqEqiq0\\8WUPMNk\\VUQ~:YUq\nq.qiQ3WEQjn*[Q-MK0<RZ4Yo]5I3]SWo]i[G5NS<7/[JIQ+4lU6LoQ:OR(WU8F.U\u0027\\;:\nE2YOUn\\4+mW-W\u0027U5]X]*\nsq+q2YQZFNm\\sU7~<YEq-qqq',true);
//--------------------------------------------------
var encoded_url='6g*g+hoi8m,g+:<e5mpg/j=8==oih*9.edgo:/h1j)l1m*h;no84e&lg8fk';
//--------------------------------------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
function submitForm(form)
{
    //--------------------------------------------------
    // sanitize form data
    var formData=Object.fromEntries(new FormData(form).entries());
    delete formData['_captcha'];
    delete formData['_formsubmit_id'];
    delete formData['_subject'];
    delete formData['data'];
    //--------------------------------------------------
    // trim values & reset input cell borders
    for(var key in formData){ if(formData.hasOwnProperty(key))
    {
        formData[key]=formData[key].replace(/^\s+/,'').replace(/\s+$/,'');
        form[key].value=form[key].value.replace(/^\s+/,'').replace(/\s+$/,'');
        form[key].style.removeProperty('border');
    }}
    formData.email=formData.email.replace(/\s+/g,''); form.email.value=form.email.value.replace(/\s+/g,'');
	//--------------------------------------------------
    if(form._formsubmit_id.value!==''){ return false; }
    //--------------------------------------------------
    // check name & email & message
    if(form.name.value===''){ form.name.style.borderColor='#E84A42'; form.name.focus(); return false; }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w+$/.test(form.email.value)){ form.email.style.borderColor='#E84A42'; form.email.focus(); return false; }
    if(form.message.value===''){ form.message.style.borderColor='#E84A42'; form.message.focus(); return false; }
	//--------------------------------------------------
    var formDataStr=JSON.stringify(formData);
    //--------------------------------------------------
    var d1=new Date();
    var cymd=d1.getFullYear()*10000+(d1.getMonth()+1)*100+d1.getDate();
    var hhmm=d1.getHours()*100+d1.getMinutes();
    formData._subject='test.timbrockley.co.uk ('+cymd+'_'+hhmm+')';
    //--------------------------------------------------
    //var encrypted=formDataStr;
    var encrypted=tbc.encode(formDataStr);
	// var encrypted=tbc.encrypt(formDataStr);
	//--------------------------------------------------
    delete formData['name'];
    delete formData['email'];
    delete formData['message'];
    //--------------------------------------------------
    form.data.value=encrypted;
    formData.data=encrypted;
	//--------------------------------------------------
    sendAjax(formData);
	//--------------------------------------------------
    return false;
	//--------------------------------------------------
}
//--------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
function sendAjax(formData)
{
    //--------------------------------------------------------------------------------
    if(typeof formData!=='object'){ return null; }
    //--------------------------------------------------------------------------------
    var formDataStr=JSON.stringify(formData);
    //--------------------------------------------------------------------------------
    document.getElementById('form_status').textContent='';
    //--------------------------------------------------------------------------------
    fetch(tbc.decode(encoded_url),
    {
        "method": "POST",
        "headers": { "Content-Type": "application/json", "Accept": "application/json" },
        "body": formDataStr
    })
    .then(response => response.json())
    .then(data => { console.log(data); document.getElementById('form_status').textContent='Thanks for your submission!'; })
    .catch(error => { console.log(error); document.getElementById('form_status').textContent='Oops! There was a problem submitting your form'});
    //--------------------------------------------------------------------------------
}
//--------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
window.onload=function(){ document.getElementById('name').focus(); };
//--------------------------------------------------
//################################################################################
//--------------------------------------------------------------------------------
