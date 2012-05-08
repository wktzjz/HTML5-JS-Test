//Class NativeBridge :used to communicate with the native layer;
  var NativeBridge = {
    iftest:0,
        callbacksCount : 1,
        callbacks : {},

// Automatically called by native layer when a result is available
        resultForCallback : function resultForCallback(callbackId, resultArray) {
        try {
          var callback = NativeBridge.callbacks[callbackId];
          if (!callback) return;

         callback.apply(null,resultArray);
           } catch(e) {alert(e)}
         },

// Use this in javascript to request native objective-c code
// functionName : string (I think the name is explicit :p)
// args : array of arguments
// callback : function with n-arguments that is going to be called when the native code returned
//       callNative : function callNative(functionName, args, callback) {
// 
//       var hasCallback = callback && typeof callback == "function";
//       var callbackId = hasCallback ? NativeBridge.callbacksCount++ : 0;
////alert("callNative,functionName:"+functionName+"callbackId:"+callbackId+"Arguments:"+JSON.stringify(args));
//       console.log("callNative,functionName:"+functionName+"callbackId:"+callbackId+"Arguments:"+JSON.stringify(args));
//       if (hasCallback)
//       NativeBridge.callbacks[callbackId] = callback;
//
//       var iframe = document.createElement("IFRAME");
//       iframe.setAttribute("src", "js-frame:" + functionName + ":" + callbackId+ ":" + encodeURIComponent(JSON.stringify(args)));
//       document.documentElement.appendChild(iframe);
//       iframe.parentNode.removeChild(iframe);
//       iframe = null;
//   },
         
   
//   callNative : function callNative(functionName, args) {
//       console.log("callNative,functionName:"+functionName+"Arguments:"+JSON.stringify(args));
////       var hasCallback = callback && typeof callback == "function";
////       var callbackId = hasCallback ? NativeBridge.callbacksCount++ : 0;
////
////       if (hasCallback)
////       NativeBridge.callbacks[callbackId] = callback;
//
//       var iframe = document.createElement("IFRAME");
//       iframe.setAttribute("src", "js-frame:" + functionName + ":"+ encodeURIComponent(JSON.stringify(args)));
//       document.documentElement.appendChild(iframe);
//       iframe.parentNode.removeChild(iframe);
//       iframe = null;
//   },
   
         callNative : function callNative(args) {
           var EventType=args.type;
           this.log("HTML_LOG","HTML5_LOG_LEVEL_INFO","JS_Native_Bridge","callNative",JSON.stringify(args));
           //  console.log("callNative,EventType:"+EventType+"Arguments:"+encodeURIComponent(JSON.stringify(args)));
//             var hasCallback = callback && typeof callback == "function";
//             var callbackId = hasCallback ? NativeBridge.callbacksCount++ : 0;
      //
//             if (hasCallback)
//             NativeBridge.callbacks[callbackId] = callback;

             var iframe = document.createElement("IFRAME");
             iframe.setAttribute("src", "js-frame:" + encodeURIComponent(JSON.stringify(args)));
             document.documentElement.appendChild(iframe);
             iframe.parentNode.removeChild(iframe);
             iframe = null;
         },
   
         callNativeForLog : function callNativeForLog(args) {

               var iframe = document.createElement("IFRAME");
               iframe.setAttribute("src", "js-frame:" + encodeURIComponent(JSON.stringify(args)));
               document.documentElement.appendChild(iframe);
               iframe.parentNode.removeChild(iframe);
               iframe = null;
           },
         
//       nativeCall:function nativeCall(functionName,args){
//       alert("nativeCall,functionName1:"+functionName+"Arguments:"+JSON.stringify(args));
//    //   log("nativeCall,functionName2:"+functionName+"Arguments:"+JSON.stringify(args));
//       switch(functionName){
//       case "OnTypeOfAccount":
//        OnTypeOfAccount(args);
//        break;
//       case "OnCheckPWD":
//          OnCheckPWD(args)
//        break;
//       case "OnSiteList":
//          OnSiteList(args)
//       case "test":
//         test();
//       default:
//        // console.log("No such function found");
//         
//       }
//     },
//     
     nativeCall:function nativeCall(args){
        // alert("nativeCall,functionName1:"+functionName+"Arguments:"+JSON.stringify(args));
      //   log("nativeCall,functionName2:"+functionName+"Arguments:"+JSON.stringify(args));
        this.log("HTML_LOG","HTML5_LOG_LEVEL_INFO","JS_Native_Bridge","nativeCall",JSON.stringify(args));
         var type = args.type;
         var typeName=type.split("_");
         var str = typeName[0]+"_"+typeName[1]+"_"+typeName[2];
         switch(str){
         case "EVENT_NATIVE_PREMEETING":
             {
        
           switchfunction(args);
        //  this.log(jsonPackLog(args));
          break;
             }
         case "EVENT_NATIVE_MEETINGLIST":
           meetingListData(args);
        //   this.log(jsonPackLog(args));
          break;
         case "EVENT_NATIVE_PLIST":
           switchPlist(args);
        //   this.log(jsonPackLog(args));
            break;
         case "EVENT_NATIVE_TELE":
           switchfunction3(args);
        //   this.log(jsonPackLog(args));
            break;
         case "EVENT_NATIVE_CHAT":
           switchfunction4(args);
        //   this.log(jsonPackLog(args));
            break;
         case "EVENT_NATIVE_PLIST":
           switchfunction5(args);
       //    this.log(jsonPackLog(args));
            break;
         case "EVENT_NATIVE_MEETING":
           switchfunction6(args);
       //    this.log(jsonPackLog(args));
            break;
         case "test":
           test();
         default:
          // console.log("No such function found");
           
         }
       },
   
       
       
       ///====================================
       //===================================    
       ///============================       
       ///====================================
       //===================================      
       ///============================ 
       ///====================================
       //===================================       
       ///============================
       log:function log(type, level, module, functionName, content){
           
        var jsonlog=this.jsonPackLog(type, level, module, functionName, content);
           if(this.iftest==0)
           {
             console.log(JSON.stringify(jsonlog));
             NativeBridge.callNativeForLog(jsonlog);
           }
           if(this.iftest==1)
           {
               console.log(content);
           }
       }, 
         
         jsonPack:function jsonPack(type,data){
          var json;
          json.type=type;
          json.data=data;
          return json;
         },
       
    jsonPackLog:function jsonPackLog(type,level, module, functionName, content){
           
           var newJson;
         var json ={"type":type, "data":{"level":level, "module":module,"functionName":functionName,"content":content}};
           
           return json;
       }
       
     
     
   
//       jsonPackLog1:function jsonPackLog1(args){
//         var json;
//           json.type="HTML_LOG";
//           json.data.level="HTML5_LOG_LEVEL_INFO";
//           json.data.module=args.data.module;
//             json.data.functionName=args.data.functionName;
//             json.data.content=args.data.content;
//             return json;
//       }
};
  
  
 