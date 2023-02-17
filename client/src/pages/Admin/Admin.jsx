//admin.jsx for admin page
//admin page will have a table of all users
//admin page will have a table of all products
//admin page will have a table of all categories
//admin page will have a form to add a new user
//admin page will have a form to add a new product
//admin page will have a form to add a new category
//admin page will have a form to edit a user
//admin page will have a form to edit a product
//admin page will have a form to edit a category
//admin page will have a form to delete a user
//admin page will have a form to delete a product
//admin page will have a form to delete a category
//admin page will have a form to add a new user
//admin page will have a form to add a new product
//admin page will have a form to add a new category

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, TextField, Grid, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { getUsers, deleteUser } from '../../redux/actions/userActions';
import { getProducts, deleteProduct } from '../../redux/actions/productActions';
import { getCategories, deleteCategory } from '../../redux/actions/categoryActions';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: { minWidth: 650 },
    tableContainer: { margin: theme.spacing(2) },  
    tableHead: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
    tableCell: { color: theme.palette.common.white },
    tableRow: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.background.default } },
    tablePagination: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white },
    button: { margin: theme.spacing(1) },
    textField: { margin: theme.spacing(1) },
    grid: { margin: theme.spacing(1) },
    typography: { margin: theme.spacing(1) }
});

class Admin extends Component {

    state = {
        users: [],
        products: [],
        categories: [],
        user: {
            id: '',
            username: '',
            password: '',
            role: ''
        },
        product: {
            id: '',
            name: '',
            description: '',
            price: '',
            category: ''
        },
        category: {
            id: '',
            name: ''
        },
        page: 0,
        rowsPerPage: 5
    };

    componentDidMount() {
        this.props.getUsers();
        this.props.getProducts();
        this.props.getCategories();
    }

    componentDidUpdate(prevProps) {
        if (this.props.users !== prevProps.users) {
            this.setState({ users: this.props.users });
        }
        if (this.props.products !== prevProps.products) {
            this.setState({ products: this.props.products });
        }
        if (this.props.categories !== prevProps.categories) {
            this.setState({ categories: this.props.categories });
        }
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    }; 
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: +event.target.value });
        this.setState({ page: 0 });
    };
}
