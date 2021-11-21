import React, { useState } from 'preact/compat';
import { NumericMenu, connectRange } from 'react-instantsearch-dom';

const NumericMenuX = (props) => {
  
  const items = [];

  var skip = 0;
  var min = -1; var max;

  props.count.sort((a, b) => Number(a.value) - Number(b.value)).forEach(element => {
    skip ++;
    if(min === -1)
    {
      min = element.value;
    }
    if(skip > 4)
    {
      items.push({min: min, max: element.value, label: min + " - " + element.value, isRefined: false});    
      skip = 0; min = element.value;
    }
    max = element.value;
  });

  if(skip > 0)
  {
    items.push({min: min, max: max, label: min + " - " + max, isRefined: false});  
  }
 
  return (
  <div class="ais-NumericMenu">
  <ul class="ais-NumericMenu-list">  
    {items.map(item => (
      <li key={item.value}>
        <a
          href="#"
          style={{ fontWeight: item.isRefined ? 'bold' : '' }}
          onClick={event => {
            event.preventDefault();
            props.refine({ min: item.min, max: item.max })
          }}
        >
          {item.label}
        </a>
      </li>
    ))}

     <li class="ais-NumericMenu-item ais-NumericMenu-item--selected">
      <label class="ais-NumericMenu-label">
        <input
          class="ais-NumericMenu-radio"
          type="radio"
          name="NumericMenu"
          checked
        />
        <span class="ais-NumericMenu-labelText">All</span>
      </label>
    </li>
  </ul>
</div>
)};

export const CustomNumericMenu = connectRange(NumericMenuX);
