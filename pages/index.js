import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import ProfileSidebar from '../src/components/ProfileSidebar';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';



export default function Home() {
  const gitHubUser = 'brnofranco';
  const pessoasFavoritas = ['madrigueira', 'furigato', 'guhma', 'vitorpinheiro29', 'lucasgabrielmello', 'leonardomleitao']

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar gitHubUser={gitHubUser} />
      </div>

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>        
        <Box>
          <h1 className="title"> Bem-vindo(a) </h1>
          <OrkutNostalgicIconSet />
        </Box>
      </div>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>        
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle"> Pessoas da comunidade ({pessoasFavoritas.length}) </h2>

          <ul>
            {pessoasFavoritas.map(friendName => (
              <li key={friendName}>
              <a href={`/users/${friendName}`} key={friendName}>
                <img src={`https://github.com/${friendName}.png`} />
                <span>{friendName}</span>
              </a>
            </li>
            ))}
          </ul>
      
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
