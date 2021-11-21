import React from 'react';
import { connectRange } from 'react-instantsearch-dom';

const Ratings = ({ currentRefinement, refine, createURL, count }) => {
  const counteSortedByValue = count.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  const stars = new Array(count.length).fill(null);

  return (
    <div className="ais-RatingMenu">
      <ul className="ais-RatingMenu-list">
        {counteSortedByValue.map((rating, ratingIndex) => {

          const isRatingSelected =
              parseFloat(rating.value) === currentRefinement.min && parseFloat(rating.value) === currentRefinement.max ?
              true : false;
          
          return (
            <li
              className={`ais-RatingMenu-item ${isRatingSelected ? 'ais-RatingMenu-item--selected' : '' }
              ${rating.count === 0 ? 'ais-RatingMenu-item--disabled' : ''}`}
              key={rating.value}
            >
              <a
                className="ais-RatingMenu-link"
                aria-label={`${rating.value} & up`}
                href={createURL(rating.value)}
                onClick={(event) => {
                  event.preventDefault();
                  refine({ min: rating.value, max: rating.value });
                }}
              >
                {stars.map((_, starIndex) => {
                  const starNumber = starIndex;
                  const isStarFull = starNumber < counteSortedByValue.length - ratingIndex;

                  return (
                    <svg
                      key={starIndex}
                      className={`ais-RatingMenu-starIcon ${isStarFull ? 'ais-RatingMenu-starIcon--full' : 'ais-RatingMenu-starIcon--empty'}`}
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      width="16px"
                      height="16px"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
                      />
                    </svg>
                  );
                })}

                <span className="ais-RatingMenu-count">{rating.count}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const CustomRatings =  connectRange(Ratings);
