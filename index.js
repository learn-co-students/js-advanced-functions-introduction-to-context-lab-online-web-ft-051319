// Your code here
function createEmployeeRecord(employee){
    let newEmployee = {};
    newEmployee["firstName"] = employee[0];
    newEmployee["familyName"] = employee[1];
    newEmployee["title"] = employee[2];
    newEmployee["payPerHour"] = employee[3];
    newEmployee["timeInEvents"] = [];
    newEmployee["timeOutEvents"] = [];
    return newEmployee
}

function createEmployees(employeesArray){
    return employeesArray.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateStamp){
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0],
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, specificDate){
    let inEventDate = employee.timeInEvents.find(function(e) {
        return e.date === specificDate
    })
    let outEventDate = employee.timeOutEvents.find(function(e){
        return e.date === specificDate
    })
    return (outEventDate.hour - inEventDate.hour) / 100

}

function wagesEarnedOnDate(employee, specificDate){
    let paidHours = hoursWorkedOnDate(employee, specificDate);
    let wages = parseInt(employee.payPerHour * paidHours)
    return wages
}

function allWagesFor(employee){
    let allDates = employee.timeInEvents.map(e => {
        return e.date
    })
    let wagesEarned = allDates.reduce(function(total, date){
        return total += wagesEarnedOnDate(employee, date)
    }, 0)
    return wagesEarned
}

function createEmployeeRecords(arrayOfEmployees){
    return arrayOfEmployees.map(createEmployeeRecord)
}

function calculatePayroll(employeesArray){
    return employeesArray.reduce(function(total, date) {
        return total + allWagesFor(date)
}, 0) 
}


function findEmployeebyFirstName(employeesArray, firstName){
    return employeesArray.find(function(employee) {
        return employee.firstName === firstName
    })

}