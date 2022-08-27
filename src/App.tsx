import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import InputNumber from './components/InputNumber';

function App() {
  const [value1, setValue1] = useState<number>(0)
  const [value2, setValue2] = useState<number>(0)
  const [value3, setValue3] = useState<number>(0)

  const [result, setResult] = useState<number | string>(0)

  const [operator, setOperator] = useState<string>('+')

  const [isValue2Active, setIsValue2Active] = useState(false)
  const [isValue3Active, setIsValue3Active] = useState(false)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateResult = () => {
    if (!isValue2Active && !isValue3Active) return setResult('Error')
    let calcArr = [value1]
    if (isValue2Active) calcArr.push(value2)
    if (isValue3Active) calcArr.push(value3)
    let newResult = 0
    switch(operator) {
      case '+':
        newResult = calcArr.reduce((prev, curr) => prev + curr)
        break;
      case '-':
        newResult = calcArr.reduce((prev, curr) => prev - curr)
        break;
      case 'x':
        newResult = calcArr.reduce((prev, curr) => prev * curr)
        break;
      case '/':
        newResult = calcArr.reduce((prev, curr) => prev / curr)
        break;
      default:
        newResult = calcArr.reduce((prev, curr) => prev + curr)
        break;
    }

    setResult(newResult)
  }

  useEffect(() => {
    calculateResult()
    return () => {}
  }, [operator, value1, value2, value3, calculateResult])

  return (
    <div className="App d-flex justify-content-center align-items-center">
      <div className='box'>
        <div className='button-box d-flex flex-row w-100 justify-content-between mb-4'>
          <Button style={{ marginRight: 5 }} operatorActive={operator} onClick={() => setOperator('+')} text='+' />
          <Button dataTestId='button-subtract' style={{ marginRight: 5 }} operatorActive={operator} onClick={() => setOperator('-')} text='-' />
          <Button style={{ marginRight: 5 }} operatorActive={operator} onClick={() => setOperator('x')} text='x' />
          <Button operatorActive={operator} onClick={() => setOperator('/')} text='/' />
        </div>
        <div className='input-box'>
          <InputNumber dataTestIdInput='input-box-1' dataTestIdCheckbox='checkbox-box-1' showCheckbox={false} inputValue={value1} isActive={true} onChangeInput={(e) => setValue1(Number(e.target.value))} />
          <InputNumber inputValue={value3} isActive={isValue3Active} onChangeValue={() => setIsValue3Active(old => !old)} onChangeInput={(e) => setValue3(Number(e.target.value))} />
          <InputNumber dataTestIdInput='input-box-3' dataTestIdCheckbox='checkbox-box-3' inputValue={value2} isActive={isValue2Active} onChangeValue={() => setIsValue2Active(old => !old)} onChangeInput={(e) => setValue2(Number(e.target.value))} />
        </div>
        <div className='separator-box d-flex align-items-center'>
          <div className='separator w-100' />
          <div data-testid='operator-active' className='operator-result'><b>{operator}</b></div>
        </div>
        <div data-testid="result" className='result-box'><p style={{ textAlign: "right", marginRight: 40 }}>{result}</p></div>
      </div>
    </div>
  );
}

export default App;
