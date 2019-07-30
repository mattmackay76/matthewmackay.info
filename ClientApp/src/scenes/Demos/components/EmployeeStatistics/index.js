import React from 'react';
import { Table, Header, Rating } from 'semantic-ui-react'

const EmployeeStatistics = (props) => (
    <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell singleLine>Aggregate </Table.HeaderCell>
                <Table.HeaderCell>Effect</Table.HeaderCell>
                <Table.HeaderCell>Efficacy</Table.HeaderCell>
                <Table.HeaderCell>Consensus</Table.HeaderCell>
                <Table.HeaderCell>Comments</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <Header as='h2' textAlign='center'>
                        A
                             </Header>
                </Table.Cell>
                <Table.Cell singleLine>Power Output</Table.Cell>
                <Table.Cell>
                    <Rating icon='star' defaultRating={3} maxRating={3} />
                </Table.Cell>
                <Table.Cell textAlign='right'>
                    80% <br />
                    <a>18 studies</a>
                </Table.Cell>
                <Table.Cell>
                    Creatine supplementation is the reference compound for increasing muscular creatine
                    levels; there is variability in this increase, however, with some nonresponders.
                        </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);

export default EmployeeStatistics;