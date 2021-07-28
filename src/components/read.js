import { Button, Table } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Read = () => {

  const [apiData, setApiData] = useState([])

  useEffect(() => {
    axios.get('https://61008c3dbca46600171cf917.mockapi.io/api/v1/fakeData')
    .then(res => setApiData(res.data))
    .catch(err => console.log(err))
  }, [])

  const handleUpdate = (userData) => {
    const { id, firstName, lastName, checkbox } = userData;

    localStorage.setItem('ID', id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Checkbox value', checkbox);
  }
  
  const reFetchData = () => {
    axios.get('https://61008c3dbca46600171cf917.mockapi.io/api/v1/fakeData')
    .then(res => setApiData(res.data))
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete(`https://61008c3dbca46600171cf917.mockapi.io/api/v1/fakeData/${id}`)
    .then(() => {
      console.log("User has been successfully deleted!");
      reFetchData();
    })
    .catch(err => console.log(err))
  }

  return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Terms &amp; Conditions Agree?</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      { apiData.map((user, idx) => {
        return (
          <Table.Row key={ user.id }>
            <Table.Cell>{ idx + 1}</Table.Cell>
            <Table.Cell>{ user.firstName}</Table.Cell>
            <Table.Cell>{ user.lastName }</Table.Cell>
            <Table.Cell style={{textAlign: 'center', color: user['Terms & Conditions Agree?'] ? 'green' : 'red'}}>{ user['Terms & Conditions Agree?'] ? "YES": "NO"}</Table.Cell>
            <Table.Cell>
              <Link to="/update">
                <Button onClick={() => handleUpdate(user)}>Update</Button></Link>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
            </Table.Cell>
        </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
  )
}

export default Read;