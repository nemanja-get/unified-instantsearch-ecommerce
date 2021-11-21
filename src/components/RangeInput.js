import React from 'preact/compat';
import { connectRange } from 'react-instantsearch-dom';

const RangeInputX = ({ currentRefinement, min, max, precision, refine }) => {
  
  const [currentMin, setCurrentMin] = React.useState(currentRefinement.min);
  const [currentMax, setCurrentMax] = React.useState(currentRefinement.max);

  const computeMinValue = React.useCallback(
    function computeMinValue(value) {
      return Math.max(value, min);
    },
    [min]
  );

  const computeMaxValue = React.useCallback(
    function computeMaxValue(value) {
      return Math.min(value, max);
    },
    [max]
  );

  const onClick = (e) => {
    const nextCurrentMin = computeMinValue(currentMin);
    const nextCurrentMax = computeMaxValue(currentMax);

    if (currentMin !== nextCurrentMin) {
      setCurrentMin(nextCurrentMin);
    }

    if (currentMax !== nextCurrentMax) {
      setCurrentMax(nextCurrentMax);
    }

    refine({ min: nextCurrentMin, max: nextCurrentMax });
  };

  const onMinValueUpdated = (e) => {
    setCurrentMin(e.currentTarget.value);
  };

  const onMaxValueUpdated = (e) => {
    setCurrentMax(e.currentTarget.value);
  };

  React.useEffect(() => {
    setCurrentMin(computeMinValue(currentRefinement.min));
    setCurrentMax(computeMaxValue(currentRefinement.max));
  }, [
    currentRefinement.min,
    currentRefinement.max,
    setCurrentMin,
    setCurrentMax,
    computeMinValue,
    computeMaxValue,
  ]);

return (
  <form>
    <input
      type="number"
      min={min}
      max={max}
      step={1 / Math.pow(10, precision)}
      placeholder={currentRefinement.min || ''}
      onChange={onMinValueUpdated}
    />
    {' - '}
    <input
      type="number"
      min={min}
      max={max}
      step={1 / Math.pow(10, precision)}
      placeholder={currentRefinement.max || ''}
      onChange={onMaxValueUpdated}
    />
    <button class="ais-RangeInput-submit" type="button" onClick={onClick}>ok</button>
  </form>
);

};

export const CustomRangeInput = connectRange(RangeInputX);




