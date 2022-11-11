const form = document.querySelector('.form') as HTMLFormElement,
      username = document.getElementById('username') as HTMLInputElement,
      email = document.getElementById('email') as HTMLInputElement,
      password1 = document.getElementById('password') as HTMLInputElement,
      password2 = document.getElementById('password2') as HTMLInputElement,
      register_success = document.querySelector('.register_success') as HTMLInputElement

form?.addEventListener('submit', e => {
    e.preventDefault();
    checkRequired([username, email, password1, password2]);
    checkLength(username,3,15);
    checkLength(email,6,25);
    checkEmail(email);
    checkPasswordMatch(password1, password2);
    isSuccess();
})

function checkRequired(inputArr:[HTMLInputElement,HTMLInputElement,HTMLInputElement,HTMLInputElement]):void {
    inputArr.forEach( input =>{
        if((input as HTMLInputElement).value.trim() == '') {
            showError(input,`${getFieldName(input)} is required`);
        }else{
            showSuccess(input);
        }
    })
}

function checkLength(input:HTMLInputElement,min:number,max:number):void{
    const len = input.value.length;
    if(len < min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    }else if(len > max){
        showError(input,`${getFieldName(input)} must be at most ${max} characters`);
    }else{
        showSuccess(input);
    }
}

function checkEmail(input):void{
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reg.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input,'email is not valid');
    }
}  

function checkPasswordMatch(p1,p2):void{
    if(p1.value.trim() !== p2.value.trim()){
        showError(p2,'password mismatch');
    }
}


function showError(input:HTMLInputElement,message:string):void{
    const row = input.parentElement  as HTMLElement
    const smallEl = input.nextElementSibling as HTMLElement;
    row.classList.add('error');
    smallEl.innerText = message;
}

function showSuccess(input:HTMLInputElement):void{
    const row:HTMLDivElement = input.parentElement as HTMLDivElement;
    row.classList.remove('error');
    row.classList.add('success');
}

function isSuccess(){
    const divs = document.querySelectorAll('.row');
    let count = 0;
    divs.forEach( div =>{
        if(div.classList.contains('success')){
            count ++;
        }
    })
    if(count === divs.length){
        // console.log('register success');
        // register_success.style.display = 'block';
        // console.log(`username: ${username.value}`);
        // console.log(`email: ${email.value}`);
        // console.log(`password: ${password1.value}`);
        register_success.style.visibility = 'visible'
        setTimeout( () => {
            register_success.style.visibility = 'hidden'
            resetForm();
        }, 2000)
    }
}

function resetForm(){
    username.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';
}

function getFieldName(input):string{
    return input.previousElementSibling.innerText;
}

