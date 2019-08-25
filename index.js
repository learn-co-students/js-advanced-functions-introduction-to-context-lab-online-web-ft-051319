// Your code here

function createEmployeeRecord(card) {
    let employee = {
        firstName: card[0],
        familyName: card[1],
        title: card[2],
        payPerHour: card[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employee;
};

function createEmployees(nestedArrays) {
    return nestedArrays.map(arr => {
        return createEmployeeRecord(arr);
    });
};

function createTimeInEvent(record, dateStamp) {
    let dateString = dateStamp.split(" ")[0];
    let timeString = parseInt(dateStamp.split(" ")[1]);

    let timeObject = {
        type: "TimeIn",
        hour: timeString,
        date: dateString
    };

    record.timeInEvents.push(timeObject);
    return record;
};

function createTimeOutEvent(record, dateStamp) {
    let dateString = dateStamp.split(" ")[0];
    let timeString = parseInt(dateStamp.split(" ")[1]);

    let timeObject = {
        type: "TimeOut",
        hour: timeString,
        date: dateString
    };

    record.timeOutEvents.push(timeObject);
    return record;
};

function hoursWorkedOnDate(record, dateStamp) {
    let searchString = dateStamp.split(" ")[0];
    let timeIn = record.timeInEvents.find(event => event.date === searchString);
    let timeOut = record.timeOutEvents.find(event => event.date === searchString);

    return (timeOut.hour - timeIn.hour) / 100;
};

function wagesEarnedOnDate(record, dateStamp) {
    return record.payPerHour * hoursWorkedOnDate(record, dateStamp);
};

function allWagesFor(record) {
    let dates = record.timeInEvents.map(event => {
        return event.date;
    });

    let wages = dates.reduce(function(total, date) {
        return total + wagesEarnedOnDate(record, date);
    }, 0)

    return wages;
};

function calculatePayroll(records) {
    
    // let payroll = records.reduce(function(total, date) {
    //     return total + wagesEarnedOnDate(record, date);
    // }, 0);

    return records.reduce(function(total, record){
        return total + allWagesFor(record);
    }, 0);

};

function createEmployeeRecords(data) {
    return data.map(card => {
      return createEmployeeRecord(card);
    });
};
  
function findEmployeebyFirstName(records, name) {
    return records.find(record => {
      return record.firstName === name;
    });
};
  