if (!String.prototype.contains) {
  String.prototype.contains = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

var log = function(tag, txt, level) {
  if (!level) level = "info";

  var date = formatDate(new Date());
  var entryText =     "["+ date+"] ("+ tag + ") "+ level.toUpperCase() + ": "+ txt;
  var entry = "<p class='"+level+"'>"+entryText+ "</p>";

  if (level == "error") console.error(entryText);
  else console.info(entryText);

  //$("#log").prepend(entry);

}

var isCordova = function(){
  console.log("URL " , document.URL);
  //var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1  && document.URL.indexOf( 'file://' ) === -1;
  return document.URL.indexOf('android_asset') !== -1;
}

var formatDate = function(d) {
  var date = d.getFullYear() + "-" + (d.getMonth() +1 ) + "-" + d.getDate(); // Returns the year
  var time = d.getHours() + ":"+ d.getMinutes() + ":" + d.getSeconds();
  return date + " "+ time;
}

// ASCII only
function stringToBytes(string) {
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

var drawChat = function(type, text) {
    var date = new Date();
    var time = date.getHours() +":"+ date.getMinutes();
    var template = $('#chat-template').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, {time: time, text: text, type: type});

    var $chat = $("#chat");
    var top = $chat[0].scrollTop;
    var maxHeight = $chat[0].scrollHeight;
    var height = $chat.outerHeight();

    var isAtBottom = top + height >= maxHeight;

    $("#chat").append(rendered);

    //Scroll to bottom of chat
    if (isAtBottom) $chat.scrollTop(maxHeight);
}

var isDivAtBottom = function(id){

       var $div = $(id);
       var top = $div[0].scrollTop;
       var maxHeight = $div[0].scrollHeight;
       var height = $div.outerHeight();

       return top + height >= maxHeight;
}
var scrollToBottom = function(id) {
  var $div = $(id);
  var maxHeight = $div[0].scrollHeight;
  $div.scrollTop(maxHeight);
}

var lastMessageType = "";
if (!isCordova()) {
  setInterval(function(){
    if (lastMessageType === "") lastMessageType = "info";
    else if (lastMessageType === "receive") lastMessageType = "send";
    else lastMessageType = "receive";

    drawChat(lastMessageType, "Sample text");
  }, 2000);
}
