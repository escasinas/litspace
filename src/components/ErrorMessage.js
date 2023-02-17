import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ErrorMessage(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.errorMessage}.
                <p id="keyReminder">Make sure you have entered your OpenAI API key.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal> 
    )
}

export default ErrorMessage;