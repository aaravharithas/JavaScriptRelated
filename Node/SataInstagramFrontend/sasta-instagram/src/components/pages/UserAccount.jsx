import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Topbar from "../pages/UI/Topbar"; // Import Topbar here
import Footer from "./UI/Footer";
import { useNavigate, useParams } from "react-router-dom"; // To get the user ID from URL

function Account() {
  let navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASEURL+"user/");
      const matchedUser = response.data.data.find((user) => user._id === id); // Access users inside "data"
      setUser(matchedUser); // Set the user data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all posts
  const fetchPosts = async (token) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASEURL+"", {
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
    fetchUsers(); // Fetch all users to find the matched user by ID
  }, [id]); // Run the effect when the user ID changes

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (user) {
      fetchPosts(token); // Fetch posts only after the user data is set
    }
  }, [user]); // This effect runs whenever `user` state changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (!user) {
    return <div>User not found</div>; // If no user is found
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
          {posts.length === 0 ? (
            <NoPostsMessage>This user has no posts.</NoPostsMessage>
          ) : (
            posts.map((post) => (
              <PostWrapper key={post._id}>
                <PostImage onClick={()=>{navigate(`/post/${post._id}`)}} src={post.imageurl} alt={`post-${post._id}`} />
                <PostCaption>{post.context}</PostCaption>
              </PostWrapper>
            ))
          )}
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

const NoPostsMessage = styled.div`
  font-size: 18px;
  color: #555;
  text-align: center;
  width: 100%;
`;

export default Account;
