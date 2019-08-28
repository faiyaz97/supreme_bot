console.log("hello");
var aTags = document.getElementsByTagName("a");
var keyword = "Powered";
var colour = "Black";
var size = "Large";
var category = "shirts";
var item_page = "https://www.supremenewyork.com/shop/all/" + category;
var checkout_page = "https://www.supremenewyork.com/checkout";

//USER DETAILS
var full_name;

//DET
chrome.runtime.sendMessage({todo: "showPageAction"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.todo == "bot"){
    full_name = request.full_name1;
  }
})

if(window.location.href == item_page){
  search_item(keyword, colour);
}

if(window.location.href != item_page && window.location.href != checkout_page){
  select_size(size);
}

if(window.location.href != item_page && window.location.href != checkout_page){
  add_to_basket();
}

if(window.location.href != item_page){
  autofill();
}


function autofill(){
  document.getElementById('order_billing_name').value = full_name;

  document.getElementById('order_email').value = "gmail@gmail.com";
  document.getElementById('order_tel').value = "07405602999";
  document.getElementById('bo').value = "1 shrew road";
  document.getElementById('order_billing_city').value = "London";
  document.getElementById('order_billing_zip').value = "E7 8aj";
  document.getElementById('cnb').value = "1234123412341234";
  document.getElementById('vval').value = "777";

  //UK
  var uk_menu = document.getElementById('order_billing_country');
  for (var i = 0; i < uk_menu.options.length; i++) {
      if (uk_menu.options[i].text === "UK") {
        uk_menu.selectedIndex = i;
        break;
      }
  }
  //card month
  var month_menu = document.getElementById('credit_card_month');
  for (var i = 0; i < month_menu.options.length; i++) {
      if (month_menu.options[i].text === "02") {
        month_menu.selectedIndex = i;
        break;
      }
  }
  //card year
  var year_menu = document.getElementById('credit_card_year');
  for (var i = 0; i < year_menu.options.length; i++) {
      if (year_menu.options[i].text === "2022") {
        year_menu.selectedIndex = i;
        break;
      }
  }

  //checkbox
  if(!document.getElementById("order_terms").checked){ 
    document.getElementById("order_terms").nextElementSibling.click(); 
  }

  document.querySelector('.button.checkout').click();

}

function add_to_basket(){
  document.getElementsByName("commit")[0].click();
  setTimeout(function(){
    document.querySelector('.button.checkout').click();
  }, 300);
   
}


function select_size(size){
  var size_menu = document.getElementById('size');
  for (var i = 0; i < size_menu.options.length; i++) {
      if (size_menu.options[i].text === size) {
        size_menu.selectedIndex = i;
        break;
      }
  }
}

function search_item(keyword, colour){
  console.log("searching item...");
  
  var hrefs;
  var keyword_list = [];
  var colour_list = [];
  var item_link;
  var found = false;
    
    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent.includes(keyword)) {
        hrefs = aTags[i];
        keyword_list.push(hrefs);
        console.log("FoundK: " + hrefs);
      }
    }
    
    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent.includes(colour)) {
        hrefs = aTags[i];
        colour_list.push(hrefs);
        console.log("FoundC: " + hrefs);
      }
    }
    
    for(var i = 0; i < keyword_list.length; i++){
      for(var j = 0; j < colour_list.length; j++){
        if (String(keyword_list[i]) == String(colour_list[j])){
          item_link = keyword_list[i];
          console.log("ITEM LINK FOUND: " + item_link);
          found = true;
          break;
        }
      }
    }

    if (found == false && item_page == window.location.href){
      console.log("NOT FOUND: \n" + item_page + "\n" + window.location.href);
      setTimeout(function(){location.reload()}, 1022);
    }
    else if (item_page == window.location.href) {
      window.location.href = item_link;
    }
    
  }


