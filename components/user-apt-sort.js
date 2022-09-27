import DayOptions from "./day-options";
import MonthOptions from "./month-options";


const UserAptSort = ({ day, setday, month, setmonth, date, setdate, sorttype, setsorttype, types }) => (
    <div className='columns mt-5'>
        <div className='column'>
            <div className='box has-background-grey-lighter'>
                <div className="columns is-mobile is-multiline">
                    <div className="column is-narrow ">
                        <div className="field">
                            <label className="icon-text is-size-5 mb-1">
                                <span className="icon">
                                    <ion-icon name="calendar-outline"></ion-icon>
                                </span>
                                <span className="label">
                                    Month 
                                </span>
                            </label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <MonthOptions updateState={setmonth}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-narrow">
                        <div className="field">
                            <label className="icon-text is-size-5 mb-1">
                                <span className="icon">
                                    <ion-icon name="calendar-number-outline"></ion-icon>
                                </span>
                                <span className="label">
                                    Day 
                                </span>
                            </label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <DayOptions month={month} setday={setday} day={day} date={date} setdate={setdate}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-narrow">
                        <div className="field">
                            <label className="icon-text is-size-5 mb-1">
                                <span className="icon">
                                    <ion-icon name="construct-outline"></ion-icon>
                                </span>
                                <span className="label">
                                    Type 
                                </span>

                            </label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <select value={sorttype} onChange={e => setsorttype(e.target.value)}>
                                        <option value={0}>All</option>
                                        {
                                            types ? Object.keys(types).map(t => {
                                                return (
                                                    <option key={types[t].id} value={types[t].id}>{types[t].typeName}</option>
                                                )
                                            })
                                            :
                                            <></>
                                        }
                                    </select>
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