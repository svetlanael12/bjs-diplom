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
    ProfileWidget.showProfile(profile.data)
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

