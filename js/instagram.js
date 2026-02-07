const igLink = document.getElementById('instagram-username');
const username = "bitmedia._"; 

igLink.onclick = function(e) {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isAndroid || isiOS) {
    e.preventDefault();

    let appUrl;
    if (isAndroid) {

      appUrl = `intent://www.instagram.com/_u/${username}/#Intent;package=com.instagram.android;scheme=https;end`;
    } else {

      appUrl = `instagram://user?username=${username}`;
    }

    window.location.href = appUrl;

    const start = Date.now();
    const timer = setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.location.href = `https://www.instagram.com/${username}/`;
      }
    }, 1000);

    // Stop the timer if the user actually leaves the page to the app
    window.onblur = function() {
      clearTimeout(timer);
    };
  }
};