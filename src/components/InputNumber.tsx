import React, { CSSProperties } from 'react'

const inputStyle: CSSProperties = {
  textAlign: 'right',
}

export interface InputNumberProps {
  inputValue?: number,
  isActive?: boolean,
  onChangeValue?: () => void,
  onChangeInput?: React.ChangeEventHandler<HTMLInputElement>,
  showCheckbox?: boolean,
  dataTestIdCheckbox?: string,
  dataTestIdInput?: string,
}

const InputNumber = ({ isActive, onChangeValue = () => {}, onChangeInput, inputValue, showCheckbox = true, dataTestIdCheckbox, dataTestIdInput }: InputNumberProps) => {
  return (
    <div className={`d-flex align-items-center`}>
      <div data-testid={dataTestIdInput ?? 'input-box'} className='input-box w-100'>
        <input style={inputStyle} disabled={!isActive} value={String(inputValue)} onChange={onChangeInput} type="number" className='w-100 text-right input' />
      </div>
      <div className={`trigger-input-box`} data-testid={dataTestIdCheckbox ?? 'checkbox-box'} style={{ minWidth: 20 }}>
        {showCheckbox && <input className='checkbox-trigger' defaultChecked={isActive} type="checkbox" onChange={onChangeValue} />}
      </div>
    </div>
  )
}

export default InputNumber