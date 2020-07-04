import React, { Component } from 'react';
import { Container, Button,Form } from 'react-bootstrap';
import ProductList from './ProductListing';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import axios from 'axios';

const apiUrl = "https://localhost:44354/api/Product/";

class ProductApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddProduct: false,
            isEditProduct: false,
            isSearchProduct:false,
            isProductListing: true,
            error: null,
            response: {},
            products: {},
            strCategory: [],
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }
    

    onAdd() {
        this.setState({ isAddProduct: true });
        this.setState({ isEditProduct: false });
        this.setState({ isProductListing: false });
    }
    onDetails() {
        this.setState({ isProductListing: true });
        this.setState({ isAddProduct: false });
        this.setState({ isEditProduct: false });
    }
    onFormSubmit(data) {
        if (this.state.isEditProduct) {
            axios.post(apiUrl + 'UpdateProducts', data).then(result => {
                this.setState({
                    response: result,
                    isProductListing: true,
                    isAddProduct: false,
                    isEditProduct: false
                })
            });
        }
        else {
            axios.post(apiUrl + 'AddProducts', data).then(result => {
                this.setState({
                    response: result,
                    isProductListing: true,
                    isAddProduct: false,
                    isEditProduct:false
                })
            });
           
        }
    }

    editProduct = id => {
        this.setState({
            isProductListing: false,
            isAddProduct: false,
        });
        fetch(apiUrl + 'GetProductListById/' + id).then(response => {

            return response.json();
        })
            .then(response => {
                debugger;
                this.setState({
                    isAddProduct: false,
                    isEditProduct: true,
                    products: response
                });
            },
                (error) => {
                    this.setState({ error });
                }
            )
    }
    render() {
        
        let userForm;
            if (this.state.isAddProduct) {
                userForm = <AddProduct onFormSubmit={this.onFormSubmit} products={this.state.products} />
            }
            else if (this.state.isEditProduct) {
                userForm = <EditProduct onFormSubmit={this.onFormSubmit} products={this.state.products} />
            }
        return (
            <div className="App">
                <Container>
                  
                    <h1 style={{ textAlign: 'center' }}>Product Listing</h1>
                    <hr></hr>
                    {!this.state.isProductListing && <Button variant="primary" onClick={() => this.onDetails()}> Product Details</Button>}
                    {!this.state.isAddProduct && !this.state.isEditProduct && <Button variant="primary" onClick={() => this.onAdd()}>Add Products</Button>}
                    <br></br>
                    {!this.state.isEditProduct && !this.state.isAddProduct && <ProductList editProduct={this.editProduct} />}
                    {userForm}

                </Container>
            </div>
        );
    }
}
export default ProductApp;  