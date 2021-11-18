import React from 'preact/compat';
import { NumericMenu } from 'react-instantsearch-dom';

export function CustomNumericMenu(props) {
  return (
    <div className="numericWrapper">
        <NumericMenu
          attribute="price"
          items={[
            { label: '$1 - $50', end: 10 },
            { label: '$50 - $100', start: 10, end: 100 },
            { label: '$100 - $500', start: 100, end: 500 },
            { label: '$500 - $2000', start: 500, end: 2000},
            { label: '> $2000', start: 2000},
          ]} 
          />
    </div>
  )
};

