document.addEventListener('DOMContentLoaded', function() {
  replaceLinks();
});

function replaceLinks(){
	var links = document.querySelectorAll('a');
	//alert("replaceLinks");
	for (i=0; i<links.length; i++){
		var link = links[i];
		link.addEventListener("click",replacePage, false);
	}
	
}

function replacePage(){
	event.preventDefault();
	var href= this.href;
	//alert("replacePage");
	var ajax = new XMLHttpRequest();
	ajax.open("GET",href,true);
	ajax.send();

	ajax.onreadystatechange=function(){
		if(ajax.readyState==4 && (ajax.status==200)){
			var body = document.querySelector('body');
			var html = document.querySelector('html');
			//alert("onreadystatechange");
			console.log("onreadystatechange");
			var bodyContent =  grabBody(ajax.responseText, "body");
			var headContent =  grabHead(ajax.responseText, "head");
// alert("headContent"+headContent);
// alert("headContent"+headContent);
			body.addEventListener( 'webkitTransitionEnd', moveToRight, false);
			body.style.left = "-100%";
			window.addEventListener("popstate", handleBackButton);

			function moveToRight(event){
				//alert("moveToRight");
				console.log("moveToRight");
				var body = document.querySelector('body');
				body.removeEventListener( 'webkitTransitionEnd', moveToRight, false);
				body.addEventListener( 'webkitTransitionEnd', returnToCenter, false);
				body.style.opacity = 0;
				body.style.left = "100%"
			}

			function returnToCenter(event){
				// alert("returnToCenter");
				console.log("returnToCenter");
				var body = document.querySelector('body');
				var head = document.querySelector('head');
				body.removeEventListener( 'webkitTransitionEnd', returnToCenter, false);
				body.innerHTML = bodyContent;
				head.innerHTML = headContent;
				history.pushState(null, null, href);
				 body.style.opacity = 1;
				 body.style.left = 0;
				body.setAttribute('class','welcomebody');
				replaceLinks();
			}

			function handleBackButton(e) {

		   		var ajaxBack = new XMLHttpRequest();
				ajaxBack.open("GET",location.pathname,true);
				ajaxBack.send();

				ajaxBack.onreadystatechange=function(){
					var bodyBack = document.querySelector('body');
					var bodyBackContent =  grabBody(ajaxBack.responseText, "body");
					bodyBack.addEventListener( 'webkitTransitionEnd', moveToLeft, false);
					bodyBack.style.left = "100%";

					function backToCenter(event){
						var body = document.querySelector('body');
						body.removeEventListener( 'webkitTransitionEnd', backToCenter, false);
						body.innerHTML = bodyBackContent;
						body.style.opacity = 1;
						body.style.left = 0;
						replaceLinks();
					}

					function moveToLeft(event){
						var body = document.querySelector('body');
						body.removeEventListener( 'webkitTransitionEnd', moveToLeft, false);
						body.addEventListener( 'webkitTransitionEnd', backToCenter, false);
						body.style.opacity = 0;
						body.style.left = "-100%"
					}
				}
			}
		}
	}		
}

function grabBody(html){
	var tagStart = html.indexOf("<body");
	var start = html.indexOf(">", tagStart) + 1;
	var end = html.indexOf("</body", start);
	return html.slice(start, end);
}

function grabHead(html){
	var tagStart = html.indexOf("<head");
	var start = html.indexOf(">", tagStart) + 1;
	var end = html.indexOf("</head", start);
	return html.slice(start, end);
}