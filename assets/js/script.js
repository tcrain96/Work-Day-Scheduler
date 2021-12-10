//Global Variables
var tasks = [];
var totalRows = 9;

OnLoad();
function OnLoad(){
    createRows(totalRows);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if(!tasks){
        return;
    }
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
    
    //create the rows and fill the array with each row
    for(var i = 0; i < numberOfRows; i++)
    {
        var row = $("<div>").addClass("row").addClass("row-" + (i));
        
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

        var timeCol = $("<p>").addClass("col").addClass("timeCol").text(currentTime);
        var taskCol = $("<p>").addClass("col-8").addClass("taskCol").attr("id","task-" + i);
        var saveCol = $("<p>").addClass("col").addClass("saveCol").addClass("far").addClass("fa-save");

        row.append(timeCol);
        row.append(taskCol);
        row.append(saveCol);
        $("#task-container").append(row);
    }

};

//process click within each task column
$("#task-container").on("click",".taskCol",function(){
    
    var text = $(this).text().trim();
    var id = $(this).attr("id");
    console.log(id);
    var inputEl = $("<input>").attr("type","text").addClass("col-8").addClass("taskCol").attr("id", id);
    inputEl.val(text);

    $(this).replaceWith(inputEl);

    inputEl.trigger("focus");
});

$("#task-container").on("blur",".taskCol",function(){
    
    var text = $(this).val().trim();
    var id = $(this).attr("id");
    var pEl = $("<p>").addClass("col-8").addClass("taskCol").attr("id",id);
    pEl.text(text);

    $(this).replaceWith(pEl);
    var taskObj = {
        taskID:id,
        taskText:pEl.text()        
    }
    saveTaskObj(taskObj);
});

//save tasks to local storage
function saveTaskObj(taskObj){
    tasks.push(taskObj);
    localStorage.setItem("tasks",JSON.stringify(tasks));
};

//Set-up date
$("#currentDay").text(moment().format("MMMM D, YYYY"));








