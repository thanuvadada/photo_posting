import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000/posts");
    setPosts(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/post/${id}`);
      setPosts(posts.filter((p) => p._id !== id)); // remove from UI
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="feed-section">
      <h1>Feed</h1>

      <div className="feed-container">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <img src={post.image} alt="post" />
            <p>{post.caption}</p>

            {/* 🗑 Delete Button */}
            <button onClick={() => handleDelete(post._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feed;