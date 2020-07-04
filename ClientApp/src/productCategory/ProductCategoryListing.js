import React, { Component } from 'react';
import { Table, Button ,Form} from 'react-bootstrap';
import axios from 'axios';
const apiUrl = "https://localhost:44354/api/ProductCategories";


class ProductCategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            productsCategory: [],
            response: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

    onFormSubmit(data) {
        axios.post(apiUrl + '/SearchProductCategory', data).then(response => response.data).then(
            (result) => {
                this.setState({
                    productsCategory: result
                });
            });
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.onFormSubmit(this.state);
        this.setState(this.state);
    }
    deleteProductCat(id) {
        const { productsCategory } = this.state;
        fetch(apiUrl + '/DeleteProductsCategory/' + id, { method: 'post' })
            .then(response => response.data).then(
                (result) => {
                    this.setState({
                        response: result,
                        productsCategory: productsCategory
                      //  isProductCatListing:true
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            );
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
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="CategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoryName"
                                value={this.state.categoryName}
                                onChange={e => this.handleChange(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="success" type="submit">Search</Button>

                        </Form.Group>
                    </Form>

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