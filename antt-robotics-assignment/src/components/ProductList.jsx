import React from 'react';
import Table from '@mui/material/Table';
import Modal from '../components/Modal';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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
  { field: 'photo', headerName: 'Photo', width: 120 },
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
                <StyledTableCell align="left">{product.productTitle}</StyledTableCell>
                <StyledTableCell align="left">{`${product.description.substring(1, 50)}...`}</StyledTableCell>
                <StyledTableCell align="left">{product.category}</StyledTableCell>
                <StyledTableCell align="left">{product.regularPrice}</StyledTableCell>
                <StyledTableCell align="left">{product.extraPrice}</StyledTableCell>
                <StyledTableCell align="left">{product.taxAmount}</StyledTableCell>
                <StyledTableCell align="left">{product.totalStock}</StyledTableCell>
                <StyledTableCell align="left">
                  {product.photos.map((file, index) => (
                      <img 
                          key={index} 
                          src={file.preview || URL.createObjectURL(file)} 
                          alt={`Photo ${index}`} 
                          style={{ width: '50px', height: '50px', margin: '10px' }} 
                      />
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right"><Modal product={product} /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  );
};

export default ProductList;
