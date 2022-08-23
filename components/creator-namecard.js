
const CreatorNamecard = ({ username }) => (
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
                    <button className="button is-link is-outlined">
                        <span className="icon is-medium">
                            <ion-icon size="large" name="cog-outline"></ion-icon>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
)

export default CreatorNamecard;