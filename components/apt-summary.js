
const AptSummary = () => (
    <div className="card mt-2">
        <div className="card-content">
            <div className="columns" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.377)'}}>
                <div className="column">
                    <button className="button is-small is-primary is-outlined"><ion-icon className="mr-1" name="shield-half-outline"></ion-icon>Creator</button>
                </div>
                <div className="column has-text-right">
                    <span className="tag">8 appointments today</span>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <p className="is-size-6 has-text-weight-medium">Today&apos;s Outlook</p>
                </div>
            </div>
            <div className="columns">
                <div className="column ml-1 icon-text">
                    <span className="icon is-size-5 mr-3"><ion-icon name="calendar-outline"></ion-icon></span>
                    <span className="has-text-weight-bold is-size-6">Appointments Today: </span>
                    <span className="is-size-6 ml-4">8 (3 with <span className="is-italic is-underlined has-text-info"> notes</span>)</span>
                </div>
            </div>
            <div className="columns">
                <div className="column ml-1 icon-text">
                    <span className="icon is-size-5 mr-3 has-text-success"><ion-icon name="stats-chart-outline"></ion-icon></span>
                    <span className="has-text-weight-bold is-size-6">Projected Revenue: </span>
                    <span className="is-size-6 ml-4"> $185.26</span>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <p className="is-size-6 has-text-weight-medium">Last Week</p>
                </div>
            </div>
            <div className="columns">
                <div className="column ml-1 icon-text">
                    <span className="icon is-size-5 mr-3"><ion-icon name="calendar-outline"></ion-icon></span>
                    <span className="has-text-weight-bold is-size-6">Appointments completed:</span>
                    <span className="is-size-6 ml-4">36 </span>
                </div>
            </div>
            <div className="columns">
                <div className="column ml-1 icon-text">
                    <span className="icon is-size-5 mr-3 has-text-success"><ion-icon name="cash-outline"></ion-icon></span>
                    <span className="has-text-weight-bold is-size-6">Realized Gain: </span>
                    <span className="is-size-6 ml-4"> $2307.65</span>
                </div>
            </div>
        </div>
    </div>
)

export default AptSummary;