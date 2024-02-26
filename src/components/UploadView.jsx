import React, { useState, useEffect } from 'react'
import FirebaseUpload from './FirebaseUpload'
import HoverMessage from './HoverMessage'
import PhotoModal from './PhotoModal'

const UploadView = ({ token, userInfo }) => {
  const [photoUrl, setPhotoUrl] = useState("https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/selfUploadedImages%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NWM2ODQyYTk5YzhiZTNhMTc3OGNhNGMiLCJpYXQiOjE3MDc1MDg3NzkzNDB9.AAFbUj49GaxuytZ_c845fo749BSgvIci8sIZQ5khbjE%2F99243A94-704B-4036-A69C-4D9D791FBDBD.JPG57175079-348e-4738-8ad6-635879600b18?alt=media&token=d32f9f49-8a55-4ffc-88d2-fb5353f0bc4c")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [messageVisability, setMessageVisability] = useState(false)

  useEffect(() => {
    // wait for 2 seconds before hiding the message
    const timer = setTimeout(() => {
      setMessageVisability(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [messageVisability]);

  const closeModal = () => {
    setIsModalVisible(false)
  };

  const openModal = () => {
    setIsModalVisible(true)
  }

  return (
    <div className='uploadViewContainer'>
      <HoverMessage message={"Uploaded successfully! Check it out in the gallery tab!"} messageVisability={messageVisability} />
      <FirebaseUpload token={token} photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} openModal={openModal} />
      {/* <InfoModal isModalVisible="true" /> */}
      <PhotoModal isModalVisible={isModalVisible} photoUrl={photoUrl} userId={userInfo.id} closeModal={closeModal} setMessageVisability={setMessageVisability} />
      {/* <PhotoCreation photoUrl={photoUrl} userId={userId} /> */}
    </div>
  )
}

export default UploadView