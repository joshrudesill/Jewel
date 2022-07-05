
const SchedApt = ({ a }) => {

    const bookApt = async () => {
        const apt = await fetch('/api/bookapt' ,{
            method: 'POST',
            withCredentials: true,
            body: JSON.stringify({
                aID: a.id,
            }),
      headers: {
        'Content-Type': 'application/json'
      }
        });
    }

    return (
    <div className="card mb-2">
        <div className="card-content">
            <div className='columns'>
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
                    <button className="button" onClick={bookApt}>Book</button>
                </div>
            </div>
        </div>
     </div>
    )
}  

export default SchedApt;