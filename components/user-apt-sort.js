import DayOptions from "./day-options";
import MonthOptions from "./month-options";


const UserAptSort = ({ day, setday, month, setmonth, setdate }) => (
    <div className='columns'>
        <div className='column'>
            <div className='box has-background-success-light is-shadowless'>
            <div className="columns">
                <div className="column is-narrow">
                    <div className="field">
                        <label className="label is-size-7">Month</label>
                        <div className="control">
                            <div className="select is-small is-rounded">
                                <MonthOptions updateState={setmonth}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-narrow">
                    <div className="field">
                        <label className="label is-size-7">Day</label>
                        <div className="control">
                            <div className="select is-small is-rounded">
                                <DayOptions month={month} setday={setday} day={day} setdate={setdate}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
)

export default UserAptSort;