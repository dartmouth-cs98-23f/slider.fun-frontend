import React from 'react';
import { useState, useEffect } from 'react';
import { storage } from '../firebase';
// ref references the location to upload image
// uploadBytes funtion uploads photo
// listAll retruns all the files in a given path
// gets URL from downloaded items
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
// v4 generates random string of characters
import { v4 } from 'uuid';

const Profile = () => {

    // connected to the 'choose file' input button
    const [imageUpload, setImageUpload] = useState(null)
    const [imageList, setImageList] = useState([]);
    
    // make a reference to all the images stored in the given path
    const imageListRef = ref(storage, "selfUploadedImages")

    // This functio is called when the 'Upload Image' button is clicked
    // This function pushes the image to firebase
    const uploadImage = () => {
        // no image was selected
        if (imageUpload == null) return;

        // upload image from webpage to firebase
        // param1: storage refers to the storage of the slider.fun application
        // param2: folder in firebase (images) followed by the name of the photo
        // note: image of the uploaded photo is given a random name
        const imageRef = ref(storage, `selfUploadedImages/$(imageUpload.name + v4()}`);
        // upload image to firebase
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            alert("Image successfully uploaded");
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
            })
        })
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            })
        })
    }, [])

    return (
        <div className="App">
            <input 
            type="file" 
            onChange={(event) => {
                setImageUpload(event.target.files[0]);
            }}/>
            <button onClick={uploadImage}>Upload Image</button>
            {imageList.map((url) => {
                return <img src={url} />
            })};
        </div>
    );
};

export default Profile;