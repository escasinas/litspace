import Container from'react-bootstrap/Container';
import Row from'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';

// custom components
import ErrorMessage from '../components/ErrorMessage';

function Writing() {

    // OpenAI configuration
    const [openai, setOpenai] = useState(null);

    // input text
    const [writingInput, setWritingInput] = useState('');

    // output text
    const [writingOutput, setWritingOutput] = useState('');

    // other states
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);

    // modal
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClose = () => setShow(false);

    // component did mount
    useEffect(() => {
        // fetch api key from local storage
        const myKey = localStorage.getItem('myKey');

        // setup OpenAI api + config
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
          apiKey: myKey,
        });
        const openaiConf = new OpenAIApi(configuration);
        setOpenai(openaiConf);
    }, []);

    // fetch the output from OpenAI API
    const handleSubmit = async (event) => {

        event.preventDefault();

        setIsLoading(true);

        if (writingInput === '') {
            setIsLoading(false);
            return;
        }
        
        // input text from form
        let writingPrompt = `Improve this text: "${writingInput}"`;
        
        // SUMMARY 
        setLoadingMessage("Rephrasing text...");
        const response1 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: writingPrompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        .catch((err) => {
            setErrorMessage(err.message);
            setShow(true);
            setIsLoading(false);
            return;
        });
        let improvedText = response1.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");
        setWritingOutput(improvedText);
        console.log("Writing...");
        setIsLoading(false);
    }

    return (
        <div>
            <ErrorMessage show={show} handleClose={handleClose} errorMessage={errorMessage}/>
            <Container>
                <div id="writingContainer">
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control   as="textarea" 
                                                rows={window.innerHeight / 100 * 1.4} 
                                                placeholder="Enter a text to rephrase."
                                                value={writingInput} 
                                                onChange={(e) => setWritingInput(e.target.value)}/>
                            </Form.Group>
                            {isLoading ? <button className="submitButton disabledButton" disabled>{loadingMessage}</button> : <button className="submitButton" type="submit">Rephrase my text</button>}
                        </Form>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group id="formOutput" className="mb-3">
                                <Form.Control   as="textarea" 
                                                rows={window.innerHeight / 100 * 1.4}
                                                value={writingOutput}
                                                onChange={(e) => setWritingOutput(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Writing;
