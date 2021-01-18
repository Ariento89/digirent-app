import { createAction } from 'redux-actions';

export const key = 'DOCUMENTS';

export const types = {
  DOWNLOAD_COPY_ID: `${key}/DOWNLOAD_COPY_ID`,
  DOWNLOAD_PROOF_OF_INCOME: `${key}/DOWNLOAD_PROOF_OF_INCOME`,
  DOWNLOAD_PROOF_OF_ENROLMENT: `${key}/DOWNLOAD_PROOF_OF_ENROLMENT`,

  UPLOAD_COPY_ID: `${key}/UPLOAD_COPY_ID`,
  UPLOAD_PROOF_OF_INCOME: `${key}/UPLOAD_PROOF_OF_INCOME`,
  UPLOAD_PROOF_OF_ENROLMENT: `${key}/UPLOAD_PROOF_OF_ENROLMENT`,
  UPLOAD_PROFILE_PHOTO: `${key}/UPLOAD_PROFILE_PHOTO`,
};
export const actions = {
  downloadCopyId: createAction(types.DOWNLOAD_COPY_ID),
  downloadProofOfIncome: createAction(types.DOWNLOAD_PROOF_OF_INCOME),
  downloadProofOfEnrolment: createAction(types.DOWNLOAD_PROOF_OF_ENROLMENT),

  uploadCopyId: createAction(types.UPLOAD_COPY_ID),
  uploadProofOfIncome: createAction(types.UPLOAD_PROOF_OF_INCOME),
  uploadProofOfEnrolment: createAction(types.UPLOAD_PROOF_OF_ENROLMENT),
  uploadProfilePhoto: createAction(types.UPLOAD_PROFILE_PHOTO),
};
