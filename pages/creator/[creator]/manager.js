import { useRouter } from "next/router";
import { useEffect, useState, useReducer } from "react";
import AptTypeCreate from "../../../components/apt-type-create";
import CreateAppointment from "../../../components/create-apt";
import CreateSchedule from "../../../components/createschedule";
import CreatorNavBar from "../../../components/creator-navbar";
import Footer from "../../../components/footer";
import useAuthManager from '../../../util/useauthmanager';
import useFetchManager from '../../../util/usefetchmanager';


const initialVisibilityState = {
    schedule: true,
    createapt: false,
    createtype: false
}

const initialMessageState = {
    schedule: true,
    createapt: true,
    createtype: true
}

const visibilityReducer = (state, action) => {
    switch(action.type) {
        case 'schedule':
            return {
                schedule: true,
                createapt: false,
                createtype: false
            }
        case 'createapt':
            return {
                schedule: false,
                createapt: true,
                createtype: false
            }
        case 'createtype':
            return {
                schedule: false,
                createapt: false,
                createtype: true
            }
        default:
            throw new Error('Unknown visibility action type')

    }
}

const messageReducer = (state, action) => {
    switch(action.type) {
        case 'schedule':
            return {
                ...state,
                schedule: false,
            }
        case 'createapt':
            return {
                ...state,
                createapt: false,
            }
        case 'createtype':
            return {
                ...state,
                createtype: false,
            }
        default:
            throw new Error('Unknown message action type')

    }
}

const Manager = () => {
    const router = useRouter()
    const creator = router.query.creator
    const { authorized, processingAuth, error } = useAuthManager(creator, true)
    const [types, setTypes] = useState()
    const aptTypes = useFetchManager('/api/getapttypes', { creator: creator }, 'GET', false)
    const [visibilityState, visibilityDispatch] = useReducer(visibilityReducer, initialVisibilityState);
    const [messageState, messageDispatch] = useReducer(messageReducer, initialMessageState);
    const [showMessage, setShowMessag] = useState(true)

    useEffect(() => {
        if(creator !== undefined) {
            aptTypes.execute()
        }
    }, [creator])

    useEffect(() => {
        if(!aptTypes.isHandlingRequest && aptTypes.status === 200) {
            setTypes(aptTypes.data)
        }
    }, [aptTypes.status, aptTypes.isHandlingRequest])
    if (error) {
        console.error(error)
        router.push('/')
    }

    if (processingAuth) return <div>Loading...</div>

    if(!processingAuth && !authorized) {
        router.push('/')
    }
    if(authorized) return (
        <>
        <body style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
        }}>  
                <CreatorNavBar creator={creator}/>
                <div className="tabs is-centered is-boxed mt-2 is-small">
                    <ul>
                        <li className={`${visibilityState.schedule ? 'is-active' : ''}`}><a onClick={() => visibilityDispatch({type: 'schedule'})}>Create Schedule</a></li>
                        <li className={`${visibilityState.createapt ? 'is-active' : ''}`}><a onClick={() => visibilityDispatch({type: 'createapt'})}>Create Appointment</a></li>
                        <li className={`${visibilityState.createtype ? 'is-active' : ''}`}><a onClick={() =>visibilityDispatch({type: 'createtype'})}>Manage Appointment Types</a></li>
                    </ul>
                </div>
                <div className="container p-1">
                    { visibilityState.schedule ? <CreateSchedule creator={creator} manager={true} types={types} showMessage={messageState.schedule} dispatch={messageDispatch}/> : <></>}
                    { visibilityState.createapt ? <CreateAppointment types={types} creator={creator} showMessage={messageState.createapt} dispatch={messageDispatch}/> : <></>}
                    { visibilityState.createtype ? <AptTypeCreate types={types} creator={creator} showMessage={messageState.createtype} dispatch={messageDispatch}/> : <></>}
                </div>
        </body>
        <Footer />
        </>
        )
}

export default Manager;