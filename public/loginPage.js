'use strict';

const user = new UserForm();

user.loginFormCallback = data => {
    ApiConnector.login({ login: data.login, password: data.password }, response => {
        if (response.success) {
            location.reload();
        } else {
            user.setLoginErrorMessage(response.error)
        }
    })
}

user.registerFormCallback = data => {
    ApiConnector.register({ login: data.login, password: data.password }, response => {
        console.log(response)
        if (response.success) {
            location.reload();
        } else {
            user.setRegisterErrorMessage(response.error)
        }
    })
}




