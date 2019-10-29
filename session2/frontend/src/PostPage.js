import React from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`)
      .then(res => res.json())
      .then(p => {
        setPost(p);
      });
  }, []);

  if (post === null) {
    return <div>Loading post...</div>;
  }

  if (post.error) {
    return <div>Error: {post.error}</div>;
  }

  return (
    <div>
      <h1>This is the post page</h1>

      <div style={{ background: "lightblue", borderBottom: "1px solid lightgrey", padding: 40 }}>
        {post.title}
        <br />
        <small>
          {post.author} &middot; {post.points} points
        </small>
      </div>

      <ul>
        {post.comments.map(c => (
          <li>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostPage;
