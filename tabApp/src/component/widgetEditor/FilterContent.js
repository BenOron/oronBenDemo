import React from "react";
import {Dropdown, Button} from "react-bootstrap";

const FilterContent = (props) => {
    const {allWidgets, filterSelectFn} = props;
    const notEmptyStore = allWidgets.length > 0;


    /**
     * Here we actually do the map with key
     * return New Map with filtered content.
     * @param key
     * @returns {string|unknown[]}
     */
    const filterByKey = (key) => {
        if (key === '' || allWidgets.length < 1) {
            return ''
        }
        closeDropDownMenu();
        return [...new Map(allWidgets.map(widget =>
            [widget[key], widget])).values()];
    }


    /**
     * Handling close DropDown Menu
     */
    const closeDropDownMenu = () => {
        let dropdown = document.getElementsByClassName("dropdown-menu show");
        dropdown[0]?.classList.remove('show');
    }

    
    return (
        <> {notEmptyStore && <Dropdown >
                 <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                     Choose Country
                 </Dropdown.Toggle>
                 <Dropdown.Menu  >
                     {filterByKey('country').map((widget, index) => {
                         return <li key={index} onClick={() => filterSelectFn(widget.country)} >{widget.country}  </li>
                     })}
                 </Dropdown.Menu>
             </Dropdown>}
             {notEmptyStore && <Dropdown>
                 <Dropdown.Toggle variant="secondary" id="dropdown-basic1">
                     Choose Brand
                 </Dropdown.Toggle>
                 <Dropdown.Menu >
                     {filterByKey('brandName').map((widget, index) => {
                         return <li key={index} onClick={() => filterSelectFn(widget.brandName)}>{widget.brandName}  </li>
                     })}
                 </Dropdown.Menu>
             </Dropdown>}
             {notEmptyStore && <Button variant="secondary" className='filterBtn' onClick={() => filterSelectFn('')} size="sm">Clear Filters</Button>}
            </>
    )
}

export default FilterContent;