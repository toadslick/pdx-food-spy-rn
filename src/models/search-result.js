import moment from 'moment';

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
  key          ; // Used by RN for rendering objects in list views.

  static fromJSON(object) {
    const result = new SearchResult();
    result.name         = object.name               ;
    result.address      = object.address.street     ;
    result.zip          = object.address.zip        ;
    result.distance     = object.distance           ;
    result.inspectionID = object.inspection_number  ;
    result.restaurantID = object.restaurant_id      ;
    result.score        = parseInt(object.score)    ;
    result.latitude     = object.location.Latitude  ;
    result.longitude    = object.location.Longitude ;
    result.type         = object.type               ;
    result.moment       = moment(object.date)       ;
    result.key          = object.inspection_number  ;
    return result;
  }

  get scoreColor() {
    for (const [score, rgb] of scoreColorMap) {
      if (this.score >= score) {
        return `rgb(${rgb.join(',')})`;
      }
    }
  }
}

const scoreColorMap = [
  [95, [ 61.2, 130.1,  5.1]],
  [90, [ 91.8, 173.4, 12.8]],
  [85, [170.9, 214.2, 30.6]],
  [80, [249.9, 204.0, 51.0]],
  [75, [239.7, 114.8, 48.5]],
  [ 0, [237.2,  68.9, 45.9]],
];
