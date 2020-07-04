import React, { Component } from 'react';
import { Table, Button,Form } from 'react-bootstrap';
import axios from 'axios';
const apiUrl = "https://localhost:44354/api/Product";


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            response: {},
            productName: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(apiUrl + '/GetProductListing')
            .then(response => response.data).then(
                (result) => {
                    this.setState({
                        products: result
                    });
                },
                (error) => {
                    this.setState({ error });
                }
        )
    }
    onFormSubmit(data) {
        axios.post(apiUrl + '/SearchProduct', data).then(response => response.data).then(
            (result) => {
                this.setState({
                    products: result
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
    deleteProduct(id) {
        const { products } = this.state;
        fetch(apiUrl + '/DeleteProducts/' + id, { method: 'post' }).then(result => {
            this.setState({
                response: result,
                products: products.filter(prod => prod.id !== id)
            });
        });
    }

    render() {
        // let { products } = this.state
        // console.log(products);
        const { error, products } = this.state;
        if (error) {
            return (
                <div>Error:{error.message}</div>
            )
        }
        else {
            return (
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="ProductName">
                            <Form.Label>Product Name/Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                value={this.state.productName}
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
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Cost</th>
                                <th>Category</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products ?
                                    products.map(prod => (
                                        <tr key={prod.id}>
                                            <td>{prod.productName}</td>
                                            <td>{prod.description}</td>
                                            <td>{prod.cost}</td>
                                            <td>{prod.categories}</td>
                                            <td>{prod.active === true ? "Yes" : "No"}</td>
                                            <td><Button variant="info" onClick={() => this.props.editProduct(prod.id)}>Edit</Button>
                                                <Button variant="danger" onClick={() => this.deleteProduct(prod.id)}>Delete</Button>
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
export default ProductList; 