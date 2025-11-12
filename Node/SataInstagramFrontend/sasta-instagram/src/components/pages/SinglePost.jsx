import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "../pages/UI/Topbar";
import Footer from "./UI/Footer";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate(); // For redirect after deletion
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [userRes, usersRes, postsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_BASEURL + "user/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(import.meta.env.VITE_API_BASEURL + "user/"),
          axios.get(import.meta.env.VITE_API_BASEURL + "", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCurrentUser(userRes.data);
        setUsers(Array.isArray(usersRes.data.data) ? usersRes.data.data : []);

        const matchedPost = postsRes.data.posts.find((p) => p._id === id);
        setPost(matchedPost || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  const postOwner = users.find((u) => u._id === post.userid);
  const ownerName = postOwner ? postOwner.username : "Unknown User";

  const isOwner =
    currentUser &&
    post.userid &&
    currentUser._id.toString() === post.userid.toString();

  // ✅ Delete handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_BASEURL}post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Post deleted successfully!");
      navigate("/feed"); // Redirect to feed after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  return (
    <PageWrapper>
      <Topbar />
      <ContentWrapper>
        <PostWrapper>
          <PostHeader>
            <Username>{ownerName}</Username>
            {isOwner && <DeleteButton onClick={handleDelete}>Delete</DeleteButton>}
          </PostHeader>
          <PostImage src={post.imageurl} alt={post.context || "Post"} />
          {post.context && <PostCaption>{post.context}</PostCaption>}
        </PostWrapper>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
}

/* ===== Styled Components ===== */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0;
`;

const PostWrapper = styled.div`
  width: 500px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
`;

const PostCaption = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;
