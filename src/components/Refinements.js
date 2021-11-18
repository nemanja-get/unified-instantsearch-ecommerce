import React from 'preact/compat';
import {
  RefinementList,
  HierarchicalMenu,
  Menu,
} from 'react-instantsearch-dom';

import { useAppContext } from '../hooks';
import { Panel } from './Panel';
import { ColorList } from './ColorList';
import { Slider } from './Slider';
import { SizeList } from './SizeList';
import { ImageList } from './ImageList';
import { CustomRangeInput } from './RangeInput';
import { CustomNumericMenu } from './NumericMenu';

function RefinementWidget({ type, label, ...props  }) {
  switch (type) {
    case 'color':
      return <ColorList {...props} />;

    case 'size':
      return <SizeList {...props} />;

    case 'slider':
      if (props.priceFilterType === 'slider'){
        return <Slider {...props} />
      }
      else if (props.priceFilterType === 'range') {
        return <CustomRangeInput {...props} />;
      }
      else if (props.priceFilterType === 'numericMenu'){
        return <CustomNumericMenu {...props} />
      }     

    case 'list':
      if(label === 'Brand'){
        return (
          <RefinementList
          translations={{
            showMore: (expanded) =>
              expanded ? 'Prikaži manje' : 'Prikaži više',
          }}
          {...props}
          />
        );
      }
      else if(label === 'ImageBrand'){
        <ImageList
        translations={{
          showMore: (expanded) =>
            expanded ? 'Prikaži manje' : 'Prikaži više',
        }}
        {...props}
      />
      }

    case 'category':
      return (
        <Menu
          translations={{
            showMore: (expanded) =>
              expanded ? 'Prikaži manje' : 'Prikaži više',
          }}
          {...props}
        />
      );

    case 'hierarchical':
      return (
        <HierarchicalMenu
          translations={{
            showMore: (expanded) =>
              expanded ? 'Prikaži manje' : 'Prikaži više',
          }}
          {...props}
        />
      );

    default:
      return null;
  }
}

function getPanelId(refinement) {
  return refinement.options.attributes
    ? refinement.options.attributes.join(':')
    : refinement.options.attribute;
}

export function Refinements(props) {
  const { config, isMobile } = useAppContext();
  const [panels, setPanels] = React.useState(
    config.refinements.reduce((acc, current) => ({
        ...acc,
        [getPanelId(current)]: isMobile ? false : !current.isCollapsed,
      }),
      {}
    )
  );

  function onToggle(panelId) {
    setPanels((prevPanels) => {
      // We want to close other panels on mobile to have an accordion effect.
      const otherPanels = isMobile
        ? Object.keys(prevPanels).reduce(
            (acc, panelKey) => ({ ...acc, [panelKey]: false }),
            {}
          )
        : prevPanels;

      return {
        ...otherPanels,
        [panelId]: !prevPanels[panelId],
      };
    });
  }

  return config.refinements.map((refinement) => {
    const panelId = getPanelId(refinement);
    return (
      <Panel
        key={panelId}
        header={refinement.header}
        isOpened={panels[panelId]}
        onToggle={() => onToggle(panelId)}
      >
        <RefinementWidget type={refinement.type} {...refinement.options} label={refinement.label} priceFilterType={props.priceFilterType} />
      </Panel>
    );
  });
}
