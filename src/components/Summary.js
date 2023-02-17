function Summary(props) {
    return (
        <div id="summaryOutput" className="textOutput">
            <div className="textOutput2">
                <p id="summaryText">
                    {props.summaryText}
                </p>
            </div>

            <div className="textOutput2">
                {props.bulletArr.length > 0 ? <div id="keyPoints">
                    <h6 id="keyPointsTitle">Key Points</h6>
                    <ul>
                        {props.bulletArr.map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                    </ul>
                </div> : null}
            </div>
        </div>
    )
}

export default Summary;