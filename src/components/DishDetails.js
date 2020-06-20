import React, { Component } from "react";
// import { Media } from 'reactstrap';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

class DishDetails extends Component {
  renderDish(dish) {
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

  renderComments(comments) {
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

  render() {
    const  menu  = this.props.dish;
    const comments_props = this.props.comments;
    console.log(comments_props);
    
    if (menu == null) {
      return <div></div>;
    }
    
    const dishDetail = this.renderDish(menu);
    const comments = this.renderComments(comments_props);
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{menu.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{menu.name}</h3>
            <hr />
          </div>
          <div className="row">
            {dishDetail}
            {comments}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetails;
