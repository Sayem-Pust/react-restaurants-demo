import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

export default function DishDetailsComponent({dish}) {
  console.log(dish)
  
  const RenderDish =({dish}) => {
    if (dish != null)
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    else return <div></div>;
  }

  const renderComments = (comments) => {
    const comment = comments.map((comment) => {
      // var date = new Date(comment.date);
      // const months = [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ];
      // var date_format =
      //   months[date.getMonth()] +
      //   " " +
      //   date.getDate() +
      //   ", " +
      //   date.getFullYear();
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            --{comment.author},
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>
          <b>Comments</b>
        </h4>
        <div className="list-unstyled">{comment}</div>
      </div>
    );
  }

  if (dish == null) {
    return <div></div>;
  }
  // const dishDetail = renderDish(dish);
    const comments = renderComments(dish.comments);
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish = {dish} />
          {comments}
        </div>
      </div>
    );
  // return (
  //   <div>
      
  //   </div>
  // )
}
