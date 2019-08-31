function createEmployeeRecord(array){
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee; 
}

function createEmployees(array){
    return array.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(record, timeString){
    let date = timeString.split(" ")[0];
    let hour = parseInt(timeString.split(" ")[1], 10);
    record.timeInEvents.push({ "date": date, "hour": hour, "type": "TimeIn"})
    return record;
}

function createTimeOutEvent(record, timeString){
    let date = timeString.split(" ")[0];
    let hour = parseInt(timeString.split(" ")[1], 10);
    record.timeOutEvents.push({"date": date, "hour": hour, "type": "TimeOut"})
    return record;
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(timeEvent =>{
        return timeEvent.date === date
    });
    let timeOut = employee.timeOutEvents.find(timeEvent =>{
        return timeEvent.date === date
    });

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date)*employee.payPerHour
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(event => {
        return event.date
    })

    let wages = dates.map(date => {
        return wagesEarnedOnDate(employee, date)
    })

    return wages.reduce((sum, currentValue) => sum + currentValue)    
}

function calculatePayroll(dates){
    let wages = dates.map(date => allWagesFor(date))
    return wages.reduce((sum, currentValue) => sum + currentValue)
}

function createEmployeeRecords(data){
    return data.map(employee => createEmployeeRecord(employee))
}

function findEmployeebyFirstName(data, firstName){
    return data.find(employee => employee.firstName === firstName)
}