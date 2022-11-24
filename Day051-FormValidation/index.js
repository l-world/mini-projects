const form = document.querySelector('.register_form'),
    username = document.getElementById('username'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    confirmPassword = document.getElementById('confirm_password');

form.addEventListener('submit', e => {
    e.preventDefault();
    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(email, 6, 25);
    checkEmail(email);
    checkPasswordIsMatch(password, confirmPassword);
})

// Show error message and outline
function showError(input, message) {
    const small = input.nextElementSibling;
    input.classList.add('error');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    input.classList.remove('error')
    input.classList.add('success')
}

// get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check required feildes
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

// check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be at most ${max} characters`)
    } else {
        showSuccess(input);
    }
}

//check email vaild
function checkEmail(input) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkPasswordIsMatch(p1,p2){
    if(p1.value !== p2.value){
        showError(p2,'Passwords do not match')
    }
}

function printFields(){
    console.log(`username: ${username.value}`);
    console.log(`email: ${email.value}`);
}



