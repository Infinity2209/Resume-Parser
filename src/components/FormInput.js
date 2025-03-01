const FormInput = ({ label, type, value, onChange, required = false, error = '', ...props }) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`form-input ${error ? 'error' : ''}`} // Add error class if there's an error
                required={required}
                {...props}
            />
            {error && <span className="error-message">{error}</span>} {/* Display error message */}
        </div>

    );
};


export default FormInput;
