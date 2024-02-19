import React, { useState, useEffect } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

const containerStyle = {
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '0px',
};

const photoContainerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '800px',
  height: 'auto',
};

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
                }}
              />

            </div>
            <div className='photo'>
              <p> Edit </p>
              <img
                src={props.importEdited}
                alt="edited pics"
                style={{
                  ...props.getImageStyle(props.editedOptions),
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
        <div style={{ ...containerStyle, flexGrow: 1 }}>
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