
//Set-up date
$("#currentDay").text(moment().format("MMMM DD,YYYY"));

//Set-up Time Row
var timeRowArray =[];
for(var i = 0; i < 9; i++)
{
    //calculate the current time based off array length
    var currentTime;
    if((i + 9) < 12){
        currentTime = (i + 9) + "AM";
    }
    else if((i + 9) - 12 === 0)
    {
        currentTime = 12 + "PM";
    }
    else{
        currentTime = (i + 9 - 12) + "PM";
    }
    
    //create the row object
    var timeRow = {
        time:currentTime,
        task:"This is a task",
    };

    //store the row object in an array
    timeRowArray.push(timeRow);
}

for(var i = 0; i < 9; i++){
    
    //create elements
    var row = $("<div>").addClass("row");
    var timeCol = $("<div>").addClass("col").append($("<p>").addClass("timeCol").text(timeRowArray[i].time));
    var taskCol = $("<div>").addClass("col-10").append($("<p>").addClass("taskCol").text(timeRowArray[i].task));
    var saveCol = $("<div>").addClass("col").append($("<p>").addClass("saveCol").text("save"));

    //append elements
    $("#time-row-container").append(row);
    row.append(timeCol);
    row.append(taskCol);
    row.append(saveCol);
}
