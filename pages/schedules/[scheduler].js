import { useEffect, useState } from 'react';
import SchedApt from '../../components/schedule-apt';

const Scheduler = ({ apts, creator }) => {
    const [apt, setApt] = useState()
    useEffect(() => {
        if (apts) {
            const ts = JSON.parse(apts);
            setApt(ts)
        } else {
            setApt(null)
        }
    }, [])
    return (
        <div className='container'>
            <div className='is-size-3 mb-4 mt-4'>
                {creator}
            </div>
            {
                apt ? apt.map(a => 
                    <SchedApt a={a}/>
                ) : ''
            }
        </div>
    )
}

const model = require('../../orm/index');

export async function getServerSideProps(context) {
    const creator = context.params.scheduler;
    const creatorID = await model.Users.findOne({ 
        where: { 
            username: creator 
        },
        attributes: [
            'id'
        ]
    });
    if(!creatorID) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const apts = await model.Appointments.findAll({
         where: { 
            adminID: creatorID.id, 
            userEmail: { 
                [model.op.is]: null 
            } 
        } 
    });
    if(apts) {
        return {
            props: {
                apts: JSON.stringify(apts),
                creator: context.params.scheduler
            }
        }
    } else {
        return {
            props: {
                apts: null
            }
        }
    }
}



export default Scheduler;