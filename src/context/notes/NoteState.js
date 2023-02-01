import NoteContext from "./NoteContext";

const NoteState= (props)=>{
    const state = {
        "name":"Harry",
        "class":"5b"
    }
return(
    <NoteContext.Provider value={state}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;