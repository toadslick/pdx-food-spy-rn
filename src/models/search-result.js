export default class SearchResult {
  name         ;
  address      ;
  zip          ;
  distance     ;
  inspectionID ;
  restaurantID ;
  score        ;
  date         ;
  latitude     ;
  longitude    ;

  static fromJSON(object) {
    const result = new SearchResult();
    result.name         = object.name               ;
    result.address      = object.address.street     ;
    result.zip          = object.address.zip        ;
    result.distance     = object.distance           ;
    result.inspectionID = object.inspection_number  ;
    result.restaurantID = object.restaurant_id      ;
    result.score        = object.score              ;
    result.date         = new Date(object.date)     ;
    result.latitude     = object.location.Latitude  ;
    result.longitude    = object.location.Longitude ;
    return result;
  }
}
