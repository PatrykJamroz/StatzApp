import React, { useState } from 'react';

function App() {
    const [resp, setResp] = useState(false);
    const getRes = async () => {
        setResp(false);
        try {
            const response = await fetch('/ping');
            const data = await response.json();
            setResp(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {`Hello in StravaStats! Express: ${resp} `}
            <button type="button" onClick={getRes}>
                Click to test express
            </button>
        </>
    );
}

export default App;
