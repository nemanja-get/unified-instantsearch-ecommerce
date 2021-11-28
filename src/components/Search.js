import React, {useState, Fragment, useEffect, useRef} from 'preact/compat';
import { InstantSearch, Configure, SortBy, ClearRefinements } from 'react-instantsearch-dom';
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';

import { useAppContext, useSearchContext } from '../hooks';
import { Banner } from './Banner';
import { CurrentRefinements } from './CurrentRefinements';
import { QueryRulesHandler } from './QueryRulesHandler';
import { Refinements } from './Refinements';
import { HeaderSearchBox } from './SearchBox';
import { Stats } from './Stats';
import { CloseIcon } from './CloseIcon';
import { NoResultsHandler } from './NoResultsHandler';
import { ProductList } from './ProductList';
import { Views } from './Views';
import { FiltersButton } from './FiltersButton';
import { SeeResultsButton } from './SeeResultsButton';
import { ResetButton } from './ResetButton';
import  HitDetails from './HitDetails';

import { Autocomplete } from './Autocomplete';

export function Search(props) {
  const { config, view, searchParameters, isMobile } = useAppContext();
  const { isSearchStalled } = useSearchContext();
  const [ isAutoCompleteOn, changeSearchAutoComplete] = useState(true);
  const [ priceFilter, setPriceFilter ] = useState('slider');
  const [ ratingFilter, setRatingFilter ] = useState('selectedAndUp');
  const [ currentHit, setCurrentHit ] = useState();

  const filtersAnchor = React.useRef();

  const defaultSort = [
    {
      label: 'Featured',
      value: config.index.indexName,
    },
  ];
  const sorts = defaultSort.concat(config.sorts);

  const hasRefinements = Boolean(config.refinements.length);

  React.useEffect(() => {
    if (filtersAnchor.current && props.isFiltering) {
      filtersAnchor.current.scrollTop = 0;
    }
  }, [props.isFiltering]);

  const searchIsNotEmpty = props.searchState.query;
  let searchQuery;

  if(searchIsNotEmpty && !isAutoCompleteOn){
    searchQuery = <p style="font-weight: bold">Rezultati za "{props.searchState.query}"</p>
  }

  let searchBtnText;
  isAutoCompleteOn ? searchBtnText = 'On' : searchBtnText = 'Off';

  const [productNumber, setProductNumber] = useState(searchParameters.hitsPerPage);

  

  function setHitHandler(el){
    setCurrentHit(el);
  }

  return (
    <InstantSearch
      searchClient={props.searchClient}
      indexName={props.indexName}
      searchState={props.searchState}
      onSearchStateChange={props.onSearchStateChange}
      createURL={props.createURL}
    >
       <Configure 
        {...searchParameters}
        hitsPerPage={productNumber}
       />
      <QueryRulesHandler searchState={props.searchState} />
    
      <div id="uni-Wrapper">
        <header className="uni-Header">
          <a href="#" style="margin-left: 24px; align-self:flex-start">
            <svg width="125px" viewBox="0 0 124 48" fill="none" class="ananas-logo-icon__LogoIconStyled-sc-1q2lxhb-0 hmkNQl"><path d="M8.40187 32.3943C5.98754 32.3943 4.73209 31.522 4.73209 29.7774C4.73209 27.7419 6.18069 26.8696 9.27103 26.8696H12.7477C12.9408 26.8696 13.0374 26.9665 13.0374 27.1604V28.8081C13.0374 31.2312 11.3956 32.3943 8.40187 32.3943ZM17.2866 35.9806C17.5763 35.9806 17.7695 35.7867 17.7695 35.496V21.6356C17.7695 16.4016 15.3551 14.1724 8.88474 14.1724C5.4081 14.1724 3.09034 15.0447 1.35203 16.2078C1.15888 16.3047 1.15888 16.5955 1.25545 16.7894L2.8972 19.6971C2.99377 19.891 3.28349 19.9879 3.47664 19.794C4.44237 19.0186 5.98754 18.3402 8.3053 18.3402C11.8785 18.3402 13.0374 19.4063 13.0374 21.8295V22.7987C13.0374 22.9926 12.9408 23.0895 12.7477 23.0895H8.49844C3.28349 23.0895 0 25.2219 0 29.8743C0 34.3329 3.28349 36.3683 7.14642 36.3683C10.1402 36.3683 12.1682 35.399 13.134 33.8482V35.399C13.134 35.6898 13.3271 35.8837 13.6168 35.8837H17.2866V35.9806Z" fill="#FE502A"></path><path d="M39.3039 35.9806C39.5936 35.9806 39.7867 35.7867 39.7867 35.496V22.1203C39.7867 17.5648 36.9861 14.1724 32.4472 14.1724C29.6465 14.1724 27.8117 15.3355 26.8459 16.6924V15.1416C26.8459 14.8508 26.6528 14.657 26.3631 14.657H22.2104C21.9207 14.657 21.7275 14.8508 21.7275 15.1416V35.5929C21.7275 35.8837 21.9207 36.0775 22.2104 36.0775H26.2665C26.5562 36.0775 26.7493 35.8837 26.7493 35.5929V23.2834C26.7493 20.5694 28.1979 18.6309 30.8054 18.6309C33.4129 18.6309 34.7649 20.5694 34.7649 23.2834V35.5929C34.7649 35.8837 34.9581 36.0775 35.2478 36.0775H39.3039V35.9806Z" fill="#FE502A"></path><path d="M51.0874 32.3943C48.6731 32.3943 47.4176 31.522 47.4176 29.7774C47.4176 27.7419 48.8662 26.8696 51.9566 26.8696H55.4332C55.6264 26.8696 55.7229 26.9665 55.7229 27.1604V28.8081C55.8195 31.2312 54.1778 32.3943 51.0874 32.3943ZM60.0687 35.9806C60.3584 35.9806 60.5516 35.7867 60.5516 35.496V21.6356C60.5516 16.4016 58.1373 14.1724 51.6669 14.1724C48.1902 14.1724 45.8725 15.0447 44.1341 16.2078C43.941 16.3047 43.941 16.5955 44.0376 16.7894L45.6793 19.6971C45.7759 19.891 46.0656 19.9879 46.2588 19.794C47.2245 19.0186 48.7697 18.3402 51.0874 18.3402C54.6606 18.3402 55.8195 19.4063 55.8195 21.8295V22.7987C55.8195 22.9926 55.7229 23.0895 55.5298 23.0895H51.184C45.969 23.0895 42.6855 25.2219 42.6855 29.8743C42.6855 34.3329 45.969 36.3683 49.832 36.3683C52.8257 36.3683 54.8538 35.399 55.8195 33.8482V35.399C55.8195 35.6898 56.0126 35.8837 56.3024 35.8837H60.0687V35.9806Z" fill="#FE502A"></path><path d="M81.9905 35.9806C82.2802 35.9806 82.4734 35.7867 82.4734 35.496V22.1203C82.4734 17.5648 79.6727 14.1724 75.1338 14.1724C72.3332 14.1724 70.4983 15.3355 69.5325 16.6924V15.1416C69.5325 14.8508 69.3394 14.657 69.0497 14.657H64.9936C64.7039 14.657 64.5107 14.8508 64.5107 15.1416V35.5929C64.5107 35.8837 64.7039 36.0775 64.9936 36.0775H69.0497C69.3394 36.0775 69.5325 35.8837 69.5325 35.5929V23.2834C69.5325 20.5694 70.9811 18.6309 73.5886 18.6309C76.1961 18.6309 77.5481 20.5694 77.5481 23.2834V35.5929C77.5481 35.8837 77.7413 36.0775 78.031 36.0775H81.9905V35.9806Z" fill="#FE502A"></path><path d="M93.8695 32.3943C91.4552 32.3943 90.1998 31.522 90.1998 29.7774C90.1998 27.7419 91.6483 26.8696 94.7387 26.8696H98.2153C98.4085 26.8696 98.505 26.9665 98.505 27.1604V28.8081C98.505 31.2312 96.8633 32.3943 93.8695 32.3943ZM102.754 35.9806C103.044 35.9806 103.237 35.7867 103.237 35.496V21.6356C103.237 16.4016 100.823 14.1724 94.3524 14.1724C90.8758 14.1724 88.558 15.0447 86.8197 16.2078C86.6265 16.3047 86.6265 16.5955 86.7231 16.7894L88.3649 19.6971C88.4614 19.891 88.7512 19.9879 88.9443 19.794C89.91 19.0186 91.4552 18.3402 93.773 18.3402C97.3462 18.3402 98.505 19.4063 98.505 21.8295V22.7987C98.505 22.9926 98.4085 23.0895 98.2153 23.0895H93.8695C88.6546 23.0895 85.3711 25.2219 85.3711 29.8743C85.3711 34.3329 88.6546 36.3683 92.5175 36.3683C95.5113 36.3683 97.5393 35.399 98.505 33.8482V35.399C98.505 35.6898 98.6982 35.8837 98.9879 35.8837H102.754V35.9806Z" fill="#FE502A"></path><path d="M115.115 36.4655C120.909 36.4655 124 33.4608 124 29.293C124 25.8037 121.875 23.4774 117.433 23.0897L115.115 22.8959C112.411 22.6051 111.638 21.9266 111.638 20.6666C111.638 19.4066 112.701 18.4373 114.825 18.4373C116.95 18.4373 119.074 19.3097 120.33 20.182C120.523 20.2789 120.813 20.2789 120.909 20.0851L123.034 17.4681C123.131 17.2742 123.131 16.9834 122.937 16.8865C121.006 15.3357 118.302 14.2695 114.922 14.2695C109.61 14.2695 106.713 16.8865 106.713 20.9574C106.713 24.5436 108.934 26.7729 113.184 27.2575L115.501 27.4514C118.302 27.7422 118.978 28.5176 118.978 29.7776C118.978 31.2315 117.626 32.2977 115.018 32.2977C112.797 32.2977 110.383 31.3284 108.838 29.8745C108.645 29.6807 108.355 29.6807 108.258 29.8745L105.747 32.4915C105.554 32.6854 105.554 32.9761 105.747 33.0731C107.775 34.7208 110.769 36.4655 115.115 36.4655Z" fill="#FE502A"></path><path d="M1.64205 11.3616H17.3835C17.6732 11.3616 17.8663 11.1678 17.8663 10.877V7.48463C17.8663 7.19385 17.6732 7 17.3835 7H1.64205C1.35233 7 1.15918 7.19385 1.15918 7.48463V10.9739C1.15918 11.1678 1.35233 11.3616 1.64205 11.3616Z" fill="#84BD00"></path></svg>
          </a>
          <div className="uni-Header-inner" style="display: none"> 
             <HeaderSearchBox searchAutoComplete={isAutoCompleteOn} /> 
             {isSearchStalled && <div className="uni-LoadingProgress" />} 
          </div>       

          <div style="margin-left: 30px;width: 50%;">
            <Autocomplete
              placeholder="Search for a product, brand, color, …"
              openOnFocus={true}
              //defaultActiveItemId={0}
              setHit={setHitHandler}
              searchState={props.searchState}
              onSearchStateChange={props.onSearchStateChange}
            />
          </div>
        </header>

       

        <Switch>
          <Route exact path="/">
             
            <div className="uni-Content">
          
              {hasRefinements && (
                <>
                  <div
                    data-layout="mobile"
                    className="uni-LeftPanel-Overlay"
                    onClick={() => props.setIsFiltering(false)}
                  />
                  <div className="uni-LeftPanel">
                    <div className="uni-Refinements">
                      <div
                        className="uni-Refinements-scrollable"
                        ref={filtersAnchor}
                      >
                        <header
                          className="uni-Refinements-heading"
                          data-layout="mobile"
                        >
                          <span>Filters</span>
                          <button
                            onClick={() => {
                              props.setIsFiltering(false);
                            }}
                            className="uni-Refinements-closeButton"
                            title="Close filters"
                          >
                            <CloseIcon />
                          </button>
                        </header>
                        {isMobile && <CurrentRefinements />}
                        <ClearRefinements />

                        <Refinements priceFilterType={priceFilter} ratingFilterType={ratingFilter} />                          
                      </div>

                      <footer
                        className="uni-Refinements-footer"
                        data-layout="mobile"
                      >
                        <ResetButton
                          onClick={() => {
                            props.setIsFiltering(false);
                          }}
                        />
                        <SeeResultsButton
                          onClick={() => {
                            props.setIsFiltering(false);
                          }}
                        />
                      </footer>
                    </div>
                  </div>
                </>
              )}

              <div className="uni-RightPanel">
                <header className="uni-BodyHeader">
                  <div className="uni-BodyHeader-heading">
                    <div className="uni-BodyHeader-stats">
                      {searchQuery}
                      <Stats />
                    </div>

                    <div className="uni-BodyHeader-extraOptions">
                      {sorts.length > 1 && (
                        <div className="uni-BodyHeader-sortBy">
                          <span className="uni-Label">Sortiraj po</span>
                          <SortBy
                            items={sorts}
                            defaultRefinement={sorts[0].value}
                          />
                        </div>
                      )}

                      <div>
                        <Views view={view} setView={props.setView} />
                      </div>
                    </div>
                  </div>
                  {!isMobile && <CurrentRefinements priceFilterType={priceFilter} ratingFilterType={ratingFilter}/>}
                </header>

                <main className="uni-BodyContent">
                  <Banner />
                  <NoResultsHandler>
                    <ProductList setHit={setHitHandler} />
                  </NoResultsHandler>                                           
                </main>
              </div>

            
              {hasRefinements && ( <FiltersButton onClick={() => {props.setIsFiltering(true);}}/>)}
            </div>
          </Route>
          <Route path="/hitdetails">            
            <div className="uni-Content">
              <HitDetails selectedHit={currentHit} config={props.config} />                              
            </div>
          </Route>
        </Switch>

        <footer className="configuration-footer">

          <button onClick={() => changeSearchAutoComplete(!isAutoCompleteOn)}>Autocomplete is {searchBtnText}</button>

          <div style="margin: 0 2rem">
            <p style="margin-bottom: 0.5rem">Set the number of displayed products</p>
            <button onClick={() => setProductNumber(5)}>5</button>
            <button onClick={() => setProductNumber(20)}>20</button>
            <button onClick={() => setProductNumber(30)}>30</button>
            <button onClick={() => setProductNumber(50)}>50</button>
            <button onClick={() => setProductNumber(100)}>100</button>            
          </div>

          <div style="margin: 0 2rem">
            <p style="margin-bottom: 0.5rem">Choose price filter</p>
            <button onClick={() => setPriceFilter('slider')}>Slider</button>
            <button onClick={() => setPriceFilter('range')}>Range input</button>
            <button onClick={() => setPriceFilter('numericMenu')}>Numeric menu</button>
          </div>
          {/* <div>
          <p style="margin-bottom: 0.5rem">Choose rating filter</p>
            <button onClick={() => setRatingFilter('exactRating')}>Exact rating</button>
            <button onClick={() => setRatingFilter('selectedAndUp')}>Selected rating and up</button>
          </div> */}
        </footer>
      </div>
    </InstantSearch>
  );
}
