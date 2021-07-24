import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { getValue } from '@utils/object';

export default function CustomTable(props) {
  const {
    columns,
    rows = [],
    emptyText,
    ...tableProps
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table {...tableProps}>
        {columns && (
          <TableHead>
            <TableRow>
              {columns.map(([columnName]) => <TableCell key={columnName}>{columnName}</TableCell>)}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.length
            ? rows.map(row => (
              <TableRow key={row}>
                {columns.map(([, props]) => (
                  <TableCell key={props}>{String(getValue(row, ...props))}</TableCell>
                ))}
              </TableRow>
            )) : (
              emptyText && (
              <TableRow>
                <TableCell>{emptyText}</TableCell>
              </TableRow>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
