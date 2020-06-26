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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import Loading from './LoadingComponent';
// import CommentForm from './CommentFormComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  handleSubmit(values) {
    // console.log("Current State is: " + JSON.stringify(values));
    // alert(
    //   "Current State is: " +
    //     JSON.stringify({
    //       author: values.author,
    //       rating: values.rating,
    //       comment: values.comment,
    //     })
    // );
    // event.preventDefault();
    this.toggleModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group mx-1">
                <Label htmlFor="username">Rating</Label>
                <Control.select
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group mx-1">
                <Label htmlFor="yourname">Your name</Label>
                <Control.text
                  model=".author"
                  className="form-control"
                  id="author"
                  name="author"
                  placeholder="Your name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "(Must be greater than 2 characters)",
                    maxLength: "(Must be 15 characters or less)",
                  }}
                />
              </Row>
              <Row className="form-group mx-1">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  className="form-control"
                  id="comment"
                  name="comment"
                  rows="6"
                  value={this.state.message}
                  onChange={this.handleInputChange}
                />
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
      </div>
    );
  }
}

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

  renderComments(comments, addComment, dishId) {
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
        <CommentForm dishId={dishId} addComment={addComment}/>
      </div>
    );
  }

  render() {
    const menu = this.props.dish;
    const comments_props = this.props.comments;
    const addComment = this.props.addComment;
    const dishId = this.props.dish.id
    const isLoading = this.props.isLoading;
    const errMess = this.props.errMess
    console.log(comments_props);

    if (isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{errMess}</h4>
          </div>
        </div>
      );
    }

    if (menu == null) {
      return <div></div>;
    }

    const dishDetail = this.renderDish(menu);
    const comments = this.renderComments(comments_props, addComment, dishId);
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
