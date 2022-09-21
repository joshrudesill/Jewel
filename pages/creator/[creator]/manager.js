import AptTypeCreate from "../../../components/apt-type-create";
import CreateAppointment from "../../../components/create-apt";
import CreateSchedule from "../../../components/createschedule";
import CreatorNavBar from "../../../components/creator-navbar";


const Manager = () => {
    return (
        <>  
                <CreatorNavBar />
                <div class="tabs is-centered is-boxed mt-2">
                    <ul>
                        <li class="is-active"><a>Create Schedule</a></li>
                        <li><a>Create Appointment</a></li>
                        <li><a>Manager Appointment Types</a></li>
                    </ul>
                </div>
                <CreateSchedule />
                <CreateAppointment />
                <AptTypeCreate />
            </>
        )
}

export default Manager;