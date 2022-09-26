import DayOptions from "./day-options";
import MonthOptions from "./month-options";
import {useState} from 'react';

const AptSort = ({ sortby, setsortby, showclaimed, setshowclaimed, typesort, settypesort, types, date, setdate }) => {
        const [month, setMonth] = useState()
        const [day, setDay] = useState()
        return (
        <div className="columns">
            <div className="column">
                <div className="box is-shadowless has-background-primary p-3">
                    <div className="columns is-multiline is-mobile"> 
                        <div className="column is-full-mobile">
                            <span className="is-size-3 has-text-weight-light ">Appointments</span>
                        </div>
                        <div className="column is-narrow">
                            <div className="field">
                                <label className="label is-size-7">Sort By</label>
                                <div className="control">
                                    <div className="select is-small is-rounded">
                                        <select value={sortby} onChange={e=>setsortby(e.target.value)}>
                                            <option value='dd'>Date Desc.</option>
                                            <option value='da'>Date Asc.</option>
                                            <option value='p'>Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-narrow">
                            <div className="field">
                                <label className="label is-size-7">Show</label>
                                <div className="control">
                                    <div className="select is-small is-rounded">
                                        <select value={showclaimed} onChange={e=>setshowclaimed(e.target.value)}>
                                            <option value='a'>All</option>
                                            <option value='c'>Claimed</option>
                                            <option value='uc'>Unclaimed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-narrow">
                            <div className="field">
                                <label className="label is-size-7">Type</label>
                                <div className="control">
                                    <div className="select is-small is-rounded">
                                        <select value={typesort} onChange={e=>settypesort(e.target.value)}>
                                            <option value='0'>All</option>
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
                        <div className="column is-narrow">
                            <div className="field">
                                <label className="label is-size-7">Month</label>
                                <div className="control">
                                    <div className="select is-small is-rounded">
                                        <MonthOptions updateState={setMonth} includeDefault={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-narrow">
                            <div className="field">
                                <label className="label is-size-7">Day</label>
                                <div className="control">
                                    <div className="select is-small is-rounded">
                                        <select value={date ? date.d : 0} onChange={e=>setDay(e.target.value)}>
                                            <option value='0'>All</option>
                                            <DayOptions 
                                                date={date} 
                                                setdate={setdate} 
                                                day={day}
                                                setday={setDay}
                                                optionsOnly={true}
                                                month={month}
                                            />
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
}


export default AptSort;