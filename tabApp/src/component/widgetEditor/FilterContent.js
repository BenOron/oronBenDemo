import React from "react";
import {Dropdown,Button} from "react-bootstrap";

const FilterContent = (props) => {
    const {allWidgets, filterSelectFn} = props;

    const emptyStore = allWidgets.length > 0 ;
    const filterByKey = (key,that) => {
        if(key==='' || allWidgets.length < 1){
            return ''
        }
       // dropdown-menu
        let dropdown = document.getElementsByClassName("dropdown-menu show");
        dropdown[0]?.classList.remove('show');

        return [...new Map(allWidgets.map(item =>
            [item[key], item])).values()];
    }

    return (
        <> {emptyStore && <Dropdown >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Choose Country
                </Dropdown.Toggle>
                <Dropdown.Menu  >
                    {filterByKey('country').map((widget, index) => {
                        return <li key={index} onClick={() => filterSelectFn(widget.country)} >{widget.country}  </li>
                    })}
                </Dropdown.Menu>
            </Dropdown>}
            {emptyStore && <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic1">
                    Choose Brand
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    {filterByKey('brandName').map((widget, index) => {
                        return <li key={index} onClick={() => filterSelectFn(widget.brandName)}>{widget.brandName}  </li>
                    })}
                </Dropdown.Menu>
            </Dropdown>}
            {emptyStore &&<Button variant="secondary" className='filterBtn' onClick={() => filterSelectFn('')} size="sm">Clear Filters</Button>}
        </>
    )
}

export default FilterContent;