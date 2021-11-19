// form handler to like a park when clicking like button
async function likeClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/comments/like', {
      method: 'PUT',
      body: JSON.stringify({
        comment_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#like-btn').addEventListener('click', likeClickHandler);