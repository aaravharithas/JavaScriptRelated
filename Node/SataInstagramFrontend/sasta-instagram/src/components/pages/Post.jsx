import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "./UI/Topbar";
import Footer from "./UI/Footer";

function Post() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // For preview
  const [imageFile, setImageFile] = useState(null); // For actual file upload
  const [loading, setLoading] = useState(false); // For loading state

  // Handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview
      setImageFile(file); // Actual file
    }
  };

  // Handle post submission
  const handlePost = async () => {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to post.");
      return;
    }

    const formData = new FormData();
    formData.append("imagefile", imageFile); // Append actual file

    try {
      setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_API_BASEURL+"createpost",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // alert("Post uploaded successfully!");
        navigate("/feed");
      } else {
        alert("Failed to upload the post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error uploading post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel post creation
  const handleCancel = () => {
    setImage(null);
    setImageFile(null);
    navigate("/feed");
  };

  return (
    <>
      <Topbar />
      <PostContainer>
        <ContentWrapper>
          <PostSection>
            <UploadTitle>Upload Your Post</UploadTitle>
            <UploadArea>
              {image ? (
                <UploadedImage src={image} alt="Uploaded" />
              ) : (
                <UploadButton>
                  <span>Click to Upload Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </UploadButton>
              )}
            </UploadArea>
            {image && (
              <>
                <PostButton onClick={handlePost} disabled={loading}>
                  {loading ? "Posting..." : "Post"}
                </PostButton>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
              </>
            )}
          </PostSection>
        </ContentWrapper>
      </PostContainer>
      <Footer />
    </>
  );
}

/* ===== Styled Components ===== */
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 50px 0;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 600px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const UploadTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const UploadArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;

  input[type="file"] {
    display: none;
  }
`;

const UploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  input[type="file"] {
    display: none;
  }

  span {
    color: #333;
  }

  &:hover {
    color: #666;
  }
`;

const UploadedImage = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const PostButton = styled.button`
  background-color: #3897f0;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #2e81c3;
  }

  &:disabled {
    background-color: #b0d0f4;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #e1e1e1;
  color: #333;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #ccc;
  }
`;

export default Post;
