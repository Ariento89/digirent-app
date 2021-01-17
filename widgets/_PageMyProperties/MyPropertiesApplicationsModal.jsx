import FieldError from 'components/FieldError/FieldError';
import Select from 'components/Select/index';
import Spinner from 'components/Spinner/index';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { yearOptions } from 'shared/options';
import { request } from 'shared/types';
import Pagination from 'widgets/Pagination/index';
import StateList, { stateListTypes } from 'widgets/StateList/index';
import PropertyApplication from './widgets/PropertyApplication';

const MyPropertiesApplicationsModal = ({
  applications,
  status,
  errors,
  isVisible,
  onClose,
  onUpdateApplication,
}) => {
  // STATES
  const [list, setList] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  // METHODS
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

          {!!errors?.length && (
            <div className="my-3">
              {errors?.map((error) => (
                <FieldError error={error} />
              ))}
            </div>
          )}

          {/* LIST */}
          {status === request.SUCCESS && !!applications && (
            <div className="main-content pb-4">
              <TableHeader
                currentPage={paginationData.currentPage}
                maxPage={paginationData.currentPage}
              />

              {list.map((application, index) => (
                <PropertyApplication
                  key={application.id}
                  application={application}
                  onUpdateApplication={(updatedApplication) => {
                    onUpdateApplication(index, updatedApplication);
                  }}
                />
              ))}

              <Pagination className="mt-5" list={applications} onPageChange={onPageChange} />
            </div>
          )}

          {/* EMPTY */}
          {status === request.SUCCESS && !applications?.length && (
            <StateList
              className="mx-auto"
              title="LIST IS EMPTY"
              description="There are no applications on this property yet."
              type={stateListTypes.EMPTY}
            />
          )}

          {/* ERROR */}
          {status === request.ERROR && (
            <StateList
              className="mx-auto"
              title="OOPS!"
              description="An error ocurred while applications of your property."
              type={stateListTypes.ERROR}
            />
          )}
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
