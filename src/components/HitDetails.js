import React from 'preact/compat';
import './HitDetails';
const HitDetails = (props) => {
  const {
  brand,
  description,
  free_shipping,
  image,
  name,
  popularity,
  price,
  rating
  } = props.selectedHit;

  return (
    <div className="hit-details-wrapper">
      <div>
        <img src={image} alt={name} />
      </div>
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
};

export default HitDetails;

