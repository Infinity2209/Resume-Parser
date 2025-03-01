const FileUpload = ({ label, onChange, accept, required = false, error = '' }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type="file"
        onChange={onChange}
        accept={accept}
        className={`file-input ${error ? 'error' : ''}`} // Add error class if there's an error
        required={required}
      />
      {error && <span className="error-message">{error}</span>} {/* Display error message */}
    </div>

  );
};

export default FileUpload;
