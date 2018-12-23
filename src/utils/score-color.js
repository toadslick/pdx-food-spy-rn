import Gradient from 'linear-gradient';
import config from '../config';

const { minimumScore, maximumScore } = config;

const gradient = new Gradient([
  [237,  68, 45],
  [239, 114, 48],
  [249, 204, 51],
  [170, 214, 30],
  [ 91, 173, 12],
  [ 61, 130,  5],
]);

export default function scoreColor(score) {
  const normalScore = Math.max(minimumScore, Math.min(maximumScore, score));
  const percent = (normalScore - minimumScore) / (maximumScore - minimumScore);
  console.log(normalScore, percent, gradient.calcHex(percent));
  return gradient.calcHex(percent);
};
