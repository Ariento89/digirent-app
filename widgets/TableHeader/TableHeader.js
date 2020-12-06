import { Select } from 'components/Select/index';
import { useState } from 'react';
import cn from 'classnames';

const yearOptions = [
  { name: 'OPTION 1', value: 1 },
  { name: 'OPTION 2', value: 2 },
  { name: 'OPTION 3', value: 3 },
  { name: 'OPTION 4', value: 4 },
];

const TableHeader = ({ classNames }) => {
  const [year, setYear] = useState(null);

  return (
    <div className={cn('TableHeader', classNames)}>
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
  );
};

export default TableHeader;
