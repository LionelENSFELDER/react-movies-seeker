import React, {useState} from 'react'

function MainMenuItem({genres}) {
    let [selectedFilter, setSelectedFilter] = useState("");
    
    return (
        <div>
            <p className="text-white">" {selectedFilter} " is selected</p>
            <select id="" className="custom-select mb-3" onChange={e => setSelectedFilter(e.target.value)}>
                <option value="">Select one...</option>
                {genres.map(x=>
                    <option value={x.name} data-filter={x.name}>{x.name}</option>
                )}
            </select>
        </div>
    )
}

export default MainMenuItem;