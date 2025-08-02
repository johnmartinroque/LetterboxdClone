import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

function AddReview() {
  const [rating, setRating] = useState(0); // default value

  const handleRating = (rate) => {
    setRating(rate);
    console.log("Selected Rating:", rate);
    // you can add more logic here
  };

  return (
    <div>
      <Card style={{ height: "40rem", padding: "1rem" }}>
        <Card.Title style={{ color: "black" }}>Add Your Review</Card.Title>
        <Card.Body>
          <Card.Text>
            <i class="fa-solid fa-eye"></i>
            <i class="fa-solid fa-heart" style={{ color: "#ff8000" }}></i>
            <i class="fa-solid fa-plus"></i>
          </Card.Text>
          <Card.Text>
            <Rating
              onClick={handleRating}
              allowFraction
              initialValue={rating}
              ratingValue={rating}
              maxValue={5}
              size={30} // optional: controls star size
              transition // smooth transitions
              fillColor="#ffe601ff" // optional: star color
              emptyColor="#ccc" // optional: empty star color
            />
            <div style={{ marginTop: "1rem" }}>
              Selected Rating: {rating} / 6
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddReview;
