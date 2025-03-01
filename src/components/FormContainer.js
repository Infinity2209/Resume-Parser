import '../styles/global.css';

const FormContainer = ({ children, onSubmit }) => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="form">
        {children}
      </form>
    </div>
  );
};


export default FormContainer;
