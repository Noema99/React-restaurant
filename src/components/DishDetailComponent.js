import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

  //parameters conditions
  const required = val => val && val.length;
  const maxLength = len => val => !val || val.length <= len;
  const minLength = len => val => val && val.length >= len;


class  CommentForm  extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
// add new modal to the app to host the form
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
 // to handle the values entered and submited and to show them in an alert
  handleSubmit(values) {
    this.toggleModal();
    // initiate the action upon the user submitting the comment form
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  // the comment form to fill out with the rating[1-5], the full name and the comment 
  //this comment will be displayed with the others on the list of the dishe's comments
  render() {
  return(
    <div>
      <Button outline onClick={this.toggleModal}>
           <span className="fa fa-pencil" /> Submit Comment
      </Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment here </ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={this.handleSubmit}>
                          <Row className="form-group">
                                        <Label htmlFor="rating" md={4}>Rating</Label>
                                         <Col md={{ size: 3 }}>
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
                                          </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Your Feedback</Label>
                                <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="5"
                                        className="form-control" />
                                </Col>
                            </Row>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                               
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
}}

// function that render the dish image, name, description and price in a card 
function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    <CardText>{dish.price}</CardText>
                </CardBody>
            </Card>
         </FadeTransform>
    </div>
  );
}

//function that render with animation ( using stagger and fade) the dish's comments, thein authors and the date
//to print out the date for a comment in a format more suitable for human readability 
function RenderComments({comments, postComment, dishId}) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
         </Stagger>
         <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else return <div />;
}
// fetching dishes' details from redux store with steps 
//loarding while fetching the details and send them to the client side
//error message if there's an error on the net, or a problem in communication client-serveur
const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
};
export default DishDetail;