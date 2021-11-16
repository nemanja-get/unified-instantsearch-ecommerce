import React from 'preact/compat';

import './Panel.scss';

export function Panel({
  isOpened,
  header,
  footer,
  onToggle,
  children,
  ...rest
}) {

  const headerInfoText = header;
  let headerInfo;

  if (!headerInfoText) {
    headerInfo = <div className="brand-info-wrapper">
              <button style="padding: 0;background: transparent;border: 0;margin-left: 8px; display:flex; align-items:center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </button>
              <p class="brand-info-text">lorem ipsum lorem ipsum</p>
            </div>;
  } else {
    headerInfo = '';
  }   
  
  return (  
    <div
      className={[
        'ais-Panel',
        'ais-Panel--collapsible',
        isOpened === false && 'ais-Panel--collapsed',
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="ais-Panel-header">
        <button
          className="ais-Panel-headerButton"
          aria-expanded={isOpened}
          onClick={onToggle}
        >
          <div style="display: flex; align-items:center">
            <h5>{header}</h5>
            {headerInfo} 
          </div>

          <div className="ais-Panel-collapseButton">
            {isOpened ? (
              <svg viewBox="0 0 13 13" width={13} height={13}>
                <path fill="currentColor" d="M0 6h13v1H0z" fillRule="evenodd" />
              </svg>
            ) : (
              <svg viewBox="0 0 13 13" width={13} height={13}>
                <path
                  fill="currentColor"
                  d="M6 6V0h1v6h6v1H7v6H6V7H0V6h6z"
                  fillRule="evenodd"
                />
              </svg>
            )}
          </div>
        </button>
      </div>

      <div className="ais-Panel-body">{children}</div>

      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}
