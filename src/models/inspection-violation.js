export default class InspectionViolation {

  static fromJSON(object) {
    const iv = new InspectionViolation()
    iv.lawCode            = (object.law                 || '').trim();
    iv.violationText      = (object.violation_rule      || '').trim();
    iv.violationComments  = (object.violation_comments  || '').trim();
    iv.correctiveText     = (object.corrective_text     || '').trim();
    iv.correctiveComments = (object.corrective_comments || '').trim();
    return iv;
  }
}
