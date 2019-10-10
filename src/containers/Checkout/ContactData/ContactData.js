import React, { Component } from 'react';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Mihai Stanica',
                address: {
                    street: 'Test 1',
                    zipCode: '061206',
                    country: 'Romania'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
            this.props.history.push("/");
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false})
            });
    }

    render() {
        let form =(
            <form>
                <input type="text" name="name" placeholder="Your Name"></input>
                <input type="text" name="email" placeholder="Your Email"></input>
                <input type="text" name="street" placeholder="Street"></input>
                <input type="text" name="name" placeholder="Postal Code"></input>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>    
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;