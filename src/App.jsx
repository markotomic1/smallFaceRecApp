import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    const getImg = () => {
      if (file) {
        let img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          setImage({ url: img.src, width: img.width, height: img.height });
        };
        //console.log(file);
      }
    };
    getImg();
  }, [file]);
  //console.log(image);
  return (
    <div>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className='newPostCard'>
          <div className='addPost'>
            <img
              src='https://images.pexels.com/photos/9371782/pexels-photo-9371782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='avatar'
            />
            <form action='' className='postForm'>
              <input
                type='text'
                placeholder='Whats on your mind?'
                className='postInput'
              />
              <label htmlFor='file'>
                <img
                  className='addImg'
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhwYXhthtvmhQq0DYW1RVx3el_Q1bVF4E4Q&usqp=CAU'
                  alt=''
                />
                <img
                  className='addImg'
                  src='https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg'
                  alt=''
                />
                <img
                  className='addImg'
                  src='https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg'
                  alt=''
                />
                <button>Send</button>
              </label>
              <input
                id='file'
                type='file'
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
