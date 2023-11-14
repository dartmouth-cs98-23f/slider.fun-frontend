// confettiFunction.js
import confetti from 'canvas-confetti';

var scalar = 2;

const makeConfetti = () => {
  confetti({ spread: 200, scalar });
};

export default makeConfetti;
