import React, { Component } from 'react'
import Aux from '../../hoc/Auxh'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-app-13c1a.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            }
            ).catch(error => {
                this.setState({ error: true });
            });
    }

    updatedPurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPice;
        const newPrice = oldPrice + priceAddition

        this.setState({
            totalPice: newPrice,
            ingredients: updatedIngredient
        })
        this.updatedPurchaseState(updatedIngredient)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPice;
        const newPrice = oldPrice + priceDeduction;

        this.setState({
            totalPice: newPrice,
            ingredients: updatedIngredient
        })
        this.updatedPurchaseState(updatedIngredient)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPice,
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
                this.setState({ loading: false, purchasing: false })
            }
        ).catch(
            error => {
                this.setState({ loading: false, purchasing: false })
            }
        )
    }


    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        disabled={disableInfo}
                        price={this.state.totalPice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientremoved={this.removeIngredientHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.state.totalPice.toFixed(2)}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                porchaseContinued={this.purchaseContinueHandler}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    }
}

export default withErrorHandler(BurgerBuilder, axios);