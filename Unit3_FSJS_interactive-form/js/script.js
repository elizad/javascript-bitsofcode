var counter = 0;
//function that shows additional text field if the user selects Other Job Role.
function jobRole(){
  $("#other-title").hide();
  $("#title").change(function(){
    if($(this).val() == "other"){
      $("#other-title").show();
    }else{
      $("#other-title").hide();
    }
  });
};

//function that hides the colors that aren't available for the specific theme.
function tShirt(){
  $("#colors-js-puns").hide();
  $("#design").change(function(){
    //check which theme is selected and hide the colors that aren't available in that theme.
    if($(this).val() == "js puns"){
      $("#color [value=tomato]").attr("selected", false);
      $("#color [value=cornflowerblue]").attr("selected", true);
      $("#colors-js-puns").show();
      $("#color").children().show();
      $("#color").children(":contains('JS shirt')").hide();
    }else if($(this).val() == "heart js"){
      $("#color [value=cornflowerblue]").attr("selected", false);
      $("#color [value=tomato]").attr("selected", true);
      $("#colors-js-puns").show();
      $("#color").children().show();
      $("#color").children(":contains('Puns')").hide();
    }else{
      $("#colors-js-puns").hide();
    }
  });
};

//function that disables the matching course that starts at the same time as the
//course that is passed in as a parameter.
function collisionCheck(course){
  if(course == "js-frameworks"){
    if($(".activities [name = express]").attr("disabled")){
      $(".activities [name = express]").attr("disabled", false);
    }else{
      $(".activities [name = express]").attr("disabled", true);
    }
  }if(course == "express"){
    if($(".activities [name = js-frameworks]").attr("disabled")){
      $(".activities [name = js-frameworks]").attr("disabled", false);
    }else{
      $(".activities [name = js-frameworks]").attr("disabled", true);
    }
  }if(course == "node"){
    if($(".activities [name = js-libs]").attr("disabled")){
      $(".activities [name = js-libs]").attr("disabled", false);
    }else{
      $(".activities [name = js-libs]").attr("disabled", true);
    }
  }if(course == "js-libs"){
    if($(".activities [name = node]").attr("disabled")){
      $(".activities [name = node]").attr("disabled", false);
    }else{
      $(".activities [name = node]").attr("disabled", true);
    }
  }
};

var price = 0;

//function that prevents the selection of activities that are happening simoultanesly.
function activities(){
  $(":checkbox").change(function(){
    $(this).parent().toggleClass("selectedActivity");
      collisionCheck($(this).attr("name"));
      if($(this).attr("name") == "all"){
        if($(".activities [name = all]").prop("checked")){
          price+=200;
        }else{
          price-=200;
        }
      }else {
        if($(this).prop("checked")){
          price += 100;
        }else{
          price -= 100;
        }
      }
    $(".activities p").remove();
    $(".activities").append("<p>Your total price is equal to: " + price +"$.</p>");
    //console.log(price);
  });
};

//function that handles the payment part of the form
function payment(){
  $("#payment :contains('Credit')").attr("selected", true);
  $("#payment").nextAll().hide();
  $("#credit-card").show();
  $("#payment").change(function(){
    if($(this).val() == "select_method"){
      $("#payment").nextAll().hide();
    }else if($(this).val() == "credit card") {
      $("#payment").nextAll().hide();
      $("#credit-card").show();
    }else if($(this).val() == "paypal") {
      $("#payment").nextAll().hide();
      $("#credit-card").next().show();
    }else if($(this).val() == "bitcoin") {
      $("#payment").nextAll().hide();
      $("#credit-card").siblings(":last").show();
    }
  });
};

//functions that validate the name field
function checkName(){
  if($("#name").val().length < 1){
    $("#name").addClass("warning");
  }else{
    $("#name").removeClass("warning");
  }
}

$("#name").focus(function(){
  $("#name").removeClass("noFirstInput");
  checkName();
});
$("#name").change(function(){
  checkName();
});

//functions that validate the email field using a regEx found on internet.
function checkMail(){
  var string = $("#mail").val();
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  //console.log(pattern.test(string));
  if(pattern.test(string)){
    //console.log(pattern.test(string));
    $("#mail").removeClass("noFirstInput");
    $("#mail").removeClass("warning");
  }else{
    $("#mail").addClass("warning");
  }
};

$("#mail").change(function(){
  checkMail();
});
$("#mail").focus(function(){
  $("#mail").addClass("warning");
  checkMail();
});

//functions that validate the checkboxes
function checkCheckbox(){
  if($(".activities input:checked").length > 0){
    $(".activities").removeClass("noFirstInput");
    $(".activities legend").removeClass("warning");
    $(".activities legend").css("color", "#184f68");
  }else{
    $(".activities legend").css("color", "red");
    $(".activities legend").addClass("noFirstInput");
  }
};

$(".activities").change(function(){
  checkCheckbox();
});

//functions that validate the credit card part of the form
function checkCC(){
  if($("#cc-num").val().length < 13 || $("#cc-num").val().length > 16){
    $("#cc-num").addClass("warning");
  }else{
    $("#cc-num").removeClass("warning");
  }
};
$("#cc-num").change(function(){
  checkCC();
});
$("#cc-num").focus(function(){
  checkCC();
});

//functions that validate the credit zip code of the form
function checkZip(){
  if($("#zip").val().length === 5){
    $("#zip").removeClass("warning");
  }else{
    $("#zip").addClass("warning");
  }
};
$("#zip").change(function(){
  checkZip();
});
$("#zip").focus(function(){
  checkZip();
});
//functions that validate the cvv part of the form
function checkCVV(){
  if($("#cvv").val().length === 3){
    $("#cvv").removeClass("warning");
  }else{
    $("#cvv").addClass("warning");
  }
};
$("#cvv").change(function(){
  checkCVV();
});
$("#cvv").focus(function(){
  checkCVV();
});

//function that changes the focus after the last input fiel is filled out
$("#cvv").keyup(function(){
  if($("#cvv").val().length === 3){
    $("#cvv").blur();
  }
});

function firstInput(){
  $("#name").addClass("noFirstInput");
  $("#mail").addClass("noFirstInput");
  $(".activities").addClass("noFirstInput");
};

//check if the other job title option is selected and correctly filled out.
function checkJob(){
  if($("#title").val() == "other" && $("#other-title").val().length === 0){
    $("#other-title").addClass("warning");
  }
  else {
    $("#other-title").removeClass("warning");
  }
};

$("#other-title").keyup(function(){
  $("#other-title").removeClass("warning");
});

//function that validates the entire form when the user
//clicks the submit button. if the form isn't
//complete he can't submit.
$("button").click(function(event){
  checkName();
  checkMail();
  checkCheckbox();
  checkJob();
  if($("#payment").val() == "credit card"){
    checkZip();
    checkCC();
    checkCVV();
  }
  if($("#name").hasClass("warning") || $("#mail").hasClass("warning") ||
  $("#other-title").hasClass("warning") ||
  $("#mail").hasClass("noFirstInput") ||
  $(".activities legend").hasClass("warning") ||
  $(".activities").hasClass("noFirstInput") ||
  $("#cc-num").hasClass("warning") || $("#zip").hasClass("warning") ||
  $("#cvv").hasClass("warning")){
    //counter that prevents the removal of the payment info part of the form.
    if (counter > 0){
      $("button").prev().remove();
    }
    counter++;
    event.preventDefault();
    $("button").before("<p>Please check your form input. The missing / wrong fields will be marked with red.</p>");
  }/*else{
    //console.log("11");
    $("button").attr("type", "submit");
  }*/
});


firstInput();
payment();
jobRole();
tShirt();
activities();
