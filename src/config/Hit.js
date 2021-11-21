import React, { useState } from 'preact/compat';
import { Highlight, Snippet } from 'react-instantsearch-dom';

import './Hit.scss';

export function Hit({ hit, insights, view, hitSetting }) {
  let freeShipping;
  
  if (hit.free_shipping) {
    freeShipping = <p><svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="delivery-truck-icon__DeliveryTruckIconStyled-sc-1asveyn-0 gTElwH"><path d="M2.8001 3.50229C2.88046 3.0201 3.29765 2.66669 3.78649 2.66669H9.9407C10.5586 2.66669 11.0287 3.22155 10.9271 3.83109L10.3513 7.28562C10.271 7.76781 9.85379 8.12122 9.36495 8.12122H3.21074C2.5928 8.12122 2.12275 7.56635 2.22434 6.95682L2.8001 3.50229Z" stroke="#84BD00" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.12113 10.8485H9.75748M3.39386 10.8485H2.75614C2.13821 10.8485 1.66816 10.2936 1.76975 9.68412L1.89096 8.95685C1.97133 8.47466 2.38852 8.12125 2.87736 8.12125H9.3649C9.85374 8.12125 10.2709 7.76784 10.3513 7.28565L10.5273 6.22958C10.6077 5.7474 11.0249 5.39398 11.5137 5.39398H13.4558C13.9446 5.39398 14.3618 5.74739 14.4422 6.22958L14.7301 7.95685C14.7482 8.0657 14.7482 8.1768 14.7301 8.28565L14.4422 10.0129C14.3618 10.4951 13.9446 10.8485 13.4558 10.8485H12.712" stroke="#84BD00" stroke-linecap="round" stroke-linejoin="round"></path><ellipse cx="4.75768" cy="11.3031" rx="1.36363" ry="1.36363" stroke="#84BD00" stroke-linecap="round" stroke-linejoin="round"></ellipse><ellipse cx="11.121" cy="11.3031" rx="1.36363" ry="1.36363" stroke="#84BD00" stroke-linecap="round" stroke-linejoin="round"></ellipse><path d="M4.30286 6.30298H0.666504" stroke="#84BD00" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.12104 4.48492H0.666504" stroke="#84BD00" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.9389 5.39398L12.6784 6.95685C12.5769 7.56638 13.0469 8.12125 13.6648 8.12125H14.7571" stroke="#84BD00" stroke-linecap="round" stroke-linejoin="round"></path></svg><span> Besplatna dostava</span></p>;
  }

  function addToWishList(element) {
    console.log(element);
  }

  return (
    <article
      className="uni-Hit"
   
    >
      <a href="#" className="uni-Hit-inner">
        <div className="uni-Hit-wishList">
          <button type="button" className="uni-Hit-wishList-icon" onClick={() => addToWishList(hit)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path class="stroke" fill-rule="evenodd" clip-rule="evenodd" d="M1.91441 8.39872C1.19908 6.16539 2.03508 3.61272 4.37975 2.85739C5.61308 2.45939 6.97441 2.69405 7.99975 3.46539C8.96975 2.71539 10.3811 2.46205 11.6131 2.85739C13.9577 3.61272 14.7991 6.16539 14.0844 8.39872C12.9711 11.9387 7.99975 14.6654 7.99975 14.6654C7.99975 14.6654 3.06508 11.9801 1.91441 8.39872Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path class="line" d="M10.6665 5.1333C11.3798 5.36397 11.8838 6.00063 11.9445 6.74797" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
        </div>
        <div className="uni-Hit-image">
          <img src={hit.image} alt={hit.name} loading="lazy" 
              onMouseOver={e => (e.target.src = 'https://cdn-demo.algolia.com/bestbuy-0118/5599700_sb.jpg')}
              onMouseOut={e => (e.target.src = hit.image)} />
        </div>

        <div className="uni-Hit-Body">
          <header className="uni-Hit-header">
            <h2 className="uni-Hit-category">{hit.categories[0]}</h2>

            <p className="uni-Hit-title">
              <Highlight attribute="name" tagName="mark" hit={hit} />
            </p>
          </header>


          {view === 'list' && (
            <p className="uni-Hit-description">
              <Snippet attribute="description" tagName="mark" hit={hit} />
            </p>
          )}

          <footer className="uni-Hit-footer">
              <p className="uni-Hit-free-shipping">{freeShipping}</p>
              <span className="uni-Hit-currency">$</span>
              <span className="uni-Hit-price">{hit.price.toLocaleString()}</span>
              <div style="font-size: 20px; display: inline-block;margin-left:120px">Rating: {hit.rating}</div>
          </footer>
        </div>

        {/* <div className="uni-Hit-Actions">
          <button
            title="Add to cart"
            className="uni-Hit-ActionButton"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              insights('convertedObjectIDsAfterSearch', {
                eventName: 'Product Added to Cart',
              });
            }}
          >
            <CartIcon />
          </button>
        </div> */}

      </a>
    </article>
  );
}

function CartIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M5 1H1l0 0H5l2.7 13.4c0.2 1 1 1.6 2 1.6h9.7c1 0 1.8-0.7 2-1.6L23 6H6" />
    </svg>
  );
}
