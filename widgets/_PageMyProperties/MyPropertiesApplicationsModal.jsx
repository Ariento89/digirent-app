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
import PropertyApplication from './widgets/PropertyApplication';

const MyPropertiesApplicationsModal = ({ property, isVisible, onClose }) => {
  // STATES
  const [applications, setApplications] = useState([]);
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { fetchApplicationsForProperties, status, errors } = usePropertyApplications();

  // METHODS
  useEffect(() => {
    if (isVisible && property) {
      fetchApplicationsForProperties(
        { propertyId: property.id },
        {
          onSuccess: onFetchSuccess,
          onError: onFetchError,
        },
      );
    }
  }, [isVisible, property]);

  const onFetchSuccess = ({ response }) => {
    setApplications(response);
  };

  const onFetchError = () => {
    addToast("An error occurred while fetching property's applications.", toastTypes.ERROR);
  };

  const onPageChange = (newList, pagination) => {
    setList(newList);
    setPaginationData(pagination);
  };

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
            <TableHeader
              currentPage={paginationData.currentPage}
              maxPage={paginationData.currentPage}
            />

            {list.map((propertyApplication) => (
              <PropertyApplication key={propertyApplication.id} />
            ))}

            <Pagination className="mt-5" list={applications} onPageChange={onPageChange} />
          </div>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
};

const TableHeader = ({ currentPage, maxPage }) => {
  const [year, setYear] = useState(null);

  return (
    <div className="table-header">
      <span className="main-desc">
        Results {currentPage} - {maxPage} of {maxPage}
      </span>

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
  );
};

export default MyPropertiesApplicationsModal;
