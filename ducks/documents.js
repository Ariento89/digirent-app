import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

export const key = 'DOCUMENTS';

export const types = {
  SAVE: `${key}/SAVE`,

  DOWNLOAD_COPY_ID: `${key}/DOWNLOAD_COPY_ID`,
  DOWNLOAD_PROOF_OF_INCOME: `${key}/DOWNLOAD_PROOF_OF_INCOME`,
  DOWNLOAD_PROOF_OF_ENROLMENT: `${key}/DOWNLOAD_PROOF_OF_ENROLMENT`,
  DOWNLOAD_PROFILE_PHOTO: `${key}/DOWNLOAD_PROFILE_PHOTO`,

  UPLOAD_COPY_ID: `${key}/UPLOAD_COPY_ID`,
  UPLOAD_PROOF_OF_INCOME: `${key}/UPLOAD_PROOF_OF_INCOME`,
  UPLOAD_PROOF_OF_ENROLMENT: `${key}/UPLOAD_PROOF_OF_ENROLMENT`,
  UPLOAD_PROFILE_PHOTO: `${key}/UPLOAD_PROFILE_PHOTO`,
};

const initialState = {
  profilePhoto: null,
};

const reducer = handleActions(
  {
    [types.SAVE]: (state, { payload }) => {
      const { type } = payload;
      let newData = {};

      switch (type) {
        case types.DOWNLOAD_PROFILE_PHOTO: {
          newData = { profilePhoto: payload.profilePhoto };
          break;
        }
      }

      return { ...state, ...newData };
    },
  },
  initialState,
);

export const actions = {
  save: createAction(types.SAVE),

  downloadCopyId: createAction(types.DOWNLOAD_COPY_ID),
  downloadProofOfIncome: createAction(types.DOWNLOAD_PROOF_OF_INCOME),
  downloadProofOfEnrolment: createAction(types.DOWNLOAD_PROOF_OF_ENROLMENT),
  downloadProfilePhoto: createAction(types.DOWNLOAD_PROFILE_PHOTO),

  uploadCopyId: createAction(types.UPLOAD_COPY_ID),
  uploadProofOfIncome: createAction(types.UPLOAD_PROOF_OF_INCOME),
  uploadProofOfEnrolment: createAction(types.UPLOAD_PROOF_OF_ENROLMENT),
  uploadProfilePhoto: createAction(types.UPLOAD_PROFILE_PHOTO),
};

const selectState = (state) => state[key] || initialState;
export const selectors = {
  selectProfilePhoto: () => createSelector(selectState, (state) => state.profilePhoto),
};

export default reducer;
