"use strict";
/*
function txt2arr(t){
    let a=[];
    for(let i of t){
        a.push(i);
    };
    return a;
};
function dBase64(t){
   return decodeURIComponent(escape(window.atob(t)));
};
*/
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// abcdefghijklmnopqrstuvwxyz
// 0123456789

function replaceText(_txt_,arr){
    let a = false;
    let b = false;
    let c = false;
    let lt = false;
    let rt = false;
    try{ a = arr["upper"].length===26;}catch(err){};
    try{ b = arr["lower"].length===26;}catch(err){};
    try{ c = arr["number"].length===10;}catch(err){};
    try{ lt = !!arr["left"];}catch(err){};
    try{ rt = !!arr["right"];}catch(err){};
    
    const isUpperCase = (string) => /^[A-Z]+$/.test(string);
    const isLowerCase = (string) => /^[a-z]+$/.test(string);
    const isNumber_ = (num) => /^[0-9]+$/.test(num);
    function findText(t){
      if(isLowerCase(t)||isUpperCase(t)){
             return 'abcdefghijklmnopqrstuvwxyz'.search(new RegExp(t,'i'));
       } else if(isNumber_(t)){
             return '0123456789'.search(new RegExp(t,'i'));
       };
     };
    
    if(a&&b&&c&&!lt&&!rt){
        return _txt_.replace(/[A-Za-z0-9]/g,(u)=>{
                 if(isUpperCase(u)){
                     return arr["upper"][findText(u)];
                } else if(isLowerCase(u)){
                     return arr["lower"][findText(u)];
                } else if(isNumber_(u)){
                     return arr["number"][findText(u)];
                } else {
                     return u;
                };
             }).replace(/\</g,'&lt;');;
    } else if(a&&b&&!c&&!lt&&!rt){
        return _txt_.replace(/[A-Za-z]/g,(u)=>{
                  if(isUpperCase(u)){
                      return arr["upper"][findText(u)];
                  } else if(isLowerCase(u)){
                      return arr["lower"][findText(u)];
                  } else {
                      return u;
                  };
        }).replace(/\</g,'&lt;');
    } else if(a&&!b&&!c&&!lt&&!rt){
        return _txt_.replace(/[A-Z]/g,(u)=>{
            return arr["upper"][findText(u)];
        }).replace(/\</g,'&lt;');
    } else if(!a&&b&&!c&&!lt&&!rt){
        return _txt_.replace(/[a-z]/g,(u)=>{
            return arr["lower"][findText(u)];
        }).replace(/\</g,'&lt;');
    } else if(!a&&!b&&c&&!lt&&!rt){
        return _txt_.replace(/[0-9]/g,(u)=>{
                return arr["number"][findText(u)];
        }).replace(/\</g,'&lt;');
    } else if(lt&&rt&&!a&&!b&&!c){
        return _txt_.replace(/[A-Za-z0-9]/g,(u)=>{
                  return `${arr["left"]}${u}${arr["right"]}`;
        }).replace(/\</g,'&lt;');
    } else if(lt&&!rt&&!a&&!b&&!c){
        return _txt_.replace(/[A-Za-z0-9]/g,(u)=>{
                  return `${arr["left"]}${u}`;
        }).replace(/\</g,'&lt;');
    } else if(!lt&&rt&&!a&&!b&&!c){
        return _txt_.replace(/[A-Za-z0-9]/g,(u)=>{
                  return `${u}${arr["right"]}`;
        }).replace(/\</g,'&lt;');
    } else {
          return _txt_.replace(/\</g,'&lt;');
    };
};


// const Biswajit = JSON.parse(document.getElementById('jsonData').textContent);
document.getElementById('main_1').innerHTML=(function(m){
      let z = '';
      let i = 0;
      while(i<m.length){
            z = z + '<div class="aa1"><div class="bb1" ><\/div><button>copy<\/button><\/div>';
           i++;
       };
     return z;
}(Biswajit));

document.getElementById('inp_main').addEventListener('keyup',function(e){
       const slf = document.getElementById('inp_main');
       aa1.forEach((a1,indx)=>{
           const a3 = a1.querySelector('div');
           a3.innerHTML=replaceText(slf.value,Biswajit[indx]);
       });
});


async function copy(_elm_){
     let text = (typeof _elm_==='object')?(_elm_.value||_elm_.innerHTML):_elm_;
     let result_ = false;
     try{
        if(_elm_.value||_elm_.innerHTML){
          await navigator.permissions.query({ name : 'clipboard-write'}).then(async function(result){
                if(result.state==='granted'||result.state==='prompt'){
                     await navigator.clipboard.writeText(text).then(()=>{
                           result_ = true;
                      },()=>{
                           result_ = false;
                    });
                };
            });
        };
     }catch(err){
          if(_elm_.value||_elm_.innerHTML){
              try{
                  await _elm_.select();
                  await document.execCommand("copy");
                  result_ = true;
                  if (window.getSelection){
                       window.getSelection().removeAllRanges();
                  } else if (document.selection){
                       document.selection.empty();
                  };
              }catch(err1){
                 
              };
          };
     };
      return Promise.resolve(result_)
};


const aa1 = document.querySelectorAll('.aa1');
aa1.forEach((a1)=>{
    const a2 = a1.querySelector('button');
    const a3 = a1.querySelector('div');
    a2.addEventListener('click',function(){
      //   alert(a3.value||a3.innerHTML);
         copy(a3).then((y)=>{
                if(y){
                    a2.innerHTML='copied';
                    setTimeout(()=>{
                        a2.innerHTML='copy';
                    },1500);
                } else {
                    alert('faild to copy!!');
                };
         });
    });
});

