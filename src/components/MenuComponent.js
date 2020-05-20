import React, {Component} from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, CardGroup} from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
        console.log('Menu ici');
    }

    componentDidMount(){
        console.log('did mount');
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }

    renderDish(dish) {
        if (dish != null)
            return(
                <CardGroup>
                <Card  body inverse color="info">
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle tag="h2">{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                      <CardText>Price : {dish.price}</CardText>
                    </CardBody>
                 </Card>
                 <Card>
                        <CardTitle tag="h3">COMMENTS</CardTitle>
                        <CardText>{dish.comment}</CardText>
                        <CardText>{dish.author}</CardText>
                    
                </Card>
                </CardGroup>

            );
        else
            return(
                <div></div>
            );
    }
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-4 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                          <CardTitle tag="h3">{dish.name}</CardTitle>
                 
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });
        console.log('Menu 222 ici');
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.state.selectedDish)}
                  </div>
                </div>
            </div>
        );

    }

}

export default Menu;