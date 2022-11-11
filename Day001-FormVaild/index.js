var form = document.querySelector('.form'), username = document.getElementById('username'), email = document.getElementById('email'), password1 = document.getElementById('password'), password2 = document.getElementById('password2'), register_success = document.querySelector('.register_success');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, email, password1, password2]);
    checkLength(username, 3, 15);
    checkLength(email, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password1, password2);
    isSuccess();
});
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() == '') {
            showError(input, "".concat(getFieldName(input), " is required"));
        }
        else {
            showSuccess(input);
        }
    });
}
function checkLength(input, min, max) {
    var len = input.value.length;
    if (len < min) {
        showError(input, "".concat(getFieldName(input), " must be at least ").concat(min, " characters"));
    }
    else if (len > max) {
        showError(input, "".concat(getFieldName(input), " must be at most ").concat(max, " characters"));
    }
    else {
        showSuccess(input);
    }
}
function checkEmail(input) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'email is not valid');
    }
}
function checkPasswordMatch(p1, p2) {
    if (p1.value.trim() !== p2.value.trim()) {
        showError(p2, 'password mismatch');
    }
}
function showError(input, message) {
    var row = input.parentElement;
    var smallEl = input.nextElementSibling;
    row.classList.add('error');
    smallEl.innerText = message;
}
function showSuccess(input) {
    var row = input.parentElement;
    row.classList.remove('error');
    row.classList.add('success');
}
function isSuccess() {
    var divs = document.querySelectorAll('.row');
    var count = 0;
    divs.forEach(function (div) {
        if (div.classList.contains('success')) {
            count++;
        }
    });
    if (count === divs.length) {
        // console.log('register success');
        // register_success.style.display = 'block';
        // console.log(`username: ${username.value}`);
        // console.log(`email: ${email.value}`);
        // console.log(`password: ${password1.value}`);
        register_success.style.visibility = 'visible';
        setTimeout(function () {
            register_success.style.visibility = 'hidden';
            resetForm();
        }, 2000);
    }
}
function resetForm() {
    username.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';
}
function getFieldName(input) {
    return input.previousElementSibling.innerText;
}
