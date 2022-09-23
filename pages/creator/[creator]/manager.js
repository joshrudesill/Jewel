import AptTypeCreate from "../../../components/apt-type-create";
import CreateAppointment from "../../../components/create-apt";
import CreateSchedule from "../../../components/createschedule";
import CreatorNavBar from "../../../components/creator-navbar";


const Manager = () => {
    return (
        <>  
                <CreatorNavBar />
                <div className="tabs is-centered is-boxed mt-2">
                    <ul>
                        <li className="is-active"><a>Create Schedule</a></li>
                        <li><a>Create Appointment</a></li>
                        <li><a>Manage Appointment Types</a></li>
                    </ul>
                </div>
                <div className="container p-1">
                    <CreateSchedule manager={true}/>
                </div>
                
            </>
        )
}

export default Manager;