import { useEffect, useState } from "react";

const AptPage = ({ page, results, setPage }) => {
    const [pageNumbers, setPageNumbers] = useState([])
    useEffect(() => {
        var pns = Math.floor(results / 10)
        if (pns > 10) pns = 10
        const atp = Array.from(Array(pns).keys())
        setPageNumbers(atp)
    }, [])

    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <button onClick={() => setPage(page-1)} className="button is-small" disabled={page === 1 ? true : false}>Prev</button>
            </div>
            <div className="column is-narrow mx-auto">
                {
                    pageNumbers ? pageNumbers.map(pn => 
                        <a onClick={() => setPage(pn+1)} className={`mx-5 ${pn+1 === page ? 'is-underlined' : ''}`}>{pn + 1}</a>) 
                        : ''
                }
            </div>
            <div className="column is-narrow">
                <button onClick={() => setPage(page+1)} className="button is-small" disabled={page === pageNumbers.length ? true : false}>Next</button>
            </div>

        </div>
    )
}

export default AptPage;