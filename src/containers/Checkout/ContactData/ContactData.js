import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'


class ContactData extends Component {


    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        totalPice: 0,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Vivek Singh",
                address: {
                    street: 'bikaner',
                    country: 'india'
                },
                email: 'viveksinghreborn@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order).then(
            response => {
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/')
            }
        ).catch(
            error => {
                this.setState({ loading: false, purchasing: false })
            }
        )

    }

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Your Name" />
                <input className="Input" type="email" name="email" placeholder="Your email" />
                <input className="Input" type="text" name="street" placeholder="Street" />
                <input className="Input" type="text" name="postal" placeholder="Postal Code" />
                <Button clicked={this.orderHandler} btnType="Success" >Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }



        return (
            <div className="ContactData">
                <h4>Enter your contact Data</h4>
                {form}
            </div>

        )

    }
}
export default ContactData;