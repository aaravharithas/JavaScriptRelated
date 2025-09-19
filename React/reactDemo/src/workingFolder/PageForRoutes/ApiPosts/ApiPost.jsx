import { useEffect, useState } from "react";

function ApiPost() {

  let [title, setTitle] = useState([]);
  let [formData, setFormData] = useState({ title: "" });
  let url = "https://jsonplaceholder.typicode.com/posts?limit=500";

  function fetchdata() {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data)
        setTitle(data);
      })
      .catch(() => {
        console.log("got error while fetching Products api");
      });
  }

  useEffect(() => {
    fetchdata();
  }, []);

  function handlechange(e) {
    let { name, value } = e.target;
    setFormData(() => ({ [name]: value }));
  }

  function handleSubmit(e){
    e.preventDefault()
    setFormData({title:"",})
  }

  return (
    <>
    <h1>Titles Page</h1>
      {title && (
        <>
          {/* search form */}
          <form  onSubmit={handleSubmit}>
            <label htmlFor="title" style={{fontWeight:"bolder"}}>Search Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handlechange}
              style={{margin:"0.25rem",height:"1.5rem"}}
            />
            {/* <input type="submit" style={{margin:"0.5rem"}}/> */}
            <button type="submit" style={{margin:"0.5rem",fontSize:"0.75rem",fontWeight:"bold"}}>Reset</button>
          </form>
          {/* search form ends here */}
          <h2>Total Titles : {title.filter((el)=>el.title.includes(formData.title)).length}</h2>
          <div
            style={{
              padding: "1rem",
              margin: "1rem",
              borderRadius: "2rem",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {title.filter((el)=>el.title.includes(formData.title)).map((el, index) => (
              <h2 key={index}>{el.title}</h2>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ApiPost;
