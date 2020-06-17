import React from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';

import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

// render the card with animation on the home page by fetching the items from redux store 
function RenderCard({item, isLoading, errMess}) {
    
        if (isLoading) {
            return(
                    <Loading />
            );
        }
        else if (errMess) {
            return(
                    <h4>{errMess}</h4>
            );
        }
        else 
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                   <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
            );
    
    }

  //fetch and display the featured dish, promotion and leader 
function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                <RenderCard item={props.dish} 
                isLoading={props.dishesLoading}
                errMess={props.dishesErrMess}  />
                </div>

                <div className="col-12 col-md m-1">
                <RenderCard item={props.promotion} 
                isLoading={props.promoLoading}
                 errMess={props.promoErrMess} />
                </div>

                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                    isLoading={props.leadersLoading}
                    errMess={props.leadersErrMess}  />
                </div>
            </div>
        </div>
    );
}

export default Home;