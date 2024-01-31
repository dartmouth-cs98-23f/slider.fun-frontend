import React from 'react';
import { useState, useEffect } from 'react';
import { storage } from '../firebase';
// import "../styles/profile.scss";

////////////////////////////////////////////////////////////////////////////////
// Start of Firebase stuff
////////////////////////////////////////////////////////////////////////////////
// ref references the location to upload image
// uploadBytes funtion uploads photo
// listAll retruns all the files in a given path
// gets URL from downloaded items
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
// v4 generates random string of characters
import { v4 } from 'uuid';

const Profile = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "selfUploadedImages/");

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `selfUploadedImages/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    ////////////////////////////////////////////////////////////////////////////////
    // End of Firebase stuff
    ////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////
    // Start of addung UI components to the profile page
    ////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="App">
        <input
            type="file"
            onChange={(event) => {
                setImageUpload(event.target.files[0]);
            }}
            />
        <button onClick={uploadFile}> Upload Image</button>
        {imageUrls.map((url) => {
            return <img src={url} />;
        })}
        </div>
    );
};

export default Profile;