// Your code here

function createEmployeeRecord(person) {
    return {
        firstName: person[0],
        familyName: person[1],
        title: person[2],
        payPerHour: person[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(people) {
    return people.map((person) => {
        return createEmployeeRecord(person)
    })
}

function createTimeInEvent(employeeRecord,timeIn) {
    let [date, hour] = timeIn.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),date
    })

    return employeeRecord
}

function createTimeOutEvent(employeeRecord,timeOut) {
    let [date, hour] = timeOut.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), date
    })

    return employeeRecord
}


function hoursWorkedOnDate(employeeRecord,date) {
    let timeInEvent = employeeRecord.timeInEvents.find((event) => {
        return event.date === date
    })

    let timeOutEvent = employeeRecord.timeOutEvents.find((event) => {
        return event.date === date
    })

    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord,date) {
    return hoursWorkedOnDate(employeeRecord,date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    // take all the timeInEvents and "map" them to return an array of just dates
    let dates = employeeRecord.timeInEvents.map(event => event.date)
    // take all the dates and grab the wagesEarned for each date and sum, starting with 0
    return dates.reduce(((sum,date) => sum + wagesEarnedOnDate(employeeRecord,date)),0)
}

function calculatePayroll(employeeRecords) {
    // take all the records and grab the allWagesFor for each record and sum, starting at 0
    return employeeRecords.reduce(((sum,record) => sum + allWagesFor(record)),0)
}

function createEmployeeRecords(people) {
    return people.map(person => createEmployeeRecord(person))
}

function findEmployeebyFirstName(employeeArray, firstName) {
    return employeeArray.find(person => person.firstName === firstName)
}
