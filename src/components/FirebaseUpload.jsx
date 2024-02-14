import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const FirebaseUpload = ({ token, setPhotoUrl }) => {
  // contains the image metadata 
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, `selfUploadedImages/${token}`);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `selfUploadedImages/${token}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        if (!imageUrls.includes(url)) {
          setImageUrls((prev) => [...prev, url]);
        }
      })
      .catch((error) => console.error('Error uploading file:', error));
  };


  // runs once when the component mounts and fetches all image URLs from the storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAll(imagesListRef);
        const urls = await Promise.all(response.items.map((item) => getDownloadURL(item)));

        // Filter out duplicates before updating the state
        setImageUrls((prev) => [...new Set([...prev, ...urls])]);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const photoStyle = {
    height: "50px",
  }


  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      <p> Your uploaded photos </p>
      <div>
        {imageUrls.map((url, index) => (
          <img style={photoStyle} key={index} src={url} alt={`${index}`} onClick={() => setPhotoUrl(url)} />
        ))}
      </div>
    </div>
  );
};

export default FirebaseUpload;