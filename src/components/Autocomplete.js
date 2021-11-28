import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { autocomplete } from '@algolia/autocomplete-js';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { AutocompleteTemplate } from './AutocompleteTemplate'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

const appId = 'Y1BSBVJ7AC';
const apiKey = '82d109db398a4e02d0fa084964382af6';
const searchClient = algoliasearch(appId, apiKey);


export function Autocomplete(props) {


  function searchQuery(e, query){
    e.stopPropagation();
    props.onSearchStateChange({
      query: query,
    })
  }

  function searchCategory(e, query, categorieValue){
    e.stopPropagation();
    props.onSearchStateChange({
      query: query,
      hierarchicalMenu: { categories: categorieValue}
    })
  }

  function searchBrand(e, query, brandValue){
    e.stopPropagation();
    props.onSearchStateChange({
      query: query,
      refinementList: { brand: brandValue}
    })
  }

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'dev_ananas_query_suggestions',
    getSearchParams({ state }) {
      return { hitsPerPage: 10 };
    },
    // categoryAttribute: [
    //   'dev_ananas',
    //   'facets',
    //   'exact_matches',
    //   'categories',
    // ],
     itemsWithCategories: 5,
     categoriesPerItem: 5,
    transformSource({ source }) {
      return {
        ...source,
        templates: {
        ...source.templates,
        item(params) {
          const { item } = params;          
          let currentQuery = item.query;

          const categoriesColumn = item.dev_ananas.facets.exact_matches.categories.map( item => {
            return (
            <li key={item.objectID} style="padding-bottom: 4px" onClick={(e) => searchCategory(e, currentQuery, item.value)}>
             {source.templates.item(params)} in {item.value}
            </li>
            )
          })
          const brandColumn = item.dev_ananas.facets.exact_matches.brand.map( item => {
            return (
            <li key={item.objectID} style="padding-bottom: 4px" onClick={(e) => searchBrand(e, currentQuery, item.value)}>
             {source.templates.item(params)} in {item.value}
            </li>
            )
          })

         return  (
          <div style="display: flex;">
            <div style="width: 30%" onClick={(e) => searchQuery(e, item.query)} >
              {source.templates.item(params)}
            </div>
            <div class="option" style="width: 30%; margin-right: 5%">
             <span>{categoriesColumn}</span>
            </div>    
            <div class="option" style="width: 30%">
             <span>{brandColumn}</span>
            </div>     
          </div>
         )
        },
        noResults() {
          return 'No products for this query.';
        },
      },
      };
    },
  });


  const containerRef = useRef(null);

  function uniqBy(predicate) {
    return function runUniqBy(...rawSources) {
      const sources = rawSources.flat().filter(Boolean);
  
      return sources.map(source => {
        const items = source.getItems();
        return {
          ...source,
          getItems() {
            return items;
          },
        };
      });
    };
  }

  const removeDuplicates = uniqBy(({ source, item }) =>
  source.sourceId === 'querySuggestionsPlugin' ? item.query : item.label
);


  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      plugins: [querySuggestionsPlugin],
      
      render({ children }, root) {
        render(children, root);
      },
      getSources: ({query}) => [
        {
          sourceId: 'product',
          templates: {
            // header(items) {
            //   const listItems =  items.items.map((item) => 
            //     <li key={item.objectID} style="margin-bottom: 8px; display: flex">                 
            //       <div style="margin: 4px">
            //         {
            //           item.categories.map((categorie) => {
            //             return <p style="padding-left: 8px; cursor: pointer;padding-top: 4px;padding-bottom:4px" key={categorie[0]}
            //               onClick={() => props.onSearchStateChange({
            //                 query: query,
            //                 hierarchicalMenu: { categories: categorie}
            //               })
            //             }
            //             >{query} in {categorie}</p>
            //           })
            //         }
            //       </div>

            //       <div style="margin: 4px">
            //           <p style="padding-left: 8px; cursor: pointer;padding-top: 4px;padding-bottom:4px"
            //             onClick={() => props.onSearchStateChange({
            //               refineamnjaentList: { brand: item.brand}
            //             })
            //           }
            //           >{query} in {item.brand}</p>
            //       </div>
            //     </li>
            
            //   );

            //   return (
            //     <ul>{listItems}</ul>
            //   );
       
            // },
            item({ item, components }) {
            //return <div className='klj'></div>
            },
            noResults() {
              return 'No products for this query.';
            },
          },

          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'dev_ananas',
                  query,
                },
              ],

            });
          },
        }
      ],
      ...props,
    })

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}