import { produce } from 'immer';
import { ActionTypes } from '../actions/photoListAction';

const initialState = [
  {
    "_id": "65495d668d1d5c2fa933c23a",
    "photoProperties": [
      {
        "range": {
          "min": 0,
          "max": 200
        },
        "name": "Brightness",
        "property": "brightness",
        "value": 75,
        "unit": "%",
        "status": true,
        "_id": "654feac4663946fee35a1601",
        "id": "654feac4663946fee35a1601"
      },
      {
        "range": {
          "min": 0,
          "max": 200
        },
        "name": "Contrast",
        "property": "contrast",
        "value": 110,
        "unit": "%",
        "status": true,
        "_id": "654feac4663946fee35a1602",
        "id": "654feac4663946fee35a1602"
      },
      {
        "range": {
          "min": 0,
          "max": 200
        },
        "name": "Saturation",
        "property": "saturate",
        "value": 100,
        "unit": "%",
        "status": true,
        "_id": "654feac4663946fee35a1603",
        "id": "654feac4663946fee35a1603"
      },
      {
        "range": {
          "min": 0,
          "max": 100
        },
        "name": "Grayscale",
        "property": "grayscale",
        "value": 0,
        "unit": "%",
        "status": false,
        "_id": "654feac4663946fee35a1604",
        "id": "654feac4663946fee35a1604"
      },
      {
        "range": {
          "min": 0,
          "max": 100
        },
        "name": "Sepia",
        "property": "sepia",
        "value": 0,
        "unit": "%",
        "status": false,
        "_id": "654feac4663946fee35a1605",
        "id": "654feac4663946fee35a1605"
      },
      {
        "range": {
          "min": 0,
          "max": 360
        },
        "name": "Hue Rotate",
        "property": "hue-rotate",
        "value": 0,
        "unit": "deg",
        "status": false,
        "_id": "654feac4663946fee35a1606",
        "id": "654feac4663946fee35a1606"
      },
      {
        "range": {
          "min": 0,
          "max": 20
        },
        "name": "Blur",
        "property": "blur",
        "value": 0,
        "unit": "px",
        "status": false,
        "_id": "654feac4663946fee35a1607",
        "id": "654feac4663946fee35a1607"
      }
    ],
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/images%2Fbrightness.jpg?alt=media&token=f716b679-5d21-431e-814d-1e8a2e37bffa",
    "__v": 0,
    "likedBy": [],
    "title": "Scenic Lake View",
    "validated": true,
    "authorId": "659c632ef231e589f645996f",
    "id": "65495d668d1d5c2fa933c23a"
  }
]

const photoListReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PHOTOLIST_SUCCESS:
      return action.payload;
    case ActionTypes.REMOVE_PHOTO:
      // Assuming action.payload is the id of the photo to be removed
      const index = draftState.findIndex(photo => photo.id === action.payload);
      if (index !== -1) draftState.splice(index, 1);
      break;
    case ActionTypes.LIKE_PHOTO:
      break;
    default:
      // In the default case, we don't need to modify the draftState
      return draftState;
  }
}, initialState);

export default photoListReducer;