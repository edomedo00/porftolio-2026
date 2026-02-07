const igLink = document.getElementById('instagram-username');
  const username = "bitmedia._"; 

  igLink.onclick = function(e) {
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      e.preventDefault();
      window.location.href = "instagram://user?username=" + username;
      
      setTimeout(() => {
        window.location.href = "https://www.instagram.com/" + username;
      }, 500);
    }
  };