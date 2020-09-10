import React, {useState, useEffect} from 'react'

function GenreSelect({genres}) {

    let [selectedFilter, setSelectedFilter] = useState("All");

    function handleGenreSelected(event){
        setSelectedFilter(event.target.value);
    }

    useEffect(() => {
        if(selectedFilter){
            let regex = `${selectedFilter}`;
            let cards = Array.from(document.querySelectorAll('[data-tag]'));
            cards.map(
                function(x){
                    if(selectedFilter === "All" || selectedFilter === ""){
                        if(x.classList.contains('d-none')){
                            x.classList.remove('d-none')
                        }
                    }else if(selectedFilter !== "All" || selectedFilter !== ""){
                        if(x.classList.contains('d-none')){
                            x.classList.remove('d-none')
                        }
                        let attr = x.getAttribute('data-tag');
                        let result = attr.search(regex);
                        if(result === -1){
                            x.classList.add('d-none');
                        }
                    }
                }
            )
        }
    }, [selectedFilter]);

    return (
        <div>
            <select className="custom-select mb-3" value={selectedFilter} onChange={handleGenreSelected}>
                <option value="All" data-filter="All">All</option>
                {genres.map(x=>
                    <option key={x.id} value={x.name} data-filter={x.name}>{x.name}</option>
                )}
            </select>
        </div>
    )
}

export default GenreSelect;