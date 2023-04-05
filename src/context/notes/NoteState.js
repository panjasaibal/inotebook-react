
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    // const s1 = {
    //     "name":"Saibal",
    //     "salary":"120"
    // }

    const initialNotes = [{
        "_id": "642b27c082d74963d6b025c7",
        "user": "6429ac9554d7060161fa5f93",
        "tittle": "reminder",
        "description": "complete the code",
        "tag": "personal",
        "timestamp": "2023-04-03T19:23:44.301Z",
        "__v": 0
    },
    {
        "_id": "642dca08dff77294a1fd89df",
        "user": "6429ac9554d7060161fa5f93",
        "tittle": "new",
        "description": "testing the note add in frontend ",
        "tag": "testing",
        "timestamp": "2023-04-05T19:20:40.160Z",
        "__v": 0
    }]

    //const [state, setState] = useState(s1);
    const [notes, setnotes] = useState(initialNotes);

    // const update = ()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"Saibal Panja",
    //             "salary":"1200"
    //         })
    //     }, 1500);
    // }



    return (
        <noteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
