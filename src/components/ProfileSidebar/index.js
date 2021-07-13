import Box from '../Box';

import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

function ProfileSidebar(props) {
    return(
      <Box as="aside">
          <img src={`https://github.com/${props.gitHubUser}.png`} style={{borderRadius: '8px' }} />
          <hr />

          <a className="boxLink" href={`https://github.com/${props.gitHubUser}`} target="_blank"> @{props.gitHubUser} </a>
          <hr />
        <AlurakutProfileSidebarMenuDefault>


        </AlurakutProfileSidebarMenuDefault>
      </Box>
    )
}

export default ProfileSidebar;