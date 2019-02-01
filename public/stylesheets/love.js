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

//get girls photo
function getGirlPhoto(){
	$.getJSON(jsonUrlGirl
		, dataType, imgReplacergirl)
}

function imgReplacergirl(json){
	var img = $("#girlimage");
	img.attr("src", json.results[0].picture.large);
}

//get boys photo
function getBoyPhoto(){
	$.getJSON(jsonUrlBoy
		, dataType, imgReplacerboy)
}

function imgReplacerboy(json){
	var img = $("#boyimage");
	img.attr("src", json.results[0].picture.large);
}

//get girl name
function getGirlName(){
	$.getJSON(jsonUrlGirl, dataType, nameReplacerGirl)
}

function nameReplacerGirl(json){
	var name = $("#girlname");
	name.html(json.results[0].name.first);
}
//get boys name
function getBoyName(){
	$.getJSON(jsonUrlBoy, dataType, nameReplacerBoy)
}
function nameReplacerBoy(json){
	var name = $("#boyname");
	name.html(json.results[0].name.first);
}

function uncheck(){
	$("input").prop("checked", false);
}

function clickTimer(){
	$(document).ready(function () {
    $("#girlsubmit").click(function () {
        var count = $(this).data("count") || 0;
        if(count == 50){
            alert("Wow! seems like you really tried hard to find some one! You should start more seriously rather than playing meaningless web games!");
            window.location.href = "https://www.mysinglefriend.com/s/";
        }
        $(this).data("count", ++count);
        console.log(count);
    });
    $("#boysubmit").click(function () {
        var count = $(this).data("count") || 0;
        if(count == 50){
            alert("Wow! seems like you really tried hard to find some one! You should start more seriously rather than playing meaningless web games!");
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
	    getBoyName();
	    uncheck();
	} else{
		alert("we need to know your feeling about this picture!")
	}
	
}

function changeforboy(){
	if(jQuery('#form input[type=radio]:checked').length) {
	    clickTimer();
		getGirlPhoto();
	    getGirlName();
	    uncheck();
	} else{
		alert("we need to know your feeling about this picture!")
	}
	
}
