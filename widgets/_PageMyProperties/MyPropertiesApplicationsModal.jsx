/* eslint-disable react-hooks/exhaustive-deps */
import Select from 'components/Select/index';
import Spinner from 'components/Spinner/index';
import { usePropertyApplications } from 'hooks/usePropertyApplications';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useToasts } from 'react-toast-notifications';
import { yearOptions } from 'shared/options';
import { request, toastTypes } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import ReactionItem from './widgets/ReactionItem';

const MyPropertiesApplicationsModal = ({ property, isVisible, onClose }) => {
  // STATES
  const [year, setYear] = useState(null);
  const [applications, setApplications] = useState([]);
  const [list, setList] = useState([]);

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchApplicationsForProperties, status, errors } = usePropertyApplications();

  // METHODS
  const onFetchSuccess = ({ response }) => {
    setApplications(response);
    console.log('response', response);
  };

  const onFetchError = () => {
    addToast("An error occurred while fetching apartment's applications.", toastTypes.ERROR);
  };

  useEffect(() => {
    if (property) {
      fetchApplicationsForProperties(
        { apartmentId: property.id },
        {
          onSuccess: onFetchSuccess,
          onError: onFetchError,
        },
      );
    }
  }, [property]);

  return (
    <Modal
      dialogClassName="modal-xl"
      id="see-reactions-modal"
      show={isVisible}
      onHide={onClose}
      centered
    >
      <Modal.Body>
        <Spinner isLoading={status === request.REQUESTING}>
          <button type="button" className="button-nav primary s-40" onClick={onClose}>
            <img src="/images/icon/icon-arrow-left-white.svg" alt="icon user" />
          </button>

          <div className="main-content pb-4">
            <div className="table-header">
              <span className="main-desc">Results 1 - 2 of 2</span>

              <div className="sort">
                <span className="main-desc mr-2 mr-sm-4">Sort by:</span>

                <Select
                  classNames="primary"
                  value={year}
                  onChange={(value) => setYear(value)}
                  options={yearOptions}
                  placeholder="DATE (NEW-OLD)"
                />
              </div>
            </div>

            {/* <ReactionItem />
            <ReactionItem />
            <ReactionItem />
            <ReactionItem />
            <ReactionItem />

            <Pagination className="mt-5" /> */}
          </div>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
};

export default MyPropertiesApplicationsModal;
