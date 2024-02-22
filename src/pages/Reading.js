import Container from'react-bootstrap/Container';
import Row from'react-bootstrap/Row';
import Col from'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from'react-bootstrap/Button';
import {useState, useEffect} from 'react';

// custom components
import Summary from '../components/Summary';
import EliFive from '../components/EliFive';
import ErrorMessage from '../components/ErrorMessage';

function Reading() {

    // OpenAI configuration
    const [openai, setOpenai] = useState(null);

    // input text
    const [inputText, setInputText] = useState('');

    // output text
    const [summaryText, setSummaryText] = useState('');
    const [bulletArr, setBulletArr] = useState([]);
    const [eliText, setEliText] = useState('');

    // other states
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const [isSummaryVisible, setIsSummaryVisible] = useState(true);

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

        if (inputText === '') {
            setIsLoading(false);
            return;
        }
        
        // input text from form
        let summarisePrompt = `Summarise this text: "${inputText}"`;
        let bulletPrompt = `What are the key insights (•) from this text? "${inputText}"`;
        let elifivePrompt = `Explain this text in Layman's terms: "${inputText}"`;
        
        // SUMMARY 
        setLoadingMessage("Generating summary...");
        const response1 = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: summarisePrompt,
            temperature: 1,
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
        let summaryOutput = response1.choices[0].text;
        setSummaryText(summaryOutput);
        
        // input text from summary output
        // let bulletPrompt = `Make a bullet point summary (•) for this text: "${summaryOutput}"`;
        
        // BULLET POINT SUMMARY
        setLoadingMessage("Creating bullet points...");
        const response2 = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: bulletPrompt,
            temperature: 1,
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

        let bulletOutput = response2.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");
        let bulletArrOutput = bulletOutput.split('• ').slice(1);
        setBulletArr(bulletArrOutput);
        
        // ELI5
        setLoadingMessage("Making an ELI5 explanation...");
        const response3 = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: elifivePrompt,
            temperature: 1,
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
        let eliOutput = response3.choices[0].text;
        setEliText(eliOutput);
        
        setIsLoading(false);
    }

    const handleSummaryClick = () => {
        setIsSummaryVisible(!isSummaryVisible);
    }

    return (
        <div>
            <ErrorMessage show={show} handleClose={handleClose} errorMessage={errorMessage}/>
            <Container id="readingContainer">
                <Row>
                    {/* Input div */}
                    <Col id="inputDiv" className='inputOutput'>
                        <h3 className='subHeading'>Input</h3>
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control   as="textarea" 
                                                rows={window.innerHeight / 100 * 2.5} 
                                                placeholder="Enter a text to summarise."
                                                value={inputText} 
                                                onChange={(e) => setInputText(e.target.value)}/>
                            </Form.Group>
                            {isLoading ? <button className="submitButton disabledButton" disabled>{loadingMessage}</button> : <button className="submitButton" type="submit">Summarise</button>}
                        </Form>
                    </Col>

                    {/* Output div */}
                    <Col id="outputDiv" className='inputOutput'>
                        <h3 className='subHeading'>{isSummaryVisible ? "Summary" : "ELI5"}<Button id="toggleButton" onClick={handleSummaryClick}><i className="fa-sharp fa-solid fa-shuffle"></i></Button></h3>
                        <br />
                        {isSummaryVisible ? <Summary summaryText={summaryText} bulletArr={bulletArr}/> : <EliFive eliText={eliText}/>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Reading;
