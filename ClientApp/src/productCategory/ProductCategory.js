import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import ProductCategoryList from './ProductCategoryListing';
import AddProductCategory from './AddProductCategory';
import EditProductCategory from './EditProductCategory';
import axios from 'axios';


const apiUrl = "https://localhost:44354/api/ProductCategories/";

class ProductCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddProductCat: false,
            isEditProductCat: false,
            isProductCatListing: true,
            error: null,
            response: {},
            productsCategory: {}
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onAdd() {
        this.setState({ isAddProductCat: true });
        this.setState({ isProductCatListing: false });
        this.setState({ isEditProductCat: false });
    }
    onDetails() {
        this.setState({ isProductCatListing: true });
        this.setState({ isAddProductCat: false });
        this.setState({ isEditProductCat: false });
    }
    onFormSubmit(data) {

        if (this.state.isEditProductCat) {

            axios.post(apiUrl + 'UpdateProductCategory', data).then(result => {
                this.setState({
                    response: result,
                    isAddProductCat: false,
                    isEditProductCat: false,
                    isProductCatListing: true
                })
            });
        }
        else {
            axios.post(apiUrl + 'AddProductCategory', data).then(result => {
                this.setState({
                    response: result,
                    isAddProductCat: false,
                    isEditProductCat: false,
                    isProductCatListing:true
                })
            });
        }

    }

    editProductCat = id => {
        this.setState({
            isProductCatListing: false,
            isAddProductCat: false
        });
        fetch(apiUrl + 'GetProductCategoryListById/' + id).then(response => {

            return response.json();
        })
            .then(response => {
                this.setState({
                    isAddProductCat: false,
                    isEditProductCat: true,
                    productsCategory: response
                });
            },
                (error) => {
                    this.setState({ error });
                }
            )
    }
    render() {

        let userForm;
        if (this.state.isAddProductCat) {
            userForm = <AddProductCategory onFormSubmit={this.onFormSubmit} productsCategory={this.state.productsCategory} />
        }
        else if (this.state.isEditProductCat) {
            userForm = <EditProductCategory onFormSubmit={this.onFormSubmit} productsCategory={this.state.productsCategory} />
        }
        return (
            <div className="App">
                <Container>
                    <h1 style={{ textAlign: 'center' }}>Product Category</h1>
                    <hr></hr>
                    {!this.state.isProductCatListing && <Button variant="primary" onClick={() => this.onDetails()}> Product Category Details</Button>}
                    {!this.state.isAddProductCat && !this.state.isEditProductCat && <Button variant="primary" onClick={() => this.onAdd()}>Add Product Category</Button>}
                    <br></br>
                    {!this.state.isEditProductCat && !this.state.isAddProductCat && <ProductCategoryList editProductCat={this.editProductCat} />}
                    {userForm}

                </Container>
            </div>
           
        );
    }
}
export default ProductCategory;  