import nookies from 'nookies';

export default function Logout(props) {
    return(
        <>
        </>
    )
}

export async function getServerSideProps(context) {
    nookies.destroy(context, 'USER_TOKEN');
    return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
    }
}