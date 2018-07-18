
//  day la não chuong trinh chinh
// đây là não của chương trình chính : viết bằng javascript, dùng để gửi tín hiệu lên cho server(Bluetooth.js)
var allLinks = document.getElementsByTagName('a');
var strongEl = document.getElementById('latest-word');
var saidWord;
var S = webkitSpeechRecognition || SpeechRecognition;
var kind = 0;
var recognition = new S();
var sz = 1;
var mode = 0;
var imode = 0;
// 1: mode count

var zero_list = ["expand", "Expand", 
                "yourheart", 
                "thanks", "thank", "Thank", "Thanks"
                ]; // chứa những từ để duỗi ra. 

var one_list = ["please", "Please", 
                "helpme", "Helpme"
               ]; // mảng này chứa những từ để co lại

// zero_list và one_list là hai mảng chưa key word cần tìm
// chỉ cần nói câu có chứa từ trong hai mảng trên sẽ gửi yêu cầu tương ứng

var number_one = ["numberone", "NumberOne", "numberOne", "Numberone"];
var number_two = ["numbertwo", "NumberTwo", "numberTwo", "Numbertwo"];
var number_three = ["numberthree", "NumberThree", "numberThree", "Numberthree"];
var number_four = ["numberfour", "NumberFour", "numberFour", "Numberfour"];
var number_five = ["numberfive", "NumberFive", "numberFive", "Numberfive"];
             
function  isCheck(list, data) {
  for(var each in list) {
      var str = list[each];
      var count = 0;
      for(var tmp in data) {
          if(data[tmp]==str[count])
              count = count + 1;
      }
      if(count == str.length) return 1;
  } 
  return 0;
} 

//socket.emit("channel", "hello world");

// DETECT VOICE // 
recognition.continuous = true;
recognition.interimResults = true;
recognition.start();
strongEl.innerHTML = recognition;
recognition.onresult = function(event){
  var resultsLength = event.results.length -1 ;
  var ArrayLength = event.results[resultsLength].length -1;
  saidWord = event.results[resultsLength][ArrayLength].transcript;
  for (i=0; i<allLinks.length; i++) {
      var dataWord = allLinks[i].dataset.word;
    if (saidWord.indexOf(dataWord) != -1) {
      allLinks[i].style.color = 'red';
    }
  }
  strongEl.innerHTML = saidWord;  
  //if(mode == )
    if( sz == 0) {
      if(isCheck(zero_list, saidWord)) {
        socket.emit('message', "0");
        sz = 1;
      }
    }
    else
    if(  sz == 1) {
      if(isCheck(one_list, saidWord)) {
        socket.emit('message', "1");
        sz = 0;
      } 
    }
}

recognition.onerror = function(event){
   console.log('error?');
   Start();
   console.log(event);
 }

// ====== ~~ ======
// =========== WORD -> SIGNAL =========
function hard_on() {
  if(sz == 1) {
  socket.emit('message', "1");
  sz = 0; 
  }
}
function hard_off() {
  if(sz == 0) {
  socket.emit('message', "0");
  sz = 1; 
}
}
function Start() {
  socket.emit('message', "0");
  location.reload();
}
function TurnonModeCount() {
  if(mode == 0) {
    mode = 1;
    document.getElementById('type').innerHTML = "Count Number";
  }
  else 
  if(mode == 1) {
    mode = 0;
    document.getElementById('type').innerHTML = "Request";
  }
}
// function GETSTR(s, p) {
//   var tmp = "";
//   for(var i in s) 
//     if(s[i] != ' ') {
//       tmp = tmp + s[i]; 
//       console.log(s[i]);    
//     }
// }