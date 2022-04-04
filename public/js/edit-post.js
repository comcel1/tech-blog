const updateBtn = document.getElementById('update-button');
const deleteBtn = document.getElementById('delete-button');

const updatePost = async () => {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const title = document.getElementById('post-title').value.trim();
  const post_text = document.getElementById('post-body').value.trim();

  if (title && post_text) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, post_text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const deletePost = async () => {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    window.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

updateBtn.addEventListener('click', updatePost);
deleteBtn.addEventListener('click', deletePost);
