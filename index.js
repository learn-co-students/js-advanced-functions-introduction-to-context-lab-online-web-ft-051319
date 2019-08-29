function createEmployeeRecord(employeeArr) {
    let record = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record;
}

function createEmployees(arrayCollection) {
    return arrayCollection.map(array => { return createEmployeeRecord(array) })
}

function createTimeInEvent(employeeObj, dateTimeString) {
    let hour = parseInt(dateTimeString.split(" ")[1], 10);
    let date = dateTimeString.split(" ")[0];
    employeeObj.timeInEvents.push({ "date": date, "hour": hour, "type": "TimeIn" })
    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateTimeString) {
    let hour = parseInt(dateTimeString.split(" ")[1], 10);
    let date = dateTimeString.split(" ")[0];
    employeeObj.timeOutEvents.push({ "date": date, "hour": hour, "type": "TimeOut" })
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date) {
    let timeOutObj = employeeObj.timeOutEvents.find(timeRecord => {
        return timeRecord.date === date
    });
    let timeInObj = employeeObj.timeInEvents.find(timeRecord => {
        return timeRecord.date === date
    });

    return (timeOutObj.hour - timeInObj.hour)/100
}

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour
}

function allWagesFor(employeeObj) {
    let dates = employeeObj.timeInEvents.filter(timeInObj => {
        return employeeObj.timeOutEvents.find(timeOutObj => { return timeInObj.date === timeOutObj.date })
    });
    let wagesEarned = dates.reduce(function(total, dateObj) {
        return total += wagesEarnedOnDate(employeeObj, dateObj.date)
    }, 0);
    return wagesEarned;
}

function calculatePayroll(employeesArr) {
    let payroll = employeesArr.reduce(function(total, employeeObj) {
        return total += allWagesFor(employeeObj)
    }, 0);
    return payroll;
}

function createEmployeeRecords(arrayCollection) {
    return createEmployees(arrayCollection);
}

function findEmployeebyFirstName(employeesArr, firstName) {
    return employeesArr.find(employeeObj => { return employeeObj.firstName === firstName })
}