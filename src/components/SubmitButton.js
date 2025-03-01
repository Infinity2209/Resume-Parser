const SubmitButton = ({ children, onClick, disabled = false }) => {

    return (
        <button 
            type="submit" 
            className={`submit-button ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >

            {children}
        </button>
    );
};


export default SubmitButton;
