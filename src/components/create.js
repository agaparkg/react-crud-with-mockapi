import axios from 'axios';
import {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'


const Create = () => {
  let history = useHistory();
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ checkbox, setCheckbox ] = useState(false);

  const postData = () => {
    axios.post('https://61008c3dbca46600171cf917.mockapi.io/api/v1/fakeData', {
      firstName, lastName, 'Terms & Conditions Agree?': checkbox
    })
    .then(() => history.push('/read'))
    .catch(err => console.log(err))
  }

  return (
    <Form className="create-form">
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' onChange={(e, d) => setCheckbox(d.checked)}/> {/* https://stackoverflow.com/questions/55823965/event-target-value-returns-undefined-with-semantic-ui-when-i-console-log-it */}
    </Form.Field>
    <Button type='submit' onClick={postData}>Submit</Button>
  </Form>
  )
}

export default Create;