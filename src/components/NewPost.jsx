import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);

  const [friends, setFriends] = useState([]);
  const imgRef = useRef();
  const canvasRef = useRef();

  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(friends);
  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections.map((face) => Object.values(face.box)));
  };
  console.log(faces);
  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    faces.map((face) => ctx.strokeRect(...face));
  };
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((err) => console.log(err));
    };
    imgRef.current && loadModels();
  }, []);
  return (
    <div className='container'>
      <div className='left' style={{ width, height }}>
        <img ref={imgRef} src={url} alt='' crossOrigin='anonymous' />
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseEnter={enter}
        />
        {faces.map((face, i) => (
          <input
            name={`input${i}`}
            placeholder='tag a friend'
            key={i}
            className='friendInput'
            style={{ left: face[0], top: face[1] + face[3] + 5 }}
            onChange={addFriend}
          />
        ))}
      </div>
      <div className='right'>
        <h1>Share your post</h1>
        <input
          type='text'
          placeholder='Whats on your mind?'
          className='rightInput'
        />
        {friends && (
          <span className='friends'>
            with:
            <span className='name'>{Object.values(friends) + " "}</span>
          </span>
        )}
        <button className='rightButton'>Send</button>
      </div>
    </div>
  );
};

export default NewPost;
