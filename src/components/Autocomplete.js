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

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'dev_ananas_query_suggestions',
    getSearchParams({ state }) {
      return { hitsPerPage: 10 };
    },
    categoryAttribute: [
      'dev_ananas',
      'facets',
      'exact_matches',
      'categories',
    ],
    itemsWithCategories: 2,
    categoriesPerItem: 3,
    brandAttribute: [
      'dev_ananas',
      'facets',
      'exact_matches',
      'brands',
    ],
    itemsWithBrands: 2,
    brandsPerItem: 3,
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ item }) {
          console.log('onSelect', item)
          // Assuming the `setSearchState` function updates the search page state.
          props.onSearchStateChange({
            query: item.query,
            category: item.__autocomplete_qsCategory,
          });
        },
        onStateChange(){
          console.log('promena')
        }
      };
    },
  });

  const containerRef = useRef(null);


  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      plugins: [querySuggestionsPlugin],
      // render({ children }, root) {
      //   render(children, root);
      // },
      // getSources: ({query}) => [
      //   {
      //     sourceId: 'actions',
      //     templates: {
      //       item({ item, components }) {
      //       return <AutocompleteTemplate hit={item} components={components} setHit={props.setHit} />
      //       },
      //       noResults() {
      //         return 'No products for this query.';
      //       },
      //     },

      //     getItems() {
      //       return getAlgoliaResults({
      //         searchClient,
      //         queries: [
      //           {
      //             indexName: 'dev_ananas',
      //             query,
      //           },
      //         ],
      //         // onSelect(params){
      //         //   console.log('params', params)
      //         // }
      //       });
      //     },

// //           onSelect(params){
// //             const {item, setQuery} = params;
// //             item.onSelect(params);
// //             setQuery("");
// //           }
      //   }
      // ],
      ...props,
    })

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}