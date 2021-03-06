import { EuiFacetButton, EuiFacetGroup, EuiIcon } from '@elastic/eui';
import { useState } from 'react';

import { IReviewOption } from './types';

const ReviewFilter = ({ filter }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>('all');

  const handleSelect = (id: string) => {
    setSelectedOption(() => id);
    filter(() => id);
  };

  const options = [
    {
      id: 'all',
      label: 'All reviews',
      icon: <EuiIcon type="dot" color="accent" />,
    },
    {
      id: 'votes',
      label: 'Hottest reviews',
      icon: <EuiIcon type="dot" color="accent" />,
    },
    {
      id: 'created_at',
      label: 'Latest reviews',
      icon: <EuiIcon type="dot" color="accent" />,
    },
  ];

  const OptionList = (align: string) => {
    return (
      <>
        {options.map((option: IReviewOption) => {
          return (
            <EuiFacetButton
              key={option.id}
              id={`${option.id}_${align}`}
              icon={selectedOption === option.id ? option.icon : null}
              onClick={() => handleSelect(option.id)}
              isSelected={selectedOption === option.id}
            >
              {option.label}
            </EuiFacetButton>
          );
        })}
      </>
    );
  };

  return (
    <EuiFacetGroup layout="horizontal" gutterSize="l">
      {OptionList('horizontal')}
    </EuiFacetGroup>
  );
};

export default ReviewFilter;
