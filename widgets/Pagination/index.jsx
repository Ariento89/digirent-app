/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { ceil, floor, range } from 'lodash';
import { useEffect, useState } from 'react';

const PAGES = 5;
const PAGE_LENGTH = 5;

const Pagination = ({ list, pageLength, onPageChange, className }) => {
  // STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [pages, setPages] = useState([]);

  // METHODS
  useEffect(() => {
    if (maxPage === null && list?.length) {
      const maxPageValue = ceil(list.length / pageLength);
      setMaxPage(maxPageValue);
      setPages(range(1, (maxPageValue > PAGES ? PAGES : maxPageValue) + 1));

      // Initial list
      updateList(currentPage, maxPageValue);
    }
  }, [maxPage, pageLength, list]);

  const onNext = () => {
    if (currentPage < ceil(list?.length / pageLength)) {
      const pageNumber = currentPage + 1;
      setCurrentPage(pageNumber);
      updatePages(pageNumber);
      updateList(pageNumber);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      const pageNumber = currentPage - 1;
      setCurrentPage(pageNumber);
      updatePages(pageNumber);
      updateList(pageNumber);
    }
  };

  const onPageSelect = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      updateList(pageNumber);
    }
  };

  const updatePages = (pageNumber) => {
    let currentStep = floor(pageNumber / pageLength);
    currentStep = pageNumber % pageLength === 0 && currentStep > 0 ? currentStep - 1 : currentStep;
    const startPage = pageLength * currentStep + 1;
    const endPage = pageLength * (currentStep + 1);

    setPages(range(startPage, (endPage > maxPage ? maxPage : endPage) + 1));
  };

  const updateList = (pageNumber, maxPageValue = maxPage) => {
    const startIndex = (pageNumber - 1) * pageLength;
    const endIndex = pageNumber * pageLength;
    const newList = list?.slice(startIndex, endIndex) || [];

    onPageChange(newList, {
      currentPage,
      maxPage: maxPageValue,
    });
  };

  return (
    !!list?.length && (
      <div className={cn('pagination', className)}>
        <button type="button" className="btn-arrow prev" onClick={onPrev}>
          <img src="/images/icon/icon-caret-left-white.svg" alt="icon" />
        </button>
        <div className="pages">
          {pages.map((pageNumber) => (
            <span
              key={pageNumber}
              className={cn('number', { active: pageNumber === currentPage })}
              onClick={() => onPageSelect(pageNumber)}
            >
              {pageNumber}
              <span className="line" />
            </span>
          ))}
        </div>
        <button type="button" className="btn-arrow next" onClick={onNext}>
          <img src="/images/icon/icon-caret-right-white.svg" alt="icon" />
        </button>
      </div>
    )
  );
};

Pagination.defaultProps = {
  pageLength: PAGE_LENGTH,
};

export default Pagination;
