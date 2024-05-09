// Array of LinkedIn profile URLs
var linkedInProfiles = ['https://www.linkedin.com/in/shubham-gupta-92244a200', 'https://www.linkedin.com/in/kumar-aniket-yadav', 'https://www.linkedin.com/in/harsh-viha786'];

document.addEventListener('DOMContentLoaded', function() {
  var scrapeBtn = document.getElementById('scrapeBtn');

  scrapeBtn.addEventListener('click', function() {
    // Iterate over each profile URL
    linkedInProfiles.forEach(function(profileUrl) {
      // Create a new tab for each profile
      chrome.tabs.create({ url: profileUrl }, function(tab) {
        // Once the tab is loaded, execute the scrapeLinkedInProfiles function
        chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: scrapeLinkedInProfiles
            });
          }
        });
      });
    });
  });
});

function scrapeLinkedInProfiles() {
  // Get the LinkedIn profile elements
  var name = document.querySelector('.name').innerText;
  var location = document.querySelector('.location').innerText;
  var about = document.querySelector('.about').innerText;
  var bio = document.querySelector('.bio').innerText;
  var followerCount = document.querySelector('.follower-count').innerText;
  var connectionCount = document.querySelector('.connection-count').innerText;
  var bioLine = document.querySelector('.bio-line').innerText;

  // Extract profile data
  var profileData = {
    name: name,
    location: location,
    about: about,
    bio: bio,
    followerCount: followerCount,
    connectionCount: connectionCount,
    bioLine: bioLine
  };

  // Send data to backend API
  fetch('https://your-backend-api.com/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
}
