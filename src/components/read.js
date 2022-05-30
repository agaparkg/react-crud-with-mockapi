import axios from 'axios';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';

const Read = () => {
  const [apiData, setApiData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {
      axios
        .get('https://6294c225a7203b3ed070594b.mockapi.io/api/v1/fakeData')
        .then((res) => {
          setIsLoading(true);
          setApiData(res.data);
        })
        .catch((err) => console.log(err));
    }, 1500);
  }, []);

  const handleUpdate = (userData) => {
    const { id, firstName, lastName, checkbox } = userData;

    localStorage.setItem('ID', id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Terms & Conditions Agree?', checkbox);
  };

  const reFetchData = () => {
    setIsLoading(false);
    setTimeout(() => {
      axios
        .get('https://6294c225a7203b3ed070594b.mockapi.io/api/v1/fakeData')
        .then((res) => {
          setIsLoading(true);
          setApiData(res.data);
        })
        .catch((err) => console.log(err));
    }, 1500);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://6294c225a7203b3ed070594b.mockapi.io/api/v1/fakeData/${id}`
      )
      .then(() => {
        setIsDeleted(true);
        setTimeout(() => {
          setIsDeleted(false);
          reFetchData();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  const loadingElement = (
    <div className='ui segment bg-color'>
      <div className='ui active dimmer'>
        <div className='ui text loader'>Loading</div>
      </div>
      <p></p>
    </div>
  );

  const mainElement = (
    <div className='read-route'>
      <div
        className={classNames(
          'ui message',
          { negative: isDeleted },
          { noshow: !isDeleted }
        )}
      >
        <div className='header'>Success!!</div>
        <p>User has been deleted.</p>
      </div>
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
          {apiData.map((user, idx) => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell
                  style={{
                    textAlign: 'center',
                    color: user['Terms & Conditions Agree?'] ? 'green' : 'red',
                  }}
                >
                  {user['Terms & Conditions Agree?'] ? 'YES' : 'NO'}
                </Table.Cell>
                <Table.Cell>
                  <Link to='/update'>
                    <Button
                      className='ui button primary'
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </Button>
                  </Link>
                  <Button
                    className='ui button negative'
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );

  return !isLoading ? loadingElement : mainElement;
};

export default Read;
