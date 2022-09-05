//Выход из личного кабинета
const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout((success) => {
        if (success.success) {
            location.reload();
        }
    })
};

//Получение информации о пользователе
ApiConnector.current((profile) => {
    if (profile.success) {
        ProfileWidget.showProfile(profile.data);
    }
});

//Получение текущих курсов валюты
const boardRates = new RatesBoard();
let getRates = setTimeout(function updateTable() {
    ApiConnector.getStocks((data) => {
        boardRates.clearTable();
        boardRates.fillTable(data.data);
        getRates = setTimeout(updateTable, 60000);
    })
}, 0);

//Операции с деньгами
const managerMoney = new MoneyManager();

const successMoneyTransactions = (success, data, error) => {
    if (success) {
        managerMoney.setMessage(success, 'Операция проведена успешно!');
        ProfileWidget.showProfile(data);
    } else {
        managerMoney.setMessage(success, error)
    }
}

//пополнение баланса
managerMoney.addMoneyCallback = (data) => {
    ApiConnector.addMoney({ currency: data.currency, amount: data.amount }, (response) => {
        successMoneyTransactions(response.success, response.data, response.error);
    })
}

//конвертирование валюты
managerMoney.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney({ fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount }, (response) => {
        successMoneyTransactions(response.success, response.data, response.error);
    })
}

//перевод валюты
managerMoney.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney({ to: data.to, currency: data.currency, amount: data.amount }, (response) => {
        successMoneyTransactions(response.success, response.data, response.error);
    })
}

//Работа с избранным
const widgetFavorites = new FavoritesWidget();

const updateFavoritesList = (data) => {
    widgetFavorites.clearTable();
    widgetFavorites.fillTable(data);
    managerMoney.updateUsersList(data);
}

//начальный список избранного
ApiConnector.getFavorites((data) => {
    updateFavoritesList(data.data);
})

//добавление пользователя в список избранных
widgetFavorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites({ id: data.id, name: data.name }, (response) => {
        if (response.success) {
            updateFavoritesList(response.data);
            widgetFavorites.setMessage(response.success, 'Пользователь добавлен успешно');
        } else {
            widgetFavorites.setMessage(response.success, response.error);
        }
    })
}

//удаление пользователя из избранного
widgetFavorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            updateFavoritesList(response.data);
            widgetFavorites.setMessage(response.success, 'Пользователь удален успешно');
        } else {
            widgetFavorites.setMessage(response.success, response.error);
        }
    })
}