//Set-up date
$("#currentDay").text(moment().format("MMMM D, YYYY"));

//Set-up Time Row
var timeRowArray =[];
for(var i = 0; i < 9; i++)
{
    //calculate the current time based off array length
    var currentTime;
    if((i + 9) < 12){
        currentTime = (i + 9) + "am";
    }
    else if((i + 9) - 12 === 0)
    {
        currentTime = 12 + "pm";
    }
    else{
        currentTime = (i + 9 - 12) + "pm";
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
    var timeCol = $("<div>").addClass("col").append($("<p>").addClass("timeCol text-center").text(timeRowArray[i].time));
    var taskCol = $("<div>").addClass("col-10").append($("<p>").addClass("taskCol i").text(timeRowArray[i].task));
    var saveCol = $("<div>").addClass("col").append($("<p>").addClass("saveCol text-center").text("save"));

    //append elements
    $("#task-container").append(row);
    row.append(timeCol);
    row.append(taskCol);
    row.append(saveCol);
}

//process click within each task column
$("#task-container").on("click",".taskCol",function(){
    // get current text of p element
    var text = $(this).text().trim();
    
    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("taskCol").val(text);
    $(this).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
});

//process click within each task column
$("#task-container").on("blur","textarea",function(){
    
    // get current text of textarea element
    var text = $(this).val();

});







