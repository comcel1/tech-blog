async function newFormHandler(event) {
  event.preventDefault();

  const title = document.getElementById('post-title').value;
  const post_text = document.getElementById('post-body').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
