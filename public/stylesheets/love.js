var jsonUrlGirl = "https://randomuser.me/api/?gender=female"
var jsonUrlBoy = "https://randomuser.me/api/?gender=male"

var dataType = {
	dataType:"json",
}

$(document).ready(function () {
    $("div#hiddenGirl").hide();
    $("div#hiddenBoy").hide();
   console.log($("div#thediv").hide().attr("id"));
    $("button.showButtonGirl").click(function () {
        $("div#hiddenGirl").show();
        $("div#show").hide();
        console.log('click');
    });
    $("button.showButtonBoy").click(function () {
        $("div#hiddenBoy").show();
        $("div#show").hide();
        console.log('click');
    });
});

function getGirlPhoto(){
	$.getJSON(jsonUrlGirl
		, dataType, imgReplacer)
}

function imgReplacer(json){
	var img = $("#image");
	img.attr("src", json.results[0].picture.large);
}

function getBoyPhoto(){
	$.getJSON(jsonUrlBoy
		, dataType, imgReplacer)
}

function imgReplacer(json){
	var img = $("#image");
	img.attr("src", json.results[0].picture.large);
}

function getName(){
	$.getJSON(jsonUrlGirl, dataType, nameReplacer)
}

function nameReplacer(json){
	var name = $("#name");
	name.html(json.results[0].name.first);
}

function uncheck(){
	$("input").prop("checked", false);
}

function clickTimer(){
	$(document).ready(function () {
    $("#hello").click(function () {
        var count = $(this).data("count") || 0;
        if(count == 10){
            alert("Wow! seems like you really tried hard to find some one! You should start more seriously rather than playing web games!");
            window.location.href = "https://www.mysinglefriend.com/s/";
        }
        $(this).data("count", ++count);
        console.log(count);
    });
});
}




function changeforgirl(){
	if(jQuery('#form input[type=radio]:checked').length) {
	    clickTimer();
		getBoyPhoto();
	    getName();
	    uncheck();
	} else{
		alert("we need to know your feeling about this picture!")
	}
	
}

function changeforboy(){
	if(jQuery('#form input[type=radio]:checked').length) {
	    clickTimer();
		getGirlPhoto();
	    getName();
	    uncheck();
	} else{
		alert("we need to know your feeling about this picture!")
	}
	
}
