function CardBox(props) {
    const main = props.mainVar;

    return(
        <>
            <h2 className="smallTitle"> {props.title} </h2>
            <ul>
                {main.map(value => (
                    <li key={value.id || value}>
                      <a href={`${props.urlDirection}/${value.title || value.login || value}`} target="_blank">
                        <img src={value.image || `https://github.com/${value.login || value}.png`}/>
                        <span>{value.title || value.login || value}</span>
                      </a>
                    </li>
                  ))}
            </ul>
        </>
    )
}

export default CardBox;