function ProfileBox(props) {
    const main = props.mainVar;

    return(
        <>
            <h2 className="smallTitle"> {props.title} </h2>
            <ul>
                {main.map(value => (
                  <li key={value.id || value}>
                    <a href={`/${props.urlDirection}/${value.title || value}`}>
                      <img src={value.image || `https://github.com/${value}.png`} />
                        {console.log(value.image)}
                      <span>{value.title || value}</span>
                    </a>
                  </li>
                ))}
            </ul>
        </>
    )
}

export default ProfileBox;