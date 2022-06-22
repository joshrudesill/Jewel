import * as cookie from 'cookie'

const UserProfile = ({username, apt}) => {
    return (
        <div>
            {username}{'  '}
            {apt ? apt : ''}
        </div>
    )
}

const verify = require('../../auth/helpers')
const model = require('../../orm/index')

export async function getServerSideProps(context) {
    const cook = context.req.headers.cookie;
    const parsed = cookie.parse(cook)
    var authen = await verify.verifyJWT(parsed.token, context.params.username)
    if(authen.auth && authen.act === 'admin') {
        const apt = await model.Appointments.findOne({ where: { userID: authen.id } })
        if (apt) {
            return {
                props: {
                    username: authen.username,
                    apt: apt.id
                }
            }
        } else {
            return {
                props: {
                    username: authen.username
                }
            }
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}




export default UserProfile;