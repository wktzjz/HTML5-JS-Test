 
function onTouchDown(obj)
{
  // alert(obj);
  // alert(obj.getAttribute('selected'));
  obj.setAttribute('selected','true');
  // alert(obj.getAttribute('selected'));
}


    
function onTouchUp(obj)
{
  obj.setAttribute('selected','false');
  // alert(event);
  //onmousedown="alert(334)" 
  // this.selected = false;
}
