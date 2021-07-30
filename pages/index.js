import { useEffect, useState } from 'react';
import nookies from 'nookies';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import jwt from 'jsonwebtoken';

import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import ProfileSidebar from '../src/components/ProfileSidebar';
import CardBox from '../src/components/CardBox';

import api from '../src/services/api';



export default function Home(props) {
  const githubUser = props.githubUser;

  const [user, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [communities, setCommunities] = useState([]);


  useEffect(() => {
    api.get(`/users/${githubUser}`)
    .then(( response ) => {
      setUser(response.data);
    });

    api.get(`/users/${githubUser}/followers`)
    .then(( { data } ) => {
      setFollowers(data);
    });

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '99d26706dcb827ded33b1c6ec12d64',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response) => response.json())
    .then((fullResponse) => {
      const dataCommunities = fullResponse.data.allCommunities;
      setCommunities(dataCommunities);
    });

  }, []);



  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>

      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar gitHubUser={githubUser} />
      </div>

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>        
        <Box>
          <h1 className="title"> Bem-vindo(a), {user?.name || 'Usuário'}. </h1>
          <OrkutNostalgicIconSet confiavel={3} legal={2} sexy={1} />
        </Box>
        <Box>
          <h2 className="subTitle"> O que você deseja fazer? </h2>
          <form onSubmit={ function handleCreateCommunity(event) {
            event.preventDefault();

            const dataForm = new FormData(event.target);

            const newCommunity = {
              title: dataForm.get('title'),
              imageUrl: dataForm.get('image'),
              creatorSlug: githubUser,
            }

            fetch('/api/communities', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newCommunity)
            })
            .then(async (response) => {
              const data = await response.json();
              console.log(data.createdRegister);
              const newCommunity = data.createdRegister;
              const updatedCommnities = [...communities, newCommunity];
              setCommunities(updatedCommnities)
            })
          }}>
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
          <CardBox
              title={'Seguidores'}
              items={followers}
              urlDirection="https://github.com"
          />
          <CardBox
              title={'Comunidades'}
              items={communities}
              urlDirection="communities"
          />
          {console.log(communities)}
      </div>

    </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  
  return {
    props: {
      githubUser,
    },
  }
}