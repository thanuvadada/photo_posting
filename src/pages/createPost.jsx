import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await axios.post("http://localhost:3000/create-post", formData);

      alert("Post created!");
      navigate("/feed"); 

    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <section className="create-post-section">
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* 👁️ Image Preview */}
        {preview && (
          <img 
            src={preview} 
            alt="preview" 
            style={{ width: "200px", borderRadius: "10px" }}
          />
        )}

        <input
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button type="submit">Create Post</button>
      </form>
    </section>
  );
};

export default CreatePost;