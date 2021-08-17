// from data.js
var tableData = data;

var tableComponent = null;

// YOUR CODE HERE!

function getConvertedDate(curDate) {
    let tempArr = curDate.split("-");

    let res = '';
    let year = '';
    let month = '';
    let date = '';

    if (tempArr.length > 2) {
        year = parseInt(tempArr[0]);
        month = parseInt(tempArr[1]);
        date = parseInt(tempArr[2]);

        res = [month, date, year].join('/')
    }

    return res;
}

function getTableResult(searchText = '', searchDate = '') {

    // disable filter table button until table reloaded.
    document.getElementById('filter-btn').classList.add('disabled');
    // remove current table
    for (let i = tableComponent.rows.length - 1; i > 0; i--) {
        tableComponent.deleteRow(i);
    }

    // filter by text or date, and insert data into table
    for (let index = 0; index < tableData.length; index++) {
        let dataItem = tableData[index];

        if (searchText != '') {
            // filter by search text first
            let durationMinutes = dataItem.durationMinutes + "";
            if (!dataItem.datetime.includes(searchText) && !dataItem.city.includes(searchText) && !dataItem.state.includes(searchText) && !dataItem.country.includes(searchText)
                && !dataItem.shape.includes(searchText) && !dataItem.comments.includes(searchText) && !durationMinutes.includes(searchText)) {

                continue;

            }
        }

        if (searchDate != '') {
            // search date
            let realSearchDate = searchDate;

            if (!dataItem.datetime.includes(realSearchDate)) {
                continue;
            }
        }

        let row = tableComponent.insertRow(tableComponent.rows.length);
        let cellDateTime = row.insertCell(0);
        let cellCity = row.insertCell(1);
        let cellState = row.insertCell(2);
        let cellCountry = row.insertCell(3);
        let cellShape = row.insertCell(4);
        let cellDurationMinutes = row.insertCell(5);
        let cellComments = row.insertCell(6);

        cellDateTime.innerHTML = dataItem.datetime;
        cellCity.innerHTML = dataItem.city;
        cellState.innerHTML = dataItem.state;
        cellCountry.innerHTML = dataItem.country;
        cellShape.innerHTML = dataItem.shape;
        cellDurationMinutes.innerHTML = dataItem.durationMinutes;
        cellComments.innerHTML = dataItem.comments;
    }

    if (tableComponent.rows.length < 2) {
        let row = tableComponent.insertRow(1);
        let cell = row.insertCell(0);
        cell.colSpan = 7;
        cell.style.textAlign = 'center';
        cell.innerHTML = "There is no data!";
    }

    // enable button again
    document.getElementById('filter-btn').classList.remove('disabled');
}


function onSearch() {
    let searchText = document.getElementById('searchText').value;
    let searchDate = document.getElementById('datetime').value;

    getTableResult(searchText, searchDate);
}

function onEnter(event) {
    if (event.keyCode == 13) {
        onSearch();
    }
}

window.onload = function () {
    tableComponent = document.getElementById("ufo-table");

    onSearch();

};


