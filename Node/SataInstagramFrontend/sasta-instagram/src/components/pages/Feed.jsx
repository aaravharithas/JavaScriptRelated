import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import Footer from "./UI/Footer";
import axios from "axios";

export default function Feed() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]); // State to hold the posts
  const [users, setUsers] = useState([]); // State to hold the users
  const [loading, setLoading] = useState(true); // Loading state to show loading spinner or message

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASEURL + "", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token in the Authorization header
        },
      });
      setPosts(response.data.posts); // Assuming the response contains a "posts" array
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASEURL + "user/");
      
      // Check if response.data is an array
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data); // Assuming response.data contains an array of users under 'data'
      } else {
        console.error("Expected an array of users, but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Creating an async function inside useEffect and calling it immediately
    const fetchData = async () => {
      await fetchPosts();
      await fetchUsers();
      setLoading(false); // Stop loading once the data is fetched
    };
    
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner while fetching data
  }

  // Function to get the username based on userId from post
  const getUsername = (userId) => {
    // Ensure users is an array before calling .find
    if (Array.isArray(users)) {
      const user = users.find((user) => user._id === userId);
      return user ? user.username : "Unknown User"; // Default to "Unknown User" if no match is found
    } else {
      console.error("Users is not an array:", users);
      return "Unknown User";
    }
  };

  return (
    <>
      {/* Topbar */}
      <TopbarContainer>
        <div className="TopbarLeft">
          <Link to="/feed" style={{ textDecoration: "none" }}>
            <span className="Logo">Sasta Instagram</span>
          </Link>
        </div>
        <div className="TopbarCenter">
          <div className="Searchbar">
            <AiOutlineSearchStyled />
            <input type="text" className="SearchInput" placeholder="Search" />
          </div>
        </div>
        <div className="TopbarRight">
          <div className="TopbarIcons">
            <div className="TopbarIconItem">
              <FiSearchStyled />
            </div>
            <div className="TopbarIconItem">
              <BsPlusSquareStyled onClick={() => { navigate("/post"); }} />
            </div>
            <img onClick={() => { navigate("/account"); }} className="TopbarImg" alt="" src="https://picsum.photos/500/500?random=2" />
          </div>
        </div>
      </TopbarContainer>

      {/* Home Container */}
      <HomeContainer>
        <FeedContainer>
          {[...posts].reverse().map((post) => (
            <Post key={post._id}> {/* Assuming post._id is unique */}
              <PostHeader>
                <Username onClick={()=>{navigate(`/account/${post.userid}`)}}>{getUsername(post.userid)}</Username> {/* Get the username by matching post's userId */}
              </PostHeader>
              <PostImage onClick={()=>{navigate(`/post/${post._id}`)}} src={post.imageurl} alt={post.context} /> {/* Assuming imageurl contains the post image */}
              {post.context && <PostCaption>{post.context}</PostCaption>} {/* Show caption if exists */}
            </Post>
          ))}
        </FeedContainer>
      </HomeContainer>

      {/* Footer */}
      <Footer />
    </>
  );
}

/* --- Styled Components --- */

/* Topbar */
const FiSearchStyled = styled(FiSearch)`
  font-size: 20px;
  margin-right: 10px;
  display: none;
  @media (max-width: 655px) {
    display: block;
  }
`;
const BsPlusSquareStyled = styled(BsPlusSquare)`
  font-size: 20px;
  margin-right: 10px;
`;
const AiOutlineSearchStyled = styled(AiOutlineSearch)`
  font-size: 20px !important;
  margin-left: 10px;
`;
const TopbarContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  justify-content: center;
  border-bottom: 1px solid gray;

  .TopbarLeft {
    padding-right: 130px;
    display: flex;
    @media (max-width: 655px) {
      padding-right: 0px;
    }
  }
  .TopbarCenter {
    display: flex;
    width: 400px;
    justify-content: center;
    margin: 0 20px;
  }
  .Searchbar {
    width: 100%;
    height: 30px;
    background-color: rgb(218, 218, 218);
    border-radius: 10px;
    display: flex;
    align-items: center;
    @media (max-width: 655px) {
      display: none;
    }
  }
  .SearchInput {
    border: none;
    width: 70%;
    background-color: rgb(218, 218, 218);
    &:focus {
      outline: none;
    }
  }
  .TopbarRight {
    margin-right: 10px;
    padding-left: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 655px) {
      padding-left: 0px;
    }
  }
  .TopbarIcons {
    display: flex;
    position: relative;
  }
  .TopbarIconItem {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .TopbarImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  .Logo {
    font-size: 32px;
    padding: 0 20px;
    font-weight: bold;
    color: black;
    cursor: pointer;
    font-family: "Dancing Script", cursive;

    /* Mobile view */
    @media (max-width: 655px) {
      font-size: 20px;
      padding: 0 8px;
    }

    /* Tablet view */
    @media (min-width: 656px) and (max-width: 1024px) {
      font-size: 22px; /* slightly smaller for tablets */
      padding: 0 10px; /* adjust padding if needed */
    }
  }
`;

/* Home Container */
const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`;

/* Feed */
const FeedContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* Post */
const Post = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

/* Post Header */
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* Post Image */
const PostImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
`;

/* Post Caption */
const PostCaption = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

/* Username */
const Username = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;
