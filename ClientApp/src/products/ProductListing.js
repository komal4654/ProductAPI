import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
const apiUrl = "https://localhost:44354/api/Product";


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            response: {},
        }
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
                    <Table>
                        <thead className="btn-primary">
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Cost</th>
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