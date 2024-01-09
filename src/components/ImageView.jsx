import React from 'react'
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

const containerStyle = {
  width: '500px', // Set your desired width
  height: '300px', // Set your desired height
  margin: 'auto', // Center the container
  display: 'flex', // Ensure the contents are aligned properly
  justifyContent: 'center', // Center contents horizontally
  alignItems: 'center', // Center contents vertically
  marginTop: '20px',
};

const photoContainerStyle = {
  display: 'flex', // Use flexbox for layout
  alignItems: 'flex-start', // Align items to the start of the container (top)
  justifyContent: 'center', // Center items horizontally
};


// KASHAN VIEWS FIXS IT
const ImageView = (props) => {
  switch (props.active) {
    case 1:
      return (
        <div style={containerStyle}>
          <div className='photoContainer' style={photoContainerStyle}>
            <div className='photo'>
              <p> Current </p>
              <img 
                src={props.importEdited} 
                alt="pre edit pics" 
                style={{ 
                  ...props.getImageStyle(props.currentOptions), 
                  marginLeft: '10px' 
                }} 
              />

            </div>
            <div className='photo'>
              <p> Target </p>
              <img 
                src={props.importEdited} 
                alt="edited pics" 
                style={{ 
                  ...props.getImageStyle(props.editedOptions), 
                  marginLeft: '10px' 
                }} 
              />
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div style={{ ...containerStyle, flexGrow: 1 }}>
          <div className='comparisonContainer'>
          <ReactCompareSlider
            handle={
              <ReactCompareSliderHandle
                buttonStyle={{
                  backdropFilter: undefined,
                  WebkitBackdropFilter: undefined,
                  backgroundColor: '#E27272',
                  marginLeft: "-15px"
                }}
                linesStyle={{
                  opacity: 0
                }}
              />
            }
            itemOne={<ReactCompareSliderImage src={props.importEdited} alt="pre edit pics" style={props.getImageStyle(props.currentOptions)} />}
            itemTwo={<ReactCompareSliderImage src={props.importEdited} alt="edited pics" style={props.getImageStyle(props.editedOptions)} />}
          />
          </div>
        </div>
      );
    default:
      return (
        <div style={{...containerStyle, flexGrow: 1}}>
          <div className='comparisonContainer'>
            <ReactCompareSlider
              portrait
              handle={
                <ReactCompareSliderHandle
                  portrait
                  buttonStyle={{
                    backdropFilter: undefined,
                    WebkitBackdropFilter: undefined,
                    backgroundColor: '#E27272',
                    marginTop: "-15px"
                  }}
                  linesStyle={{
                    opacity: 0
                  }}
                />
              }
              itemOne={<ReactCompareSliderImage src={props.importEdited} alt="pre edit pics" style={props.getImageStyle(props.currentOptions)} />}
              itemTwo={<ReactCompareSliderImage src={props.importEdited} alt="edited pics" style={props.getImageStyle(props.editedOptions)} />}
            />
          </div>
        </div> 
      );
  }
}

export default ImageView