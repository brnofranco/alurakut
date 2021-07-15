import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

function CardBox(props) {
    const items = props.items;

    return(
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle"> {props.title} {`(${items.length})`} </h2>
            <ul>
                {items.map(value => (
                    <li key={value.id || value}>
                      <a href={`${props.urlDirection}/${value.title || value.login || value}`} target="_blank">
                        <img src={value.imageUrl || `https://github.com/${value.login || value}.png`}/>
                        <span>{value.title || value.login || value}</span>
                      </a>
                    </li>
                  ))}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default CardBox;