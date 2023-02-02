import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

const index = () => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const cookie = Cookies.get("token");
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (cookie) {
      const decoded: any = jwtDecode(cookie);
      Cookies.set("username", decoded.username);
      setUser(decoded.username);
      setUserId(decoded.id);
    } else {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("username", user);
    const res = await fetch("http://localhost:8001/api/posts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      body: formData,
    });
    if (res.ok) {
      alert("Post created");
    } else {
      alert("An error occured, please try again");
    }
  };
  return (
    <form
      name="form"
      encType="multipart/form-data"
      className="btm-nav justify-between flex"
      id="form"
      onSubmit={handleSubmit}
    >
      <div className="input-group bg-cyan-700 flex flex-row rounded">
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e: any) => setImage(e.target.files[0])}
          className="flex justify-center items-center bg-cyan-700 rounded-btn p-3 max-w-[250px] cursor-pointer"
          multiple={false}
          accept="image/*"
        />
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's on your mind?"
          className="flex-1 bg-cyan-700 rounded-btn p-3 placeholder:text-white focus:outline-white"
        />
      </div>
      <button
        type="submit"
        className="bg-primary rounded-btn p-3 w-32 text-center flex-1 min-w-[70px] flex items-center justify-center italic font-semibold hover:bg-gray-800 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:ring-opacity-50 focus:ring"
      >
        Post
      </button>
    </form>
  );
};

export default index;
