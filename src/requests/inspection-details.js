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
}
