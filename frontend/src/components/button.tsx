interface Props {
    children: React.ReactNode;
    type?: 'submit' | 'button' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    disabled?:boolean;
  }
  export default function Button(props: Props) {
    const { type = 'button', children, onClick, className = '' ,disabled} = props;
    return (
      <button
        className={`bg-primary dark:bg-primary-dark text-primary-text
                   dark:text-primary-textDark font-bold py-2 px-4 rounded 
                   hover:bg-primary-dark dark:hover:bg-primary
                   focus:outline-none focus:shadow-outline ${className}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }