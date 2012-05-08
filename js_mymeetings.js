/*
 * meetingsObj:
 * 
 */
function addMeetings(meetingArray)
{
	alert("addMeetings");
	for (var i=0; i < meetingArray.length; i++) 
	{
	  	addAMeeting(meetingArray[i].meetStartTime,meetingArray[i].durHr, meetingArray[i].meetName, meetingArray[i].hostStr, meetingArray[i].isStart);
	};
	/*
	 * 
	 */
	// var pageLinks = document.getElementsByTagName('li');
	// for(var i = 0; i < pageLinks.length; i++)
	// {
	    // pageLinks[i].addEventListener('onmousedown', function(){alert('onmousedown');}, false);
	    // pageLinks[i].addEventListener('onmouseup', function(){alert('onmouseup');}, false);
	// }
}

function addAMeeting(meetStartTime,durHr,meetName,hostStr,isStart)
{
	var dateObj = new Date();
	dateObj.setTime(meetStartTime);
	var stimeStr = dateObj.toString("hh:mm tt");
	
	dateObj.setHours(dateObj.getHours()+ durHr);
	var etimeStr = dateObj.toString("hh:mm tt");
	
	
	dateObj.setTime(meetStartTime);
	setDayZeroTime(dateObj);
	var listid = dateObj.getTime();
	var datelist = document.getElementById(listid);
	if(datelist == null)
	{
		// alert(1);
	  	var todayObj = new Date();
	  	setDayZeroTime(todayObj);
	  	var dateClass = (todayObj.getTime() == dateObj.getTime()) ? 'todayField' : 'dateField';
	
		var label = '<div class=\"' + dateClass + '">';
		var leftx = document.documentElement.clientWidth - 180;
		label += '<label>' + dateObj.toString("ddd") +'<\/label><label style=\"position:relative; left: '+ leftx +'px;\">';
		label += dateObj.toString("yyyy/MM/dd") + '<\/label><\/div>';
		$(label).appendTo('#mainpanle');
		
		var list = '<ul id="'+ dateObj.getTime() +'"><li class="' + (isStart?'onMeetLi':'offMeetLi') +'" onmousedown="onTouchDown(this)" onmouseup="onTouchUp()" selected="false">';
		list += '<div class = \"meetTime\">' + stimeStr + ' to ' + etimeStr + '<\/div><div class = \"meetName\">' + meetName +'<\/div><div class = \"hostStr\">' + hostStr + '<\/div><\/li><\/ul>';
		alert(list);
		$(list).appendTo('#mainpanle');
	}else
	{
		// alert(2);
		var listli = '<li class="' + (isStart?'onMeetLi':'offMeetLi') +'" onmousedown="onTouchDown(this)" onmouseup="onTouchUp()" selected="false">';
		listli += '<div class = \"meetTime\">' + stimeStr + ' to ' + etimeStr + '<\/div><div class = \"meetName\">' + meetName +'<\/div><div class = \"hostStr\">' + hostStr + '<\/div><\/li>';
		alert(listli);
		$(listli).appendTo('#'+listid);
	}
} 
  
function setDayZeroTime(dateObj)
{
	dateObj.setHours(0);
	dateObj.setMinutes(0);
	dateObj.setSeconds(0);
	dateObj.setMilliseconds(0);
}	
  
function deleteAllMeets()
{
	alert("deleteAllMeets");
	var mainPanle = document.getElementById('mainpanle');
	if(mainPanle == null) alert('mainPanle is null');
	alert(mainPanle.hasChildNodes());
	for (; mainPanle.hasChildNodes();){
	  mainPanle.removeChild(mainPanle.firstChild);
	};
}
