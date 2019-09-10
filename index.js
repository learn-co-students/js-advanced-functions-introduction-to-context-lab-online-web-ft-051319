// Your code here
const createEmployeeRecord = function (inputArray) {
  let employeeRecord = {
    firstName: inputArray[0],
    familyName: inputArray[1],
    title: inputArray[2],
    payPerHour: inputArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord

}

const createEmployees = function (rowArray) {
  let returnArray=rowArray.map(function(row) { return createEmployeeRecord(row)})
  return returnArray
  }

const createTimeInEvent= function(employeeRecord, datestr) {
  var date = datestr.split(' ')[0]


  let timeElement = {
    type:"TimeIn"
  }
  timeElement.date = date
  timeElement.hour = parseInt(datestr.split(' ')[1]);
  employeeRecord.timeInEvents.push(timeElement)

  return employeeRecord
}

const createTimeOutEvent= function(employeeRecord, datestr) {
  var date = datestr.split(' ')[0]


  let timeElement = {
    type:"TimeOut"
  }
  timeElement.date = date
  timeElement.hour = parseInt(datestr.split(' ')[1]);
  employeeRecord.timeOutEvents.push(timeElement)

  return employeeRecord
}

const hoursWorkedOnDate  = function (empRecord,dateWorked) {
  var timeIn=empRecord.timeInEvents.find(function(e) {
    return e.date === dateWorked
  })
  var timeOut=empRecord.timeOutEvents.find(function(e) {
    return e.date === dateWorked
  })
  return (timeOut.hour-timeIn.hour)/100;
}

const wagesEarnedOnDate = function(empRecord, dateWorked ) {
  return empRecord.payPerHour*hoursWorkedOnDate (empRecord,dateWorked)
}

const allWagesFor = function (empRecord) {
   let workDays=empRecord.timeInEvents.map(e=>e.date)
   // let workWages = workDays.map(date => wagesEarnedOnDate(emprecord, date))
   // let sum = workWages.reduce((accumulator, currentValue) => accumulator + currentValue)
   return (workDays.map(date => wagesEarnedOnDate(empRecord, date))).reduce((a,b) => a+b)
}

const calculatePayroll = function (employees) {
  let emplsum = employees.map(employee => allWagesFor(employee)).reduce((a,b) => a+b)
  return emplsum
}

const createEmployeeRecords = function (dataEmployees) {
  let returnEmployees = dataEmployees.map(row => createEmployeeRecord(row))
  return returnEmployees;
}

const findEmployeebyFirstName = function (emps, firstName) {
  return emps.find(emp => emp.firstName === firstName)
}
