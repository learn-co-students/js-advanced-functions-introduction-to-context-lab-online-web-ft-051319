// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(arr) {
    return arr.map(function(record) {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(obj, dateStamp) {
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return obj
}

function hoursWorkedOnDate(obj, dateStamp) {
    let timeIn = obj.timeInEvents.find(function(e) {
        return e.date === dateStamp
    })
    let timeOut = obj.timeOutEvents.find(function(e) {
        return e.date === dateStamp
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(obj, dateStamp) {
    let hours = hoursWorkedOnDate(obj, dateStamp)
    return hours * obj.payPerHour
}

function allWagesFor(obj) {
    let allDates = obj.timeInEvents.map(function(e) {
        return e.date
    })
    let totalPay = allDates.reduce(function(acc, date) {
        return acc + wagesEarnedOnDate(obj, date)
    }, 0)
    return totalPay
}

function createEmployeeRecords(arr) {
    return arr.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

function findEmployeebyFirstName(arr, firstName) {
    return arr.find(function(e) {
        return e.firstName === firstName
    })
}

function calculatePayroll(arr) {
    return arr.reduce(function(acc, record) {
        return acc + allWagesFor(record)
    }, 0)
}