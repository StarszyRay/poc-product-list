import styles from "./TextInput.module.css";

interface TextInputProps {
  error?: string;
  label: string;
}

const TextInput = ({
  label,
  id,
  value,
  onChange,
  readOnly,
  error,
}: TextInputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const errorId = `${id}-error`;
  return (
    <div className={styles.textInput}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && !readOnly && (
        <p id={errorId} role="alert" className={styles.errorText}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
