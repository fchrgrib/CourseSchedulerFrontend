import {BrowserRouter, Route, Routes} from "react-router-dom";
import Course from "./component/Course";
import Information from "./component/Information";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Course/>}/>
                <Route path="/info" element={<Information/>}/>
            </Routes>
        </BrowserRouter>
    )
}