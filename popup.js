function createAlarm() {
    var now = new Date();
    var day = now.getDate();
    if (now.getHours() >= 16) {
	day = day+1;
    }
    var timestamp = new Date(now.getFullYear(), now.getMonth(), day, 16, 30, 0, 0).getTime();
    //                        YYYY               MM              DD  HH MM SS MS
    // Create
    chrome.alarms.create({
        when: timestamp 
    });

}

// Listen
chrome.alarms.onAlarm.addListener(function(alarm) {
	openBatSignalTab();
});


function openBatSignalTab(){
var url = 'http://babylon-batsignal.meteor.com/';
chrome.tabs.query({
    url: url
}, function(tabs) {
    if (tabs.length === 0) {
        chrome.tabs.create({ url:url, active: true }, function(tab) {
        						chrome.tabs.executeScript(tab.id, {
								code: 'jQuery(document).ready(function() { document.getElementById("textbox").value="Guys update Trello";document.getElementsByTagName("button")[0].click() });'
							    }	
							);
						      }
	);
    } else {
        // Focus first match
createAlarm();
        chrome.tabs.update(tabs[0].id, { active: true });
	chrome.tabs.executeScript(tabs[0].id,{
	    code: 'document.getElementById("textbox").value="Guys its time to update Trello";document.getElementsByTagName("button")[0].click()'
	  });
    }
    
});
}
createAlarm();
