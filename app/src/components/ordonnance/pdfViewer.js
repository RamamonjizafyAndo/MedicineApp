import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../hooks/contextPatient";
const PDFViewer = () => {
    const {ordonnance} = useContext(UserContext);
    const [file, setFile] = useState(null)
    useEffect(()=>{
        
        setFile(ordonnance)
        console.log(ordonnance);
    },[ordonnance])
    return (
        <div className="container-fluid">
            <iframe src={`${__dirname}/pdf/${file}.pdf`} width="100%" height="1000px" />
        </div>
    );
};
export default PDFViewer;