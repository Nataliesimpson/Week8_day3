window.onload = function () {
 var url = 'https://restcountries.eu/rest/v1'
 var request = new XMLHttpRequest();
 request.open("GET", url);

 request.onload = function () {
   if (request.status === 200) {
     var jsonString = request.responseText;
     var countries = JSON.parse(jsonString);
     console.log('Ive loaded')
     main(countries);
     getBucketList();
   }
 }
 request.send();
};

var main = function(countries){
  populateSelect(countries);
}

var populateSelect = function (countries) {
  var parent = document.querySelector('#countries');
  countries.forEach(function (item, index) {
   item.index = index;
   var option = document.createElement("option");
   option.value = index.toString();
   option.text = item.name;
   option.selected = " ";
   parent.appendChild(option);
 })
  parent.style.display = 'block';
  parent.addEventListener('change', function (e) {
  var index = this.value;
  var country = countries[index];
  updateDisplay(country);
  addCountry(country);
    });
};

var getBucketList = function(){
  var request = new XMLHttpRequest();
  request.open( "GET", '/country');
  request.onload = function(){
    console.log(request.responseText)
  }
  request.send(JSON.stringify({name:name}));
}   

var updateDisplay = function (country) {
  var tags = document.querySelectorAll('#list p');
  tags[0].innerText = "Country:   " + country.name;
}

 var addCountry = function(country){
    console.log('being hit');
    var request = new XMLHttpRequest();
    request.open( "POST", '/country');
    request.setRequestHeader("Content-Type", "application/json")
    request.onload = function() {
      if (request.status === 200) {
         console.log("does this work?")
         getBucketList()
       }
       console.log(request.status)
     }
     request.send(JSON.stringify({name: country.name}));
   }


 
   




