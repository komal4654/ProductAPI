﻿import React from 'react';
import select from 'react-select';
import { Row, Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
class AddProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            categoryName: '',
            description: '',
            active: true,
            errors: {}
        }
       
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeActive = this.handleChangeActive.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }


    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        //Name
        if (!fields["categoryName"]) {
            formIsValid = false;
            errors["name"] = "Product Category is required";
        }

        this.setState({ errors: errors });
        return formIsValid;

    }
  
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleChangeActive(event) {
        alert("dff");
        alert(event.target.value);
        const value = event.target.value === "true" ? true : false;
        this.setState({
            active: value
        });
    }

   
    handleSubmit(event) {
        event.preventDefault();
        const valid = this.handleValidation();
        if (valid) {
            this.props.onFormSubmit(this.state);
            this.setState(this.initialState);
        }
    }
    render() {
        let pageTitle;
        let actionStatus;
        pageTitle = "Add Product Category"
        actionStatus = <b>Save</b>

            return (
                <div>
                    <h2>{pageTitle}</h2>
                    <Row>
                        <Col sm={5}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="CategoryName">
                                    <Form.Label>Product Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="categoryName"
                                        value={this.state.categoryName}
                                        onChange={this.handleChange}
                                        placeholder="Product Category" />
                                    <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        placeholder="Description" />
                                </Form.Group>
                                <Form.Group controlId="active">
                                    <Form.Label>Active</Form.Label>
                                    <Form.Check
                                        inline
                                        name="Active"
                                        value="true"
                                        defaultChecked
                                        label="Yes"
                                        type="radio"
                                        onChange={this.handleChangeActive}
                                    />
                                    <Form.Check
                                        inline
                                        label="No"
                                        name="Active"
                                        value="false"
                                        type="radio"
                                        onChange={this.handleChangeActive}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="hidden" name="id" value={this.state.id} />
                                    <Button variant="success" type="submit">{actionStatus}</Button>

                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        }
}
export default AddProductCategory