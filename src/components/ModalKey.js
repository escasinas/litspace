import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from'react-bootstrap/Form';

function ModalKey() {
    const [show, setShow] = useState(false);
    const [key, setKey] = useState('');
    const [keyState, setKeyState] = useState('');
    const [switchState, setSwitchState] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('myKey') === null && sessionStorage.getItem('myKey') === null) {
            setShow(true);
        } else if (localStorage.getItem('myKey') !== '' || sessionStorage.getItem('myKey') !== '') {
            setKeyState("X".repeat(40));
        }
    }, []);

    const handleSwitch = () => {
        setSwitchState(!switchState);
    }
  
    const handleSave = () => {
        if (key !== '') {
            if (switchState) {
                localStorage.setItem('myKey', key);
                setKeyState("X".repeat(40));
            } else {
                sessionStorage.setItem('myKey', key);
                setKeyState("X".repeat(40));
            }
        }
        setShow(false);
        window.location.reload(false);
    };

    // show modal
    const handleShow = () => setShow(true);

    // clear api key
    const handleClick = () => {
        localStorage.removeItem('myKey');
        sessionStorage.removeItem('myKey');
        setKeyState('');
    }
  
    return (
      <>
        <button id="apiKeyButton" onClick={handleShow}>
          API Key
        </button>
  
        <Modal show={show} onHide={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>OpenAI API</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>API Key <button id="clearButton" onClick={handleClick}>clear</button></Form.Label>
                    <Form.Control type="text" onChange={(e) => setKey(e.target.value)} placeholder={keyState}/>
                    <Form.Text id="passwordHelpBlock" muted>
                        You need an OpenAI account to access the ChatGPT API.
                    </Form.Text>
                </Form.Group>
                <ol>
                    <li>Go to <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noreferrer">https://platform.openai.com/account/api-keys</a></li>
                    <li>Create a new secret key.</li>
                    <li>Copy and paste your key here.</li>
                    <li>Your key will be stored in your browser's <b><u>{switchState ? "local" : "session"}</u></b> storage.</li>
                </ol>
                <div id="switchDiv">
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        checked={switchState}
                        onChange={handleSwitch}
                    />
                    {switchState ? <span>I am using my own computer</span> : <span>I am <b><u>NOT</u></b> using my own computer</span>}
                </div>
                <div id="buttonContainer">
                    <Button id="saveButton" variant="primary" onClick={handleSave}>Save Changes</Button>
                </div>
             </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default ModalKey;