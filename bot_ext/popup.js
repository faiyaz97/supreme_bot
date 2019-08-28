$(function(){
  var full_name = $('#full_name').val();

  $('#start_bot').click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {todo: "bot", full_name1: full_name})
    });
  });

});