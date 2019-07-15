import React, {useState} from 'react';
import './MultiSelect.scss';

const MultiSelect = (props) => {
    const [values, setValues] = useState(props.selctedItems.length > 0 ? props.selctedItems : props.multiple ? [] : [props.options[0]]);
    const [focusedValue, setFocusedValue] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [typed, setTyped] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const onFocus = () => {
        setIsFocused(true);
    };
    const onBlur = () => {
        const {options, multiple} = props;
        if (multiple) {
            setFocusedValue(-1);
            setIsFocused(false);
            setIsOpen(false);
            setIsTouched(true);
        } else {
            const value = values[0];
            let fValue = -1;
            if (value) {
                fValue = options.findIndex(option => option.name === value)
            }
            setFocusedValue(fValue);
            setIsFocused(false);
            setIsOpen(false);
            setIsTouched(true);
        }
    };
    const onKeyDown = (e) => {
        const {options, multiple} = props;
        switch (e.key) {
            case ' ':
                e.preventDefault();
                if (isOpen) {
                    if (multiple) {
                        if (focusedValue !== -1) {
                            const value = options[focusedValue];
                            const index = values.indexOf(value);
                            if (index === -1) {
                                values.push(value);
                            } else {
                                values.splice(index, 1);
                            }
                            setValues(values);
                        }
                    }
                } else {
                    setIsOpen(true);
                }
                break;
            case 'Escape':
            case 'Tab':
                if (isOpen) {
                    e.preventDefault();
                    setIsOpen(false);
                }
                break;
            case 'Enter':
                setIsOpen(!isOpen);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (focusedValue < options.length - 1) {
                    let fValue = focusedValue;
                    setFocusedValue(fValue++);
                    if (multiple) {
                        setFocusedValue(fValue++);
                    } else {
                        setValues([options[fValue]]);
                        setFocusedValue(fValue++);
                    }
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (focusedValue > 0) {
                    let fValue = focusedValue;
                    setFocusedValue(fValue--);

                    if (multiple) {
                        setFocusedValue(fValue--);
                    } else {
                        setValues([options[fValue]]);
                        setFocusedValue(fValue--);
                    }
                }
                break;
            default:
                if (/^[a-z0-9]$/i.test(e.key)) {
                    const char = e.key;
                    setTimeout(() => {
                        setTyped('');
                    }, 500);
                    const enteredText = typed + char;
                    const re = new RegExp(`^${enteredText}`, 'i');
                    const index = options.findIndex(option => re.test(option.name));
                    if (index === -1) {
                        setTyped(enteredText);
                    }
                    if (multiple) {
                        setFocusedValue(index);
                        setTyped(enteredText);

                    }
                    if (index > -1) {
                        setValues([options[index]]);
                        setFocusedValue(index);
                        setTyped(enteredText);
                    }
                }
                break;
        }
    };
    const onClick = () => {
        setIsOpen(!isOpen);
    };
    const onDeleteOption = (option) => {
        const valueArray = [...values];
        const index = valueArray.indexOf(option);
        valueArray.splice(index, 1);
        setValues(valueArray);
        props.onSelect(valueArray);
    };
    const onHoverOption = (option) => {
        const {options} = props;
        const index = options.findIndex(opt => opt.id === option.id);
        setFocusedValue(index);
    };
    const onClickChildOption = (option, index) => {
        setValues([option]);
        setIsOpen(false);
        props.onSelect([option], index);
    };
    const onClickOption = (option, multiple) => {
        if (!multiple) {
            setValues([option]);
            setIsOpen(false);
            props.onSelect([option]);
            return;
        }
        const index = values.findIndex(x => x.id === option.id);
        const valueArray = [...values];
        if (index === -1) {
            setValues([...valueArray, option]);
            props.onSelect([...valueArray, option]);
        } else {
            valueArray.splice(index, 1);
            setValues(valueArray);
            props.onSelect(valueArray);
        }
    };
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    const renderValues = () => {
        const {placeholder, multiple} = props;
        if (values.length === 0 && multiple) {
            return (
                <div className="multi-select-selection__placeholder">
                    {placeholder}
                </div>
            )
        }
        if (multiple) {
            return values.map((item) => {
                return (
                    <span key={item.id} onClick={(e) => stopPropagation(e)}
                          className="multi-select-selection__multiple multi-select-selection__value">
                        {item.name}
                        <span onClick={() => onDeleteOption(item)} className="multi-select-selection__delete">
                            <X/>
                        </span>
                    </span>
                );
            })
        }
        const {options, index, disabled} = props;
        return disabled === false ?
            <div className="multi-select-selection__value multi-select-selection__value--wrap">
                {options[index] ? options[index].id === 0 ?
                    <span>{options[index].name}</span> : options[index].name : options[0].id === 0
                    ? <span>{options[0].name}</span> : props.options[0].name
                }
            </div> :
            disabled === true ?
                <div className="multi-select-selection__value multi-select-selection__value--wrap">
                    {options.length > 0 ? props.options[0].id === 0 ?
                        <span>{props.options[0].name}</span> : props.options[0].name : null}
                </div> :
                <div className="multi-select-selection__value multi-select-selection__value--wrap">
                    {values.length > 0 ? values[0].id === 0 ? <span>{values[0].name}</span> : values[0].name : null}
                </div>
    };
    const renderOption = (option, index) => {
        const {multiple} = props;
        const {name} = option;
        const selectedIndex = values.findIndex(x => x.id === option.id);
        let selected = false;
        if (selectedIndex > -1) {
            selected = true;
        }
        let className = "multi-select__option";
        if (selected) className += " selected";
        if (index === focusedValue) className += " focused";
        return (props.disabled === false ?
                <div key={option.id} className={className} onMouseOver={() => onHoverOption(option)}
                     onClick={() => onClickChildOption(option, index)}>
                    {multiple ? <span className="multi-select__checkbox">{selected ? <Check/> : null}</span> : null}
                    <span> {name}</span>
                </div> :
                <div key={option.id} className={className} onMouseOver={() => onHoverOption(option)}
                     onClick={() => onClickOption(option, multiple, index)}>
                    {multiple ? <span className="multi-select__checkbox">{selected ? <Check/> : null}</span> : null}
                    <span> {name}</span>
                </div>
        )
    };
    const renderOptions = () => {
        const {options} = props;
        if (!isOpen) {
            return null
        }
        return (
            <div className="multi-select__options">
                {options.map(renderOption)}
            </div>
        )
    };

    const {label, groupText, required, multiple, disabled, readOnly} = props;
    const errorCondition = (required && values.length === 0 && isTouched) || (required && values.length > 0 && values[0].id === 0 && isTouched);
    const selectionClass = errorCondition ? 'multi-select-selection multi-select-selection--invalid' : 'multi-select-selection multi-select-selection--valid';
    const messageClass = errorCondition ? 'multi-select__message--invalid' : 'multi-select__message';
    const selectClass = errorCondition ? 'multi-select multi-select--invalid' : 'multi-select';
    let inputClass = errorCondition ? 'multi-select__input multi-select__input--invalid' : 'multi-select__input';
    if (disabled || readOnly) {
        inputClass += ' multi-select__input--disabled'
    }
    const arrowClass = disabled || readOnly ? 'multi-select-selection__arrow--hidden' : 'multi-select-selection__arrow';
    return (
        <div className={selectClass} tabIndex="0" onFocus={() => onFocus()} onBlur={() => onBlur()}
             onKeyDown={(e) => onKeyDown(e)}>
            {label ?
                <label className="multi-select__label">{label}
                    {required ? <span className="text-danger">*</span> : null}
                </label>
                : null
            }
            {disabled || readOnly ?
                <div className={selectionClass}>
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className={`fa fa-${groupText}`}/></span>
                    </div>
                    <div className={inputClass} style={!multiple ? {height: '45px'} : {}}>{renderValues()}</div>
                    <span className={arrowClass}>{isOpen ? <ChevronUp/> : <ChevronDown/>}</span>
                </div>
                : <div className={selectionClass} onClick={() => onClick()}>
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className={`fa fa-${groupText}`}/></span>
                    </div>
                    <div className={inputClass} style={!multiple ? {height: '45px'} : {}}>{renderValues()}</div>
                    <span className={arrowClass}>{isOpen ? <ChevronUp/> : <ChevronDown/>}</span>
                </div>}
            {renderOptions()}
            <span className={messageClass}>{label} must be required.</span>
        </div>
    )
};

const ChevronDown = () => (
    <svg viewBox="0 0 10 7">
        <path
            d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z"
            transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) "/>
    </svg>
);

const ChevronUp = () => (
    <svg viewBox="0 0 10 8">
        <path
            d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z"
            transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) "/>
    </svg>
);

const X = () => (
    <svg viewBox="0 0 16 16">
        <path
            d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z"/>
    </svg>
);

const Check = () => (
    <svg viewBox="0 0 16 16">
        <path
            d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z"
            transform="translate(0 1)"/>
    </svg>
);

export default MultiSelect;
