'use strict';
const user = new UserForm();

user.loginFormCallback = data => {
    ApiConnector.login({ login: data.login, password: data.password }, response => {
        (response.success) ? location.reload() : user.setLoginErrorMessage(response.error)
    })
}

user.registerFormCallback = data => {
    ApiConnector.register({ login: data.login, password: data.password }, response => {
        (response.success) ? location.reload() : user.setRegisterErrorMessage(response.error)
    })
}




