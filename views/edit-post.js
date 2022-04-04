{{> header headline='The Tech Blog'}}

<article class="box post update-post">
  <div class="post-heading">
    <div class="title">Edit Post</div>
  </div>
  <div class="update-wrapper">
    <div>
      <label for="edit-post-title">Title</label>
      <input
        type="text"
        name="edit-post-title"
        id="edit-post-title"
        value="{{post.title}}"
      />
    </div>
    <div>
      <label for="edit-post-body">Content</label>
      <textarea
        name="edit-post-body"
        class="comment-textarea update-post-textarea"
        id="edit-post-body"
      >{{post.post_text}}</textarea>
    </div>
    <button class="update-post-btn" id="update-btn">Update</button>
    <button class="update-post-btn" id="delete-btn">Delete</button>
  </div>
</article>


    {{> comments post.comments }}

<script src="/js/edit-post.js"></script>
<script src="/js/delete-post.js"></script>
<script src="/js/comment.js"></script>