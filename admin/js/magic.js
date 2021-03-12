var canvas;
var ctx;
var x = 150;
var y = 100;
var WIDTH = 800;
var HEIGHT = 600;
var dragok = false;
var robot = {x: 350, y:480};
var units = [];
var leftMouseDown = false
var rightMosueDown = false
var selectedIndex = -1

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function getUnitMouseIsOn(e){
  on = -1;
  units.forEach((u,i)=>{
    if((e.x >= u.x && e.y >= u.y)&&(e.x<=(u.x+u.width) && e.y <=(u.y+u.height) )){
      on = i;
    }
  })
  return on;
}
function selectUnit(u){
  selectedIndex=u;
  units[u].selected=true
  $('#remove').removeAttr('disabled');
}
function removeUnit(){
  units.splice(selectedIndex,1)
  selectedIndex=-1
  $('#remove').attr('disabled','true')
}
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.onmousemove = function(e) {
    e=getMousePos(canvas,e);
    mouseOn = getUnitMouseIsOn(e)
    if(selectedIndex != -1) {
      units[selectedIndex].x=e.x-units[selectedIndex].width/2;
      units[selectedIndex].y =e.y-units[selectedIndex].height/2;
    }
    if(mouseOn==-1){
      canvas.style.cursor="default";
      units.forEach(u=>{u.hovered = false;});
    } else {
      canvas.style.cursor = "move";
      if(!units[mouseOn].selected){
        units[mouseOn].hovered=true;
      }
    }
  }
  canvas.oncontextmenu=function(){
    return false;
  }
  canvas.onmousedown = function(ev) {
    e = getMousePos(canvas,ev);
    mouseOn=getUnitMouseIsOn(e);
    if(ev.button==2){
      if(mouseOn>-1){
        w = units[mouseOn].width;
        h = units[mouseOn].height;
        units[mouseOn].width = h;
        units[mouseOn].height = w;
        units[mouseOn].x=e.x-units[mouseOn].width/2;
        units[mouseOn].y =e.y-units[mouseOn].height/2;
        units[mouseOn].pixel = (units[mouseOn].pixel + 1)%4
        if(units[mouseOn].pixel==2){
          units[mouseOn].pixel=3
          units[mouseOn].width=w
          units[mouseOn].height=h
          units[mouseOn].x=e.x-units[mouseOn].width/2;
          units[mouseOn].y =e.y-units[mouseOn].height/2;

        }
      }
      return; 
    }
    if(selectedIndex>-1){
      units[selectedIndex].selected = false;
      units[selectedIndex].hovered = false;
      selectedIndex = -1;
      $('#remove').attr("disabled","true");
    } else if(mouseOn>-1){
      selectUnit(mouseOn);
      units[mouseOn].hovered = false;
      selectedIndex = mouseOn;
    }
  }
  canvas.onmouseup = function(e){
    if(e.button==2){
      return false;
    }
    e = getMousePos(canvas,e);
    mouseOn = getUnitMouseIsOn(e);
    if((mouseOn == selectedIndex)&&selectedIndex>-1) {
      units[selectedIndex].selected = false;
      units[selectedIndex].hovered = false;
      selectedIndex=-1;
      $('#remove').attr('disabled',"true");
    }
  }

  return setInterval(update, 10);
}




function update(){
  draw()
}
function coordsFromPixel(u){
  if(u.pixel==0){
    return [u.x,u.y+(u.height-5)]
  } else if(u.pixel==1){
    return [u.x + (u.width-5),u.y+(u.height-5)]
  } else if(u.pixel==2){
    return [u.x + (u.width-5),u.y]
  } else {
    return [u.x, u.y]
  }
}
function draw() {
  clear();
  lines=[]
  ctx.fillStyle = "#eee";
  rect(0,0,WIDTH,HEIGHT);

  units.forEach(unit=>{
    if(unit.selected){
      ctx.fillStyle="#999";
    } else if(unit.hovered) {
      ctx.fillStyle = "#666";
    } else {
      ctx.fillStyle="#333";
    }
    rect(unit.x,unit.y,unit.width,unit.height);
    ctx.fillStyle="#f00";
    p=coordsFromPixel(unit);
    g=[350,430];
    rect(p[0],p[1],5,5)
    ctx.beginPath()
    ctx.lineWidth=3;
    ctx.strokeStyle='#f00';
    ctx.moveTo(p[0],p[1]);
    if(unit.pixel==0){
      np = [p[0],p[1]+20];
      ctx.lineTo(np[0],np[1]);
      moveDown(np,g,ctx);

      ctx.moveTo(p[0],p[1]+20);
      for(var c=1;c<unit.cols;c++){
        ctx.lineTo(p[0]+30*c,p[1]+20);
        ctx.lineTo(p[0]+30*c,p[1]);
        ctx.moveTo(p[0]+30*c,p[1]+20);
      }

    } else if(unit.pixel==1){
      np = [p[0]+20,p[1]];
      ctx.lineTo(np[0],np[1]);
      if(np[0]-g[0]<0){
        moveRight(np,g,ctx);
      } else {
        moveDown(np,g,ctx);
      }

      ctx.moveTo(p[0]+20,p[1]);
      for(var c=1;c<unit.cols;c++){
        ctx.lineTo(p[0]+20,p[1]-30*c);
        ctx.lineTo(p[0],p[1]-30*c);
        ctx.moveTo(p[0]+20,p[1]-30*c);
      }

    } else {
      np = [p[0]-20,p[1]]
      ctx.lineTo(np[0],np[1]);
      if((np[0]-g[0]>0)){
        moveLeft(np,g,ctx)
      } else {
        moveDown(np,g,ctx)
      }

      ctx.moveTo(p[0]-20,p[1]);
      for(var c=1;c<unit.cols;c++){
        ctx.lineTo(p[0]-20,p[1]+30*c);
        ctx.lineTo(p[0],p[1]+30*c);
        ctx.moveTo(p[0]-20,p[1]+30*c);
      }


    }

    ctx.moveTo(g[0],g[1])
    ctx.lineTo(g[0],g[1]+50)
    ctx.stroke();
  })


  ctx.fillStyle = "#0e0";
  rect(340,480,20,20);
}
lines = [] 
function moveDown(np,g,ctx){
  if(np[1]<g[1]){
    nnp = [np[0],g[1]]
    k=checkAllIntersect([np,nnp])
    if(k!=-1){
      if(k>np[1]){
        nnp = [np[0],k]
      }

    }
    lines.push([np,nnp]);
    ctx.lineTo(nnp[0],nnp[1]);

    if(np[0]>g[0]){
      moveLeft(nnp,g,ctx)
    } else if(np[0]<g[0]) {
      moveRight(nnp,g,ctx)
    }
  }
}
function moveLeft(np,g,ctx){
  nnp = [g[0],np[1]]
  k=checkAllIntersect([np,nnp],xcheck=true)
  if(k!=-1){
    nnp = [k,np[1]]
  }
  lines.push([np,nnp]);
  ctx.lineTo(nnp[0],nnp[1])
  if(np[1]<g[1]){
    moveDown(nnp,g,ctx)
  }
}
function moveRight(np,g,ctx){
  moveLeft(np,g,ctx)
}
function det(a,b){
  return a[0]*b[1]-a[1]*b[0]
}
function checkAllIntersect(l1,xcheck){
  outs=[]
  lines.forEach(line=>{
    if(checkIntersect(line,l1)!=-1){
      outs.push(checkIntersect(line,l1));
    }
  });
  if(outs.length==0){
    return -1;
  } else {
    xy = l1[0][1]
    if(xcheck){
      xy=l1[0][0]
    }
    minval=Infinity
    output=outs[0]
    outs.forEach(out=>{
      if(Math.abs(xy-out)<minval){
        minval=Math.abs(xy-out);
        output=out;
      }
    })
    return output;
  }
}
function checkIntersect(l1,l2){
  x1=l1[0][0]
  x2=l1[1][0]
  x3=l2[0][0]
  x4=l2[1][0]
  y1=l1[0][1]
  y2=l1[1][1]
  y3=l2[0][1]
  y4=l2[1][1]
  if(y1==y2) {
    if(((y3>y1) != (y4>y1)) && ((x1>x3) != (x2>x3))) {
      return y1;
    }
  } else if(y3==y4) {
    if(((y1>y3) != (y2>y3)) && ((x3>x1) != (x4>x1))){
      return x1;
    }
  }
  return -1;
}



$(function(){
  init();
})

function removeRow(id) {
  if($('#'+id+' tr').length>2){
    $('#'+id+' tr').last().detach();
  }
}
function removeCol(id) {
  if($('#'+id+' tr.clone').children().length>1){
    $('#'+id+' tr').each(function(){
      $(this).children().last().detach();
    })
  }
} 
function addRow(id) {
  newRow=$('tr.clone').clone().removeClass('clone').addClass('cloned');
  newRow.children().first().removeClass('clone');
  $('#'+id).append(newRow);
}

function addCol(id){
  $('#'+id+' tr').each(function(){

    newcell=$('td.clone').clone().removeClass('clone').addClass('cloned');
    $(this).append(newcell)
  })
}
function resetTable(){
  $('input').val("");
}

function addUnit(){
  unit = []
  $('#addTable tr').not('.clone').each(function(){
    curRow = []
    $(this).children().each(function(){
      curRow.push($(this).children().val());
    })
    unit.push(curRow)
  });
  units.push({rows: unit.length, cols: unit[0].length, width: unit[0].length*30, height: 30, x: 300, y: 400, selected: true, hovered: false, pixel:0, shoes: unit});
  selectUnit(units.length-1)
  resetTable();
}







































