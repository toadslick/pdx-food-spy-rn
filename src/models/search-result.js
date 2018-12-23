import moment from 'moment';
import config from '../config';
import scoreColor from '../utils/score-color';

export default class SearchResult {
  name         ;
  address      ;
  zip          ;
  distance     ;
  inspectionID ;
  restaurantID ;
  score = 0    ;
  moment       ;
  latitude     ;
  longitude    ;
  type         ;

  static fromJSON(object) {
    const result = new SearchResult();
    result.name         = object.name;
    result.address      = object.address.street;
    result.zip          = object.address.zip;
    result.inspectionID = object.inspection_number;
    result.restaurantID = object.restaurant_id;
    result.type         = object.type;
    result.score        = parseInt(object.score);
    result.latitude     = parseFloat(object.location.Latitude);
    result.longitude    = parseFloat(object.location.Longitude);
    result.distance     = parseFloat(object.distance);
    result.moment       = moment(object.date);
    return result;
  }

  get scoreColor() {
    return scoreColor(this.score);
  }

  get scorePercent() {
    const { maximumScore, minimumScore } = config;
    return ((this.score - minimumScore) / (maximumScore - minimumScore)) * 100;
  }

  // Required by React Native for objects used in list views or iterators.
  get key() {
    return this.inspectionID;
  }
}
