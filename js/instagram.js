const igLink = document.getElementById('instagram-username');
const username = "bitmedia._"; 

igLink.onclick = function(e) {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isAndroid || isiOS) {
    e.preventDefault();

    let appUrl = isAndroid 
      ? `intent://www.instagram.com/_u/${username}/#Intent;package=com.instagram.android;scheme=https;end`
      : `instagram://user?username=${username}`;

    window.location.replace(appUrl);


    const start = Date.now();
    const timer = setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.location.href = `https://www.instagram.com/${username}/`;
      }
    }, 1000);

    window.onblur = () => clearTimeout(timer);
  }
};