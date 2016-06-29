$(document).ready(function () {
    console.log("I am gadgetz!");

    //nav event handler
    //bindNavEventHandler();

    //get page name
    //url  = $(location).attr('href');
    //name = url.slice(url.indexOf("#")+1, url.len);
    //name = name.length ? name : 'home';

    //get homepage content
    //getContent('home');

});

function bindNavEventHandler() {
	$('nav li a').click(function (e) {
		console.log($this);
		//remove active class
		$('ul.nav li').each(function () {
			$(this).removeClass('active');
		});
		//add active class
		$(this).parent().addClass('active');
	});
}

function getContent(page) {
	$.get("app/" + page + ".html", function (result) {
		$('.content').html(result);
		//$('ul.nav li a#'+page).addClass('active');
	}).error(function (jqXHR, textStatus, errorThrown) {
		console.log("Error occurred in getting content!");
    });
}