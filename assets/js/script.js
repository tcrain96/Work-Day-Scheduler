//Global Variables
var tasks = [];
var totalRows = 9;

OnLoad();
function OnLoad(){
    createRows(totalRows);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
    if(!tasks){
       
        return;
    }
    else{
        for (var i = 0; i < totalRows; i++){
            console.log("made it");
            for(var v = 0; v < tasks.length; v++){
                
                if(tasks[v].taskID === "task-"+ i){
                    $("#task-"+i).text(tasks[v].taskText);
                }
            }
        }
    }
}

//create the number of rows we want (in this case, 9 rows)
function createRows(numberOfRows){
    
    //create the rows and fill the array with each row
    for(var i = 0; i < numberOfRows; i++)
    {
        var row = $("<div>").addClass("row").attr("id","row-" + (i));
        
        var currentTime;
        if((i + 9) < 12){
            currentTime = (i + 9) + "am";
        }
        else if((i + 9) - 12 === 0){
        currentTime = 12 + "pm";
        }
        else{
        currentTime = (i + 9 - 12) + "pm";
        }

        var timeCol = $("<p>").addClass("col").addClass("timeCol").attr("id","time-" + i).text(currentTime);
        var taskCol = $("<p>").addClass("col-8").addClass("taskCol").attr("id","task-" + i);
        var saveCol = $("<p>").addClass("col").addClass("saveCol").addClass("far").addClass("fa-save").attr("id","save-" + i);

        row.append(timeCol);
        row.append(taskCol);
        row.append(saveCol);
        $("#task-container").append(row);
    }

};

setInterval(checkTaskState(),5000);
function checkTaskState(){
    for(var i = 0; i < totalRows; i++){
        if(moment($("#time-" + i).text(),"ha").isBefore())
        {
            $("#task-" + i).css("background-color","var(--past-color)");
        }
        if(moment($("#time-" + i).text(),"ha").isAfter())
        {
            $("#task-" + i).css("background-color","var(--present-color)");
        }
        if(moment($("#time-" + i).text(),"ha").isAfter(moment().add(1,"hours"))){
            $("#task-" + i).css("background-color","var(--future-color)");
        }
        
    }
}

//process click within each task column
$("#task-container").on("click",".taskCol",function(){
    
    var text = $(this).text().trim();
    var id = $(this).attr("id");
    var inputEl = $("<input>").attr("type","text").addClass("col-8").addClass("taskCol").attr("id", id);
    inputEl.val(text);

    $(this).replaceWith(inputEl);

    inputEl.trigger("focus");
    checkTaskState();
});

$("#task-container").on("blur",".taskCol",function(){
    
    var text = $(this).val().trim();
    var id = $(this).attr("id");

    var pEl = $("<p>").addClass("col-8").addClass("taskCol").attr("id",id);

    pEl.text(text);

    $(this).replaceWith(pEl);

    checkTaskState();
});

$("#task-container").on("click",".saveCol",function(){
    
    var saveID = $(this).attr("id").replace("save-","");
    var currentTask = $("#task-" + saveID);

    var taskObj = {
        taskID:"task-" + saveID,
        taskText:currentTask.text() 
    }
    
    if(tasks.length === 0){
        tasks.push(taskObj);
    }

    var isInList = false;
    for(var i = 0; i < tasks.length; i++){
        if(taskObj.taskID === tasks[i].taskID){
            tasks[i].taskText = taskObj.taskText;
            isInList = true;
        }
    }
    if(isInList === false){
        tasks.push(taskObj);
    }
    saveTaskObj();
});

//save tasks to local storage
function saveTaskObj(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
};

//Set-up date
$("#currentDay").text(moment().format("MMMM D, YYYY"));








