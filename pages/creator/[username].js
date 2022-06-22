
const UserProfile = ({username}) => {
    return (
        <div>
            {username}
        </div>
    )
}

const verify = require('../../auth/helpers')
import * as cookie from 'cookie'
export async function getServerSideProps(context) {
    const cook = context.req.headers.cookie;
    const parsed = cookie.parse(cook)
    var authen = await verify.verifyJWT(parsed.token, context.params.username)
    console.log(authen)
    if(authen.auth) {
        return {
            props: {
                username: authen.username
            }
        }
    } else {
        return {
            redirect: {
                destination: '/asd',
                permanent: false
            }
        }
    }
}




export default UserProfile;