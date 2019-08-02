import React from 'react';
import { Table, Header, Rating } from 'semantic-ui-react'
import { formatMoney } from '../../../../services/api/helpers/formatMoney';



const EmployeeStatistics = (props) => {

    //no stats? no render
    if (!props || !props.stats) 
        return null;
    const { individual, aggregate } = props.stats;

    //no stats? no render
    if (!individual || !aggregate)
        return null;

    return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Count</Table.HeaderCell>
                    <Table.HeaderCell>Total Cost</Table.HeaderCell>
                    <Table.HeaderCell>Discount</Table.HeaderCell>
                    <Table.HeaderCell>...</Table.HeaderCell>
                    <Table.HeaderCell>...</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Total Employees: {aggregate.total}
                    </Table.Cell>
                    <Table.Cell singleLine={false}>
                        Total Cost: ${formatMoney(aggregate.totalAnnualCost)}
                    </Table.Cell>
                    <Table.Cell singleLine={false}>
                        Total Discount: ${formatMoney(aggregate.totalDiscounted)}
                    </Table.Cell>
                    <Table.Cell textAlign='left'>
                        ...
                    </Table.Cell>
                    <Table.Cell>
                        ...
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

export default EmployeeStatistics;