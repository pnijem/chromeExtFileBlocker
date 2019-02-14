 var factory = new Factory();

function Factory() { //Factory of FileExtension Objects
    this.createExtension = function (ext) {
        var extension;

        if (ext === ".exe") {
            extension = new Executable();
        } else if (type === ".zip") {
            extension = new Archived();
        }/* else if (type == "someExt"){
            extension = new SomeFutureExt();
        }*/


        extension.blockFileIfNeeded = function (item) {
          let bool;
          $.ajax({
            type: "POST",
            headers: {
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Credentials' : true
            },
			url: "https://e60eb57tz8.execute-api.us-east-2.amazonaws.com/beta/fileblocker/isexecutable",
            data: JSON.stringify(item.url),
            dataType: "text",
            success: function( data, textStatus, jQxhr ){
			  alert(""+data);
              if(data=='true'){
                console.log("The file download is blocked. Canceling the file download");
                chrome.downloads.cancel(item.id);
                bool = true;
              }else{
                chrome.downloads.resume(item.id);
              }
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log("An error has occurred. Details: responseText - "+
                jqXhr.responseText + ", statusText - "+jqXhr.statusText);
                //TODO cancel the download
            }
          });
          return bool;
        }

        return extension;
    }
}

//List of File Type Objects
var Executable = function () {
    this.resource = "/isexecutable";
};

var Archived = function () {
    this.resource = "/isarchived";
};

//End of List
chrome.downloads.onDeterminingFilename.addListener(function(item) {
try{
  chrome.downloads.pause(item.id);
  let rules = localStorage.rules;//see options.html
  try {
    rules = JSON.parse(rules);
  } catch (e) {
    localStorage.rules = JSON.stringify([]);
  }

  for (var index = 0; index < rules.length; ++index) {
    let isBlocked;
    var rule = rules[index];
     if (rule.enabled) {
       var ext = rule.ext_param;
	   alert(ext);
	   
       isBlocked = factory.createExtension(ext).blockFileIfNeeded(item);
       if(isBlocked){
         break;
       }
     }
  }
}catch(e){
  console.log("an error has occurred. Canceling the file download");
  chrome.downloads.cancel(item.id);
}
});
