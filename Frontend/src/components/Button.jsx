function Button(props) {
    return <button className={`btn ${props.variant}`}>{props.text}</button>
}

export default Button