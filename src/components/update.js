import axios from 'axios';
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Update = () => {
  let history = useHistory();
  const [ id, setId ] = useState(null);
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ checkbox, setCheckbox ] = useState(false);

  useEffect(() => {
    setId(localStorage.getItem('ID'));
    setFirstName(localStorage.getItem('First Name'));
    setLastName(localStorage.getItem('Last Name'));
    setCheckbox(JSON.parse(localStorage.getItem('Checkbox value'))); // https://codippa.com/how-to-convert-string-to-boolean-javascript/
  }, [])

  const updateUser = () => {
    axios.put(`https://61008c3dbca46600171cf917.mockapi.io/api/v1/fakeData/${id}`, {
      firstName, lastName, checkbox
    })
    .then(() => history.push('/read'))
    .catch(err => console.log(err))
  }

  return (
    <Form className="create-form">
    <Form.Field>
      <label>First Name</label>
      <input value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <Checkbox checked={checkbox} label='I agree to the Terms and Conditions' onChange={(e, d) => setCheckbox(d.checked)}/> {/* https://stackoverflow.com/questions/55823965/event-target-value-returns-undefined-with-semantic-ui-when-i-console-log-it */}
    </Form.Field>
    <Button type='submit' onClick={updateUser}>Update</Button>
  </Form>
  )
}

export default Update;