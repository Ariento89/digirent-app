import Select from 'components/Select/index';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { yearOptions } from 'shared/options';
import Pagination from 'widgets/Pagination/index';
import ReactionItem from './widgets/ReactionItem';

const MyPropertiesSeeReactionsModal = ({ isVisible, onClose }) => {
  const [year, setYear] = useState(null);

  return (
    <Modal
      dialogClassName="modal-xl"
      id="see-reactions-modal"
      show={isVisible}
      onHide={onClose}
      centered
    >
      <Modal.Body>
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

          <ReactionItem />
          <ReactionItem />
          <ReactionItem />
          <ReactionItem />
          <ReactionItem />

          <Pagination className="mt-5" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MyPropertiesSeeReactionsModal;
