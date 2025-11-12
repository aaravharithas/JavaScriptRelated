import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Topbar from "../pages/UI/Topbar"; // Import Topbar here
import Footer from "./UI/Footer";
import { useNavigate } from "react-router-dom";

function Account() {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show loading spinner or message

  // Function to fetch user data
  const fetchUser = async (token) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASEURL + "user/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setUser(response.data); // Successfully fetched user data
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Function to fetch posts data
  const fetchPosts = async (token) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASEURL + "", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      // Filter posts based on user._id after fetching user data
      const filteredPosts = response.data.posts.filter((el)=>{return el.userid === user._id});
      setPosts(filteredPosts); // Set filtered posts to state
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Once the posts are fetched, set loading to false
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (token) {
      fetchUser(token); // Fetch user data first
    } else {
      alert("Please log in first.");
      setLoading(false); // Stop loading
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      fetchPosts(token); // Fetch posts only after user data is set
    }
  }, [user]); // This effect runs whenever `user` state changes

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <>
      <Topbar /> {/* Use the Topbar component here */}
      <AccountContainer>
        <ProfileSection>
          <ProfilePicture
            src={user?.profilePicture || "https://picsum.photos/150/150?random=1"}
            alt="profile"
          />
          <ProfileInfo>
            <ProfileName>{user?.name}</ProfileName>
            <ProfileUsername>@{user?.username}</ProfileUsername>
          </ProfileInfo>
        </ProfileSection>

        <PostsGrid>
          {posts.map((post) => (
            <PostWrapper onClick={()=>{navigate(`/post/${post._id}`)}} key={post._id}>
              <PostImage src={post.imageurl} alt={`post-${post._id}`} />
              <PostCaption>{post.context}</PostCaption>
            </PostWrapper>
          ))}
        </PostsGrid>
      </AccountContainer>
      <Footer />
    </>
  );
}

/* ===== Styled Components ===== */

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 90%;
  padding-left: 20px;
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileName = styled.span`
  font-weight: bold;
  font-size: 22px;
`;

const ProfileUsername = styled.span`
  font-weight: 300;
  font-size: 16px;
  color: gray;
`;

const PostsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1000px;
`;

const PostWrapper = styled.div`
  width: 33.33%;
  padding: 2px;
  box-sizing: border-box;
`;

const PostImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
`;

const PostCaption = styled.div`
  font-size: 14px;
  padding: 5px 0;
  text-align: center;
  color: #333;
`;

export default Account;
