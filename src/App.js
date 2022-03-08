import React, {Component} from 'react';

import "bootstrap/dist/css/bootstrap-grid.css"
import "bootstrap/dist/css/bootstrap.css"

import {Edit} from "./Edit";


function App() {

    let temp = [
        {
            "id": "pq_H9Q-A5w",
            "type": "header",
            "data": {
                "text": "test",
                "level": 2
            }
        },
        {
            "id": "NEq6JvaZPZ",
            "type": "paragraph",
            "data": {
                "text": "ffff"
            }
        },
        {
            "id": "2znkKAoxtc",
            "type": "paragraph",
            "data": {
                "text": "jjjj"
            }
        }
    ]

    return (
        <div className="App">
            <div className={"row"}>
                <div className={"col-6"}>
                    <Edit showButtonControl={true} readOnly={false} />
                </div>
                <div className={"col-6"}>
                    <Edit showButtonControl={true} readOnly={false} />
                </div>
            </div>
        </div>
    );
}

export default App;
