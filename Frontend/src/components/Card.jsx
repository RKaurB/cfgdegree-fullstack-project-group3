import Button from "./Button"

function Card(props) {
    return <div className="card">
        <img className="card-img-top" src={props.image} alt={props.name}/>
        <div className="card-body">
            <h3 className="card-title">{props.name}</h3>
            <Button text="Description" color="btn-garden-dark"/>
        </div>
    </div>
}

export default Card