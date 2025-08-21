import React from "react";
import Table from "react-bootstrap/Table";
import "../../css/Diary.css";
function Diary() {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="month-column">MONTH</th>
            <th className="day-column">DAY</th>
            <th className="film-column">FILM</th>
            <th className="released-column">RELEASED</th>
            <th className="rating-column">RATING</th>
            <th className="like-column">LIKE</th>
            <th className="rewatch-column">REWATCH</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((_, index) => (
            <tr key={index}>
              <td className="month-column">JULY 2025</td>
              <td className="day-column">23</td>
              <td className="film-column">Fantastic Four</td>
              <td className="released-column">2025</td>
              <td className="rating-column">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </td>
              <td className="like-column">
                <i className="fa-solid fa-heart"></i>
              </td>
              <td className="rewatch-column">
                <i className="fa-solid fa-repeat"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Diary;
