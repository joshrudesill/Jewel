

const AptSort = ({ sortby, setsortby, showclaimed, setshowclaimed }) => (
        <div className="columns">
            <div className="column">
                <div className="box is-shadowless has-background-success-light p-3">
                    <div className="columns">
                        <div className="column">
                            <span className="is-size-3">Appointments</span>
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
                    </div>
                </div>
            </div>
        </div>
)


export default AptSort;