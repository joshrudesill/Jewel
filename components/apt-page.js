import { useEffect, useState } from "react";

const AptPage = ({ page, results, setPage }) => {
    const [pageNumbers, setPageNumbers] = useState([])
    const [pageOffset, setPageOffset] = useState(0)
    const [maxPages, setMaxPages] = useState()
    useEffect(() => {
        const maxpages = Math.floor(results/10) + 1
        setMaxPages(maxpages)
        const maxoffset = maxpages - 10
        var offset = 0;
        if(page < 5) {
            offset = 0
        } else {
            offset = page - 5
        }
        if(offset > maxoffset) offset = maxoffset
        setPageOffset(offset)
    }, [page, results])
    
    useEffect(() => {
        var pns = Math.floor(results / 10)
        if (pns > 10) pns = 10
        var atp = Array.from(Array(pns).keys())
        const toadd = atp.map(p => p += pageOffset)
        setPageNumbers([...toadd])
    }, [pageOffset, results])
    
    if(pageNumbers) return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <button onClick={() => setPage(page-1)} className="button is-small" disabled={page === 1 ? true : false}>Prev</button>
            </div>
            <div className="column is-narrow mx-auto">
                {
                    pageNumbers.map(pn => 
                        <a key={pn} onClick={() => setPage(pn+1)} className={`mx-5 ${pn+1 === page ? 'is-underlined' : ''}`}>{pn + 1}</a>
                        ) 
                }
            </div>
            <div className="column is-narrow">
                <button onClick={() => setPage(page+1)} className="button is-small" disabled={page === maxPages ? true : false}>Next</button>
            </div>

        </div>
    )
}

export default AptPage;