import { useRouter } from "next/router";

const CreatorNamecard = ({ username }) => {
    const router = useRouter()
    return (
        <div className="card">
            <div className="card-content">
                <div className="columns">
                    <div className="column is-2 has-text-weight-bold">
                        <figure className="image is-48x48">
                            <img alt='profile' src="http://placeimg.com/48/48/arch"></img>
                        </figure>
                    </div>
                    <div className="column is-size-4 p-2">
                        <p>{username}</p>
                        <p className="is-size-7">The Example Company</p>
                    </div>
                    <div className="column is-size-3 has-text-right">
                        <button className="button is-link is-small is-outlined" onClick={(e) => {
                            e.preventDefault()
                            router.push(`/schedules/${router.query.creator}`)
                            }}>
                            View as User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatorNamecard;