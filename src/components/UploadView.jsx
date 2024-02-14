import Reac, { useState } from 'react'
import FirebaseUpload from './FirebaseUpload'
import InfoModal from './InfoModal'
import PhotoCreation from './PhotoCreation'

const UploadView = ({ token, userId }) => {
  const [photoUrl, setPhotoUrl] = useState("https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/selfUploadedImages%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NWM2ODQyYTk5YzhiZTNhMTc3OGNhNGMiLCJpYXQiOjE3MDc1MDg3NzkzNDB9.AAFbUj49GaxuytZ_c845fo749BSgvIci8sIZQ5khbjE%2F99243A94-704B-4036-A69C-4D9D791FBDBD.JPG57175079-348e-4738-8ad6-635879600b18?alt=media&token=d32f9f49-8a55-4ffc-88d2-fb5353f0bc4c")

  return (
    <div>
      <FirebaseUpload token={token} photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
      <PhotoCreation photoUrl={photoUrl} userId={userId} />
    </div>
  )
}

export default UploadView