

import { defaultSlider } from '../components/Slider'
import bruh from '../assets/Chai000724-R2-077-37.jpg';

const DEFAULT_OPTIONS = defaultSlider

export const getRBG = (pictureFile, filters = false) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = pictureFile;
    const gridAverageRgbValues = [];

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      // Set the canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      if (filters) {
        ctx.filter = filters
      }

      ctx.drawImage(img, 0, 0);

      const gridSize = 10;
      const cellWidth = img.width / gridSize;
      const cellHeight = img.height / gridSize;

      // Loop through each cell in the grid
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          // Calculate the average RGB values for the current cell
          const startX = x * cellWidth;
          const startY = y * cellHeight;
          const pixelData = ctx.getImageData(startX, startY, cellWidth, cellHeight).data;

          let totalRed = 0;
          let totalGreen = 0;
          let totalBlue = 0;

          for (let i = 0; i < pixelData.length; i += 4) {
            totalRed += pixelData[i];
            totalGreen += pixelData[i + 1];
            totalBlue += pixelData[i + 2];
          }

          const cellSize = cellWidth * cellHeight;
          const averageRed = Math.round(totalRed / cellSize);
          const averageGreen = Math.round(totalGreen / cellSize);
          const averageBlue = Math.round(totalBlue / cellSize);

          // Store the average RGB values in the array
          gridAverageRgbValues.push({ x, y, averageRed, averageGreen, averageBlue });

        }
      }

      resolve(gridAverageRgbValues);

    };


    img.onerror = function (err) {
      reject(new Error("Image loading error"));
    };
    return (gridAverageRgbValues)
  });
}

export const compareTwoPhotos = async (pic, editedFilter, goalFilter1) => {
  const pic1RGB = await getRBG(pic, goalFilter1);
  const pic2RGB = await getRBG(pic, editedFilter);

  if (pic1RGB.length !== pic2RGB.length) {
    throw new Error('Image dimensions do not match.');
  }

  let redSum = 0, greenSum = 0, blueSum = 0;
  // for loop to calculate the differences for each color
  for (let i = 0; i < pic1RGB.length; i++) {
    redSum += Math.pow(pic1RGB[i].averageRed - pic2RGB[i].averageRed, 2);
    greenSum += Math.pow(pic1RGB[i].averageGreen - pic2RGB[i].averageGreen, 2);
    blueSum += Math.pow(pic1RGB[i].averageBlue - pic2RGB[i].averageBlue, 2);
  }

  // calculate the RMSE for each color
  const redRMSE = Math.sqrt(redSum / pic1RGB.length);
  const greenRMSE = Math.sqrt(greenSum / pic1RGB.length);
  const blueRMSE = Math.sqrt(blueSum / pic1RGB.length);

  const totalRMSE = (redRMSE + greenRMSE + blueRMSE) / 3;

  // console.log('RMSE - Red:', redRMSE, 'Green:', greenRMSE, 'Blue:', blueRMSE);
  // console.log('Total RMSE:', totalRMSE);
  return totalRMSE;
}

// helper function to convert filter objects to string for css purposes. 
export const getImageStyle = (state) => {
  const filters = state.map(option => {
    return `${option.property}(${option.value}${option.unit})`
  })
  return { filter: filters.join(' ') }
}


export const handleScoreProcessing = async (filter1, filter2) => {

  let photoScore = (await compareTwoPhotos(bruh, filter1, filter2))
  let calcPercentScore = 100 - (Math.round(photoScore))

  return calcPercentScore
}