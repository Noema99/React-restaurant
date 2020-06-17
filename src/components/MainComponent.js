import React, { Component } from "react";
import { Switch, Route, Redirect , withRouter } from "react-router-dom";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import About from "./AboutComponent";
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos , fetchLeaders, postFeedback} from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// const to conneect to redux store
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }

}

// use the actions
const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => 
      dispatch(postComment(dishId, rating, author, comment)),
        
      
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message,id) =>
        dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message,id)),
  resetFeedbackForm: () => {
          dispatch(actions.reset("feedback"));
  },

  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {
  /*constructor(props) {
    super(props); 
  }*/

  // use the actions of fetch 

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  // to connect  to Redux store and use it
  render() {
    const HomePage = () => {
      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}

        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}

        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
    />
    
      );
    }

// make the action available for use within the DishdetailComponent
    const DishWithId = ({match}) => {
      return(
        <DishDetail
        dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}

        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        addComment={this.props.addComment}
        postComment={this.props.postComment}
      />
      );
    };

  
 //integrate the header and footer into our application
 //configuring the Router
    return (
      <div>
        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => <About 
                      leaders={this.props.leaders} 
                     /* leaderLoading={this.props.leaders.isLoading}
                      leaderErrMess={this.props.leaders.errMess}*/
                      />} 
                  />
                  <Route exact path='/menu' component={() => <Menu 
                      dishes={this.props.dishes} />}
                  />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Contact
                      resetFeedbackForm={this.props.resetFeedbackForm}
                      postFeedback={this.props.postFeedback}
                    />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));