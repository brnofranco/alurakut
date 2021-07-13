import { useEffect, useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import ProfileSidebar from '../src/components/ProfileSidebar';
import CardBox from '../src/components/CardBox';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

import api from '../src/services/api';


export default function Home() {
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState('');
 
  const gitHubUser = 'brnofranco';

  const favoritePeople = ['madrigueira', 'furigato', 'guhma', 'vitorpinheiro29', 'lucasgabrielmello', 'leonardomleitao']

  const [community, setCommunity] = useState([{
    id: '675876',
    title: 'Eu odeio acordar cedo',
    image: 'https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg',
  }]);

  useEffect(() => {
    api.get(`/users/${gitHubUser}`)
    .then(( response ) => {
      setUser(response.data)
    });

    api.get(`/users/${gitHubUser}/followers`)
    .then(( response ) => {
      setFollowers(response.data)
    })
  }, []);

  return (
    <>
    <AlurakutMenu githubUser={gitHubUser}/>
    <MainGrid>

      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar gitHubUser={gitHubUser} />
      </div>

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>        
        <Box>
          <h1 className="title"> Bem-vindo(a), {user?.name}. </h1>
          <OrkutNostalgicIconSet />
        </Box>
        <Box>
          <h2 className="subTitle"> O que você deseja fazer? </h2>
          <form onSubmit={ function handleCreateCommunity(event) {
            event.preventDefault();

            const dataForm = new FormData(event.target);
            const communities = {
              id: new Date().toISOString(),
              title: dataForm.get('title'),
              image: dataForm.get('image'),
            }

            const newCommunities = [...community, communities]
            setCommunity(newCommunities);
          }

          }>
            <div>
              <input 
                type="text"
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?" 
              />
            </div>
            <div>
              <input 
                placeholder="Coloque uma URL para usarmos de capa." 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa." 
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>        
        <ProfileRelationsBoxWrapper>
          <CardBox
              title={`Pessoas da comunidade (${favoritePeople.length})`}
              mainVar={favoritePeople}
              urlDirection="https://github.com"
          />
          <a className="boxLink" href="#"> Ver todos </a>
        </ProfileRelationsBoxWrapper>
        
        <ProfileRelationsBoxWrapper>
          <CardBox
              title={`Comunidades (${community.length})`}
              mainVar={community}
              urlDirection="communities"
          />
          <a className="boxLink" href="#"> Ver todos </a>
        </ProfileRelationsBoxWrapper>
      </div>

    </MainGrid>
    </>
  )
}
