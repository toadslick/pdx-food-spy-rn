import moment from 'moment';

export default class SearchResult {
  name         ;
  address      ;
  zip          ;
  distance     ;
  inspectionID ;
  restaurantID ;
  score        ;
  moment       ;
  latitude     ;
  longitude    ;
  type         ;
  key          ; // Required by React Native for rendering list views.

  static fromJSON(object) {
    const result = new SearchResult();
    result.name         = object.name               ;
    result.address      = object.address.street     ;
    result.zip          = object.address.zip        ;
    result.distance     = object.distance           ;
    result.inspectionID = object.inspection_number  ;
    result.restaurantID = object.restaurant_id      ;
    result.score        = object.score              ;
    result.latitude     = object.location.Latitude  ;
    result.longitude    = object.location.Longitude ;
    result.type         = object.type               ;
    result.moment       = moment(object.date)       ;
    result.key          = object.inspection_number  ;
    return result;
  }
}
