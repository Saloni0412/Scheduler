// below code wraps up all the code and will only apply when the site is loaded fully
$(document).ready(function() {

    // code to display the current date in the header of the page.
    var currentDay = dayjs().format('dddd, MMMM DD')
    $('#currentDay').text(currentDay)

    // code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. 
    let saved = JSON.parse(window.localStorage.getItem("tasks"))
    $(".description").each(function() {
      var id = $(this).parent().attr("id");
      if (saved && saved.length){
      for (let i = 0; i < saved.length; i++) {
        const element = saved[i];
        if(id == element.key){
          $(this).text(element.value)
        }
      }}
    })
    
    // event listener for click events on the save button. 

      $(".saveBtn").on("click", function() {
        var key = $(this).parent().attr("id");
        var value = $(this).siblings("textarea").val();
    
        console.log($(this).parent().attr("id"))
        console.log($(this).siblings("textarea").val())
    
        let storageItem = JSON.parse(window.localStorage.getItem("tasks")) || [] 
        storageItem.push({key, value})
        
        localStorage.setItem("tasks", JSON.stringify(storageItem));
      });
    
    // code to apply the past, present, or future class to each time block by comparing the id to the current hour. 
      $(".time-block").each(function(){
        let blockId = $(this).attr("id").split("-")[1];
        let currentHour = dayjs().hour();
        if(currentHour > blockId) {
         $(this).addClass("past")
        }
        else if (currentHour == blockId) 
        {
          $(this).addClass("present")
       }
       else {
          $(this).addClass("future")
        }
       })
    })
    