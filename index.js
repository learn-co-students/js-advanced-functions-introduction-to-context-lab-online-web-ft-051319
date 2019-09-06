function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployees(nestedArray) {
    return nestedArray.map(arr => createEmployeeRecord(arr));
}

function createTimeInEvent(empObj, dateStamp) {
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1], 10),
        date: dateStamp.split(' ')[0]
    })
    return empObj;
}

function createTimeOutEvent(empObj, dateStamp) {
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1], 10),
        date: dateStamp.split(' ')[0]
    })
    return empObj;
}

function hoursWorkedOnDate(empObj, dateStamp) {
    let dateTimeIn = empObj.timeInEvents.filter(event => event.date === dateStamp.split(' ')[0]);
    let dateTimeOut = empObj.timeOutEvents.filter(event => event.date === dateStamp.split(' ')[0]);
    let hours = dateTimeOut[0].hour - dateTimeIn[0].hour;
    return hours/100;
}

function wagesEarnedOnDate(empObj, dateStamp) {
    return (empObj.payPerHour) * (hoursWorkedOnDate(empObj, dateStamp))
}

function allWagesFor(empObj) {
    let dates = empObj.timeOutEvents.map(event => event.date)
    let allWages = dates.reduce( function(total, date) {
        return total + wagesEarnedOnDate(empObj, date)
    }, 0)
    return allWages;
}

function createEmployeeRecords(nestedArray) {
    return nestedArray.map(array => createEmployeeRecord(array));
}

function findEmployeebyFirstName(array, firstName) {
    return array.find(obj => obj.firstName === firstName);
    // using .find() bc want return value to be the matching record or undefined. filter() will return an empty array if no matching record found.
}

function calculatePayroll(array) {
    return array.reduce( (total, empObj) => {
        return total + allWagesFor(empObj);
    }, 0)
}