import Box from '../Box'

function ProfileSidebar(props) {
    return(
      <Box>
          <img src={`https://github.com/${props.gitHubUser}.png`} style={{borderRadius: '8px' }} />
      </Box>
    )
}

export default ProfileSidebar;