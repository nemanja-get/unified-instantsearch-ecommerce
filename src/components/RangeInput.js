import React from 'preact/compat';
import { connectRange, RangeInput } from 'react-instantsearch-dom';

export const CustomRangeInput = connectRange(function CustomRangeInput(props) {
  return (
    <div>
        <RangeInput
          attribute="price"
          min={props.min}
          max={props.max} 
          translations={{
            submit: 'OK',
            separator: '-',
          }} 
          />
    </div>
  )
});

