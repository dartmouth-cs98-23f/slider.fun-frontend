import React, { useState } from 'react';
import { IconDots } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { reportPhoto, setReportPhotoVis } from '../actions/photoListAction';


const Dropdown = ({ photoId, closeModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const signedInUserId = useSelector(state => state.user.info.id);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleReportClick = () => {
    dispatch(reportPhoto(photoId, signedInUserId));
    closeModal();
    dispatch(setReportPhotoVis(true));
    setIsOpen(!isOpen);
  }

  return (
    <div style={{ position: 'relative' }}>
      <IconDots className="hoverPointer" onClick={handleClick} />
      {isOpen && (
        <ul id="reportUl">
          <li id="reportLi" onClick={handleReportClick} >Report</li>
        </ul>
      )
      }
    </div >
  );
};

export default Dropdown;
