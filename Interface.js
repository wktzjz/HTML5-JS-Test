       

      /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
           Stream,Fox
           This is how i would call your function to determine the type of the account,
           You would receive user's eamil.
           Response is the the send back argument .
           if default ,please set the "response" to 1 and send it back;
      */       
                     var useremail = new Object();
                     useremail.username=username;
                     NativeBridge.call("HTML_LOGIN_DETERMINE_TYPE_OF_ACCOUNT", [useremail], function (response) {
                          Acctype=reponse;
                     });
         

       /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
           Stream,Fox
           This is how i would call your function to check if the user password is right or not,
           You would receive 2 attributes:username,password
           Response is a boolean ,true means right.
       */              
                    var ifright=true;
                    var account = new Object(); 
                    account.username=username;
                    account.password=password;
                    NativeBridge.call("HTML_LOGIN_CHECK_PWD", [account], function (response) {
                        ifright=response;                    
                    }); 


       /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
           Stream,Fox
           This is how i would call your function to list ALL the site the user may use,
           You would receive user's email.
           Response is an Array ,such as ["Webex Meeting Center","go.webex.com","SSO company","ssourl.com"]
           Please note that "Webex Meeting Center"&"go.webex.com" belong to one site.
           So the length of the array must always be even.
       */              
                    NativeBridge.call("HTML_LOGIN_REQUEST_SITELIST_OF_ACCOUNT", [useremail], function (response) {
                    for(var i=0;i<response.length/2;i++){
                        AccLink[i]={
                            "Name":response[i*2],
                            "Url" :response[i*2+1]
                        }
                      }
                    });               


        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
           Stream,Fox
           This is how i would call your function to list ALL the meeting the user may have in the near future,
           You would receive a date or null(because not necessary),this is to be discussed.
           Response is an array ,such as["Web,Jun 22,2012","meeting-name-1",host1","Thu,Jun 23,2012","meeting-name-2","host2"]
           Please note that "Web,Jun 22,2012","meeting-name-1",host1", belong to one meeting info.
           Please also note that if the host is the user himself,please change the "host" to  "I'm the host"
           If you want to use another type of response ,please let me know.
       */              
                    NativeBridge.call("HTML_MEETINGLIST_REQUEST_MEETINGLIST", [date], function (response) {
                    for(var i=0;i<response.length/3;i++){
                        MeetingList[i]={
                            "Date":response[i*3],
                            "MeetingName":response[i*3+1],
                            "Hoster" :response[i*3+2]
                        }
                      }
                    });     


        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
           Stream,Fox
           This is how i would call your function to list the meeting details,
           You would receive a MeetingID or MeetingName,this is to be discussed.
           Response is an array ,such as
           ["ThisisMeetingName","ThisIsHost","ThisIsWhen","ThisIsMeetingNumber","ThisIsAgenda","ThisIsInvitees","ThisIsJoinAudioCon"]
           If you want to use another type of response ,please let me know.
       */              
                    NativeBridge.call("HTML_MEETINGINFO_REQUEST_MEETINGINFO", [MeetingID], function (response) {                
                        MeetingList[0]={
                            // "MeetingName":response[0],
                            // "Hoster":response[1],
                            // "Time" :response[2]
                            // ............
                        }
                      }
                    );  
                    
       /*
        * Stream,Fox:
        * I will call the following when the user press the join button in joinbynumber.html;
        * I send the meetnumber,displayname to you.
        * I want the response:
        * 0: OK
        * Others: error number...
        */   
        var joinArgs = new Object(); 
       	joinArgs.meetnumber = number;
       	joinArgs.displayname = name;
   	 	NativeBridge.call("JOINBYNUMBER_JOINBYNUMBER", [joinArgs], function (response) {
              	if(response==0)
              	{
              		//SUCCESS
              	}else
              	{
              		//ERROR CODE
              	}
             });