import React from 'react'
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

const ImageView = (props) => {
  switch (props.active) {
    case 1:
      return (
        <div className='photoContainer'>
          <div className='photo'>
            <p> You </p>
            <img src={props.importEdited} alt="pre edit pics" style={props.getImageStyle(props.currentOptions)} />
          </div>
          <div className='photo'>
            <p> Target </p>
            <img src={props.importEdited} alt="edited pics" style={props.getImageStyle(props.editedOptions)} />
          </div>
        </div>
      )
    case 2:
      return (
        <div style={{ width: '75%', height: '75%', flexGrow: 1 }}>
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
      )
    default:
      return (
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
      )
  }
}

export default ImageView