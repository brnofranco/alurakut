import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';
import nookies from 'nookies';

export default function LoginScreen() {
    const router = useRouter();

    const [githubUser, setGithubUser] = useState('');

  return (
    <main style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <div><Toaster/></div>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(e) => {
            e.preventDefault();

            if(githubUser.length === 0) {
                toast.error("Campo obrigatório não preenchido!");
                return;
            } else {
                // API da alura
                fetch('https://alurakut.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                       'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify({ githubUser: githubUser })
                })
                .then(async (response) => {
                    const responseData = await response.json();
                    const token = responseData.token;
                    nookies.set(null, 'USER_TOKEN', token, { 
                        path: '/',
                        maxAge: 86400 * 7,
                    });
                    router.push('/');
                })
            }

          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
                placeholder="Usuário"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
            />
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="https://github.com/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 - <a href="https://www.alura.com.br/" target="_blank">Sobre o Alura.br</a> - <a href="/login">Centro de segurança</a> - <a href="/login">Privacidade</a> - <a href="/login">Termos</a> - <a href="/login">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}