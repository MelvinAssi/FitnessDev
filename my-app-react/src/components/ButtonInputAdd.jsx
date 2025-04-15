import React, { useRef, useState } from "react";
import styled from "styled-components";

const AddButton = styled.button`
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
    font-size: 16px;

`;
const HiddenFileInput = styled.input`
    display: none;
`;

const FileNameDisplay = styled.div`
    align-self: start;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
`;

const ButtonInputAdd = ({ text, onClick, filetype }) => {
    const fileInputRef = useRef();
    const [fileName, setFileName] = useState("");
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(""); 
        }
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <>
            <AddButton onClick={triggerFileInput}>
                {text || "Choisir un fichier"}
            </AddButton>
            <HiddenFileInput
                ref={fileInputRef}
                type="file"
                accept={filetype}
                onChange={handleFileChange}
            />
            {!fileName && <FileNameDisplay>Aucun fichier sélectionné</FileNameDisplay>}
            {fileName && <FileNameDisplay>{fileName}</FileNameDisplay>}
        </>
    );
};

export default ButtonInputAdd;
