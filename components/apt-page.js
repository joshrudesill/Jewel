import { useEffect, useState } from "react";


const AptPage = ({ page, results, setPage }) => {
    const [pageNumbers, setPageNumbers] = useState([])
    const [pageOffset, setPageOffset] = useState(0)
    const [maxPages, setMaxPages] = useState()
    useEffect(() => {
        const maxpages = Math.floor(results/20) + 1
        setMaxPages(maxpages)
        const maxoffset = maxpages - 10
        var offset = 0;
        if(page < 5) {
            offset = 0
        } else {
            offset = page - 5
        }
        if(offset > maxoffset) offset = maxoffset
        if(offset < 0) offset = 0
        setPageOffset(offset)
    }, [page, results])
    
    useEffect(() => {
        var pns = Math.floor(results / 10) + 1
        if (pns > 10) pns = 10
        var atp = Array.from(Array(pns).keys())
        const toadd = atp.map(p => p += pageOffset)
        setPageNumbers([...toadd])
    }, [pageOffset, results])
    
    if(pageNumbers) return (
        <div className="columns is-centered is-mobile">
            <div className="column">
                <button onClick={() => setPage(page-1)} className="button is-small" disabled={page === 1 ? true : false}>Prev</button>
            </div>
            <div className="column is-flex is-justify-content-center">
                <div className="columns is-variable is-5-desktop is-2-mobile is-mobile">
                    {
                        pageNumbers.map(pn => 
                            <div className="column" key={pn}>
                                <a  onClick={() => setPage(pn+1)} className={`${pn+1 === page ? 'is-underlined' : ''}`}>{pn + 1}</a>
                            </div>
                            ) 
                    }
                </div>
            </div>
            <div className="column is-flex is-justify-content-end">
                <button onClick={() => setPage(page+1)} className="button  is-small" disabled={page === maxPages ? true : false}>Next</button>
            </div>

        </div>
    )
}

export default AptPage;