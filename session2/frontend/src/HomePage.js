import React from "react";

function HomePage() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(p => {
        setPosts(p);
      });
  }, []);

  return (
    <div>
      {posts.map(p => {
        return (
          <div style={{ borderBottom: "1px solid lightgrey", padding: 40 }}>
            {p.title}
            <br />
            <small>
              {p.author} &middot; {p.points} points
            </small>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
