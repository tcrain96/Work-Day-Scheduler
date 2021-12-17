//Global Variables
var tasks = [];
var totalRows = 9;

//Every time the page loads/refreshes, create rows and fill if there is any saved data
OnLoad();
//loads data
function OnLoad(){

    createRows(totalRows);
    tasks = JSON.parse(localStorage.getItem("tasks")); // Get old save

    //if no save, break out of load
    if(!tasks){
        return;
    }

    //otherwise, fill rows with saved data
    else{
        for (var i = 0; i < totalRows; i++){
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
    
    //create each row and col, and append them to the page
    for(var i = 0; i < numberOfRows; i++)
    {
        var row = $("<div>").addClass("row").attr("id","row-" + (i));
        
        //calculate the time for each time col
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

//Every 5 seconds, check on the time and change color based on time
setInterval(checkTaskState(),5000);
function checkTaskState(){
    for(var i = 0; i < totalRows; i++){
        if(moment($("#time-" + i).text(),"ha").isBefore()) // if the task is before the current time, set it's color to blue
        {
            $("#task-" + i).css("background-color","var(--past-color)");
        }
        if(moment($("#time-" + i).text(),"ha").isAfter()) // if the task is after the current time, set it's color to red
        {
            $("#task-" + i).css("background-color","var(--present-color)");
        }
        if(moment($("#time-" + i).text(),"ha").isAfter(moment().add(1,"hours")))// if the task is more then 1 hour after the current time, set it to green
        {
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

//process clicking outside of a task being focused
$("#task-container").on("blur",".taskCol",function(){
    
    var text = $(this).val().trim();
    var id = $(this).attr("id");

    var pEl = $("<p>").addClass("col-8").addClass("taskCol").attr("id",id);

    pEl.text(text);

    $(this).replaceWith(pEl);

    checkTaskState();
});

//process click within each save column
$("#task-container").on("click",".saveCol",function(){
    
    var saveID = $(this).attr("id").replace("save-","");
    var currentTask = $("#task-" + saveID);

    //create a task object based on the current task in the same row as the save
    var taskObj = {
        taskID:"task-" + saveID,
        taskText:currentTask.text() 
    }
    
    //if the array of tasks is empty, just push the task in
    if(tasks.length === 0 || tasks.length === null || tasks.length === undefined){
        tasks.push(taskObj);
    }

    //if the task is found anywhere in the array, replace that task instead of pushing in a new one
    var isInList = false;
    for(var i = 0; i < tasks.length; i++){
        if(taskObj.taskID === tasks[i].taskID){
            tasks[i].taskText = taskObj.taskText;
            isInList = true;
        }
    }
    
    //if it isn't in the list, and the list isn't empty, then push it in
    if(isInList === false){
        tasks.push(taskObj);
    }

    //Save the tasks array
    saveTaskObj();
});

//save tasks to local storage
function saveTaskObj(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
};

//Set-up date
$("#currentDay").text(moment().format("MMMM D, YYYY"));








