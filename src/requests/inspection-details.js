import APIRequest from './api-request';
import InspectionViolation from '../models/inspection-violation';
import mockResponse from '../mocks/inspection-details';
import CONFIG from '../config';

export default class InspectionDetailsRequest extends APIRequest {
  mock = mockResponse;

  buildURL(inspectionID) {
    return `${CONFIG.apiRootURL}inspection/${inspectionID}`;
  }

  deserialize(object) {
    return object.violations.map(InspectionViolation.fromJSON);
  }

  // Exclude any violations for which the law code or violation text is blank.
  // While grouped under "violations", these entries represent
  // generally uninteresting, or actually blank violations.
  postflight(violations) {
    return violations.filter(function(v) {
      return v.lawCode && v.violationText;
    });
  }
}
