import APIRequest from './api-request';
import InspectionViolation from '../models/inspection-violation';
import mockResponse from '../mocks/inspection-details';

export default class InspectionDetailsRequest extends APIRequest {
  mock = mockResponse;

  buildURL(inspectionID) {
    return `${this.rootURL}inspection/${inspectionID}`;
  }

  deserialize(object) {
    return object.violations.map(InspectionViolation.fromJSON);
  }
}
