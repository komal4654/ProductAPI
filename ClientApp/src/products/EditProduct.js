import React from 'react';
import select from 'react-select';
import { Row, Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
const apiUrl = "https://localhost:44354/api/Product/";
class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            productName: '',
            description: '',
            cost: '',
            active: '',
            categoryIDs: '',
            strCategory: [],
            errors: {},
        }
        if (props.products.id) {
            this.state = props.products
        }
        else {
            this.state = this.initialState;
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDDL = this.handleChangeDDL.bind(this);
        this.handleChangeActive = this.handleChangeActive.bind(this);
    }
  
  
    handleChangeActive(event) {
        const value = event.target.value==="true"?true:false;
        this.setState({
            active: value
        });
    }
   
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        //Name
        if (!fields["productName"]) {
            formIsValid = false;
            errors["name"] = "Product Name is required";
        }
        if (!fields["cost"]) {
            formIsValid = false;
            errors["cost"] = "Cost is required";
        }
        if (fields["strCategory"].length == 0) {
            formIsValid = false;
            errors["category"] = "Category is required";
        }
        this.setState({ errors: errors });
        return formIsValid;

    }
    handleChangeDDL(event) {
        var options = event.target.options;
        var strCategory = [];
        for (var s = 0; s < options.length; s++) {
            if (options[s].selected) {
                strCategory.push({ 'categoryID': options[s].value });
            }
        }
        this.setState({ strCategory: strCategory });
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
        pageTitle = "Edit Product"
        actionStatus = <b>Update</b>
        const str = this.state.strCategory;
        var val = [];
        this.state.strCategory.map((item, key) =>
            val.push(item.categoryID)
        );
        return (
            <div>
                <h2>{pageTitle}</h2>
                <Row>
                    <Col sm={5}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="ProductName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={this.state.productName}
                                    onChange={this.handleChange}
                                    placeholder="Product Name" />
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
                            <Form.Group controlId="cost">
                                <Form.Label>Cost</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cost"
                                    value={this.state.cost}
                                    onChange={this.handleChange}
                                    placeholder="Cost" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <select className="form-control" data-val="true" multiple={true} onChange={this.handleChangeDDL} defaultValue={val} >
                                    <option value="">-- Select Category --</option>
                                    {this.state.category.map((v, i) =>
                                        <option key={i} value={v.id}> {v.categoryName}</option>
                                    )}
                                </select>
                            </Form.Group>
                            <Form.Group controlId="active">
                                <Form.Label>Active</Form.Label>
                                <Form.Check
                                    inline
                                    checked={this.state.active === true}
                                    label="Yes"
                                    name="Active"
                                    value="true"
                                    type="radio"
                                    onChange={this.handleChangeActive}
                                />
                                <Form.Check
                                    inline
                                    checked={this.state.active === false}
                                    name="Active"
                                    value="false"
                                    label="No"
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
export default EditProduct