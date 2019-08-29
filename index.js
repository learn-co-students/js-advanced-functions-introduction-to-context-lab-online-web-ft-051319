
createEmployeeRecord = (array) => {
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

function createEmployees(array) {
  return array.map(function(employee) {
    return createEmployeeRecord(employee)
  })
}

function createTimeInEvent(employee, dateTime){
    let [date, hour] = dateTime.split(' ') //destructuring?
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createTimeOutEvent(employee, dateTime){
    let [date, hour] = dateTime.split(' ') //destructuring?
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
function wagesEarnedOnDate(employee, dateTime) {
    let wage = hoursWorkedOnDate(employee, dateTime)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

function hoursWorkedOnDate(employee, dateTime){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateTime
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateTime
    })
    return (outEvent.hour - inEvent.hour) / 100
}

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function createEmployeeRecords(src) {
  return src.map(function(row){
    return createEmployeeRecord(row)
  })
}

function findEmployeebyFirstName(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
