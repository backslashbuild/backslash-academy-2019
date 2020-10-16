import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/get-me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(u => {
          setCurrentUser(u);
        });
    }
  }, [token]);

  React.useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(p => {
        setPosts(p);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>This is the home page</h1>
      <p>Token: {token}</p>
      <p>Current user: {JSON.stringify(currentUser)}</p>
      <p>
        <button onClick={() => localStorage.removeItem("token")}>
          Log out.
        </button>
      </p>

      {loading && "loading...."}
      {posts.map(p => {
        return (
          <div style={{ borderBottom: "1px solid lightgrey", padding: 40 }}>
            <Link to={`/post/${p.id}`}>{p.title}</Link>
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
