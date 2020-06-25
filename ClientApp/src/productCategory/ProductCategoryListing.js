import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Form } from 'reactstrap';
const apiUrl = "https://localhost:44354/api/ProductCategories";


class ProductCategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            productsCategory: [],
            response: {}
        }
    }
    componentDidMount() {
        axios.get(apiUrl + '/GetProductCategoryListing')
            .then(response => response.data).then(
                (result) => {
                    this.setState({
                        productsCategory: result
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    deleteProductCat(id) {
        const { productsCategory } = this.state;
        fetch(apiUrl + '/DeleteProductsCategory/' + id, { method: 'post' }).then(result => {
            this.setState({
                response: result,
                productsCategory: productsCategory.filter(prod => prod.id !== id)
            });
        });
    }

    render() {
        const { error, productsCategory } = this.state;

        if (error) {
            return (
                <div>Error:{error.message}</div>
            )
        }
        else {
            return (
                <div>
                    <Table>
                        <thead className="btn-primary">
                            <tr>
                                <th>Product Category</th>
                                <th>Description</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsCategory ?
                                    productsCategory.map(prod => (
                                        <tr key={prod.id}>
                                            <td>{prod.categoryName}</td>
                                            <td>{prod.description}</td>
                                            <td>{prod.active === true ? "Yes" : "No"}</td>
                                            <td><Button variant="info" onClick={() => this.props.editProductCat(prod.id)}>Edit</Button>
                                                <Button variant="danger" onClick={() => this.deleteProductCat(prod.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))
                                    : "Loading"}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}
export default ProductCategoryList; 