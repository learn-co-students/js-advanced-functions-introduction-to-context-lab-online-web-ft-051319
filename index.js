// Your code here
function createEmployeeRecord(array){
  let ans = {}
  ans.firstName = array[0]
  ans.familyName = array[1]
  ans.title = array[2]
  ans.payPerHour = array[3]
  ans.timeInEvents=[]
  ans.timeOutEvents=[]
  return ans
}

function createEmployees(arrays){
  return arrays.map(function(array){
    return createEmployeeRecord(array)
  })
}

function createTimeInEvent(record,date){
  let timeRecord = {}
  timeRecord.type = "TimeIn"
  timeRecord.date = date.split(' ')[0]
  timeRecord.hour = Number(date.split(' ')[1])
  record.timeInEvents.push(timeRecord)
  return record
}

function createTimeOutEvent(record,date){
  let timeRecord = {}
  timeRecord.type = "TimeOut"
  timeRecord.date = date.split(' ')[0]
  timeRecord.hour = Number(date.split(' ')[1])
  record.timeOutEvents.push(timeRecord)
  return record
}

function hoursWorkedOnDate(record,date){
  let timeOut=record.timeOutEvents.find(function(e){
    return e.date === date
  })
  let timeIn=record.timeInEvents.find(function(e){
    return e.date === date
  })
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record,date){
  return hoursWorkedOnDate(record,date)*record.payPerHour
}

function allWagesFor(record){
  let dates=record.timeInEvents.map(function(e){
    return e.date
  })
  let wages = dates.map(function(e){
    return wagesEarnedOnDate(record,e)
  })
  return wages.reduce((total,element)=>total+element)
}

function calculatePayroll(recordsArray){
  let wages = recordsArray.map(record=>allWagesFor(record))
  return wages.reduce((total,element)=>total+element)
}

function createEmployeeRecords(arrays){
  return arrays.map(employee => createEmployeeRecord(employee))
}

function findEmployeebyFirstName(array,firstName){
  return array.find(record => record.firstName === firstName)
}
