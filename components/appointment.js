
const Appointment = ({ a }) => (
    <div className="card mb-2">
        <div className="card-content">
            <div className='columns'>
                <div className='column'>
                    <span className="has-text-weight-bold">User</span><br></br>
                    {
                        a.userEmail ? a.userEmail : 'Unclaimed'
                    }
                </div>
                <div className='column'>
                    <span className="has-text-weight-bold">Start Time</span><br></br>
                    {
                        a.startTime
                    }
                </div>
                <div className='column'>
                    <span className="has-text-weight-bold">End Time</span><br></br>
                    {
                        a.endTime
                    }
                </div>
                <div className='column has-text-right'>
                    <button className="button">Details</button>
                </div>
            </div>
        </div>
     </div>
)  

export default Appointment;