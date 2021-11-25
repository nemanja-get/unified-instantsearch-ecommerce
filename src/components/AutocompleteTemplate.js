import React, { createElement } from 'react';

export function AutocompleteTemplate({ hit, components, props }) {
  return (
    // <a href="#" className="aa-ItemLink" onClick={() => props.setHit(hit)}>
    //   <div className="aa-ItemContent">
    //     <div className="aa-ItemTitle">
    //       <components.Highlight hit={hit} attribute="name" />
    //     </div>
    //   </div>
    // </a>
    <a className="aa-ItemLink" href={hit.url}>

      <div className="aa-ItemWrapper">
        <div className="aa-ItemContent">
          <div className="aa-ItemIcon">
            <img src={hit.image} alt={hit.name} width="40" height="40" />
          </div>
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.Highlight hit={hit} attribute="name" />
            </div>
          </div>
        </div>
        <div className="aa-ItemActions">
          <button
            className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
            type="button"
            title="Select"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
            </svg>
          </button>
        </div>
      </div>
    </a>
  );
}