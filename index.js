let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: row[],
        timeOutEvents: row[]
    }
}

let createEmployees = function(employee){
    return employee.map(function(data){
        return createEmployeeRecord(data)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, workDate){
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === workDate
    })
    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === workDate
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, workDate){
    let wage = hoursWorkedOnDate(employee, workDate) * employee.payPerHour
}

let allWagesFor = function(employee){
    let datesWorked = employee.timeInEvents.map(function(e){
        return e.date
    })
    let totalWages = datesWorked.reduce(function(memo, e){
        return memo + wagesEarnedOnDate(employee, e)
    }, 0)
    return totalWages
}

let createEmployeeRecords = function(src) {
    return src.map(function(row){
      return createEmployeeRecord(row)
    })
  }
  
  let findEmployeebyFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

  let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}