import Gradient from 'linear-gradient';
import config from '../config';

const { minimumScore, maximumScore } = config;

const gradient = new Gradient([
  [237,  68, 45],
  [239, 114, 48],
  [ 91, 173, 12],
  [ 61, 130,  5],
]);

// Return the hex color for a given score number,
// as a percent of the distance across a gradient of colors.
export default function scoreColor(score) {
  const normalScore = Math.max(minimumScore, Math.min(maximumScore, score));
  const percent = (normalScore - minimumScore) / (maximumScore - minimumScore);
  return gradient.calcHex(percent);
};
