import React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Modal from '../components/Modal'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'productTitle', headerName: 'Product Title', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'category', headerName: 'Category', width: 100 },
  { field: 'regularPrice', headerName: 'Regular Price', width: 120 },
  { field: 'extraPrice', headerName: 'Extra Price', width: 120 },
  { field: 'taxAmount', headerName: 'Tax Amount', width: 120 },
  { field: 'totalStock', headerName: 'Total Stock', width: 120 },
  { field: 'action', headerName: 'Action', width: 120 }
];

const ProductList = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <TableContainer sx={{minHeight: 400, minWidth: '100%'}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                  <StyledTableCell key={col.field}>{col.headerName}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {product.id + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{product.productTitle}</StyledTableCell>
                <StyledTableCell align="right">{product.description}</StyledTableCell>
                <StyledTableCell align="right">{product.category}</StyledTableCell>
                <StyledTableCell align="right">{product.regularPrice}</StyledTableCell>
                <StyledTableCell align="right">{product.extraPrice}</StyledTableCell>
                <StyledTableCell align="right">{product.taxAmount}</StyledTableCell>
                <StyledTableCell align="right">{product.totalStock}</StyledTableCell>
                <StyledTableCell align="right"><Modal /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
};

export default ProductList;
