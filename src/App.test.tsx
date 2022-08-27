/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import App from './App';
import InputNumber, { InputNumberProps } from './components/InputNumber';

const CHECKBOX = 'checkbox-box'
const INPUT = 'input-box'
const BUTTON = 'button-subtract'
const OPERATOR_ACTIVE = 'operator-active'

const Wrapper = (props: Partial<InputNumberProps>) => {
  const [isActive, setIsActive] = React.useState<boolean>(false); // YOU CAN DO THIS INSIDE THE WRAPPER COMPONENT
  return <InputNumber {...{ isActive }} onChangeValue={() => setIsActive(old => !old)} {...props} />
};

describe('Initial Render', () => {
  it ('resut should show Error text', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Error/)).toBeTruthy()
  })
})

describe('<InputNumber />', () => {
  it ('should call onChangeValue when triggered', () => {
    const onChangeValue = jest.fn()
    const { getByTestId } = render(<Wrapper onChangeValue={onChangeValue} />)
    const checkbox = getByTestId(CHECKBOX).querySelector('input')
    if (checkbox) fireEvent.click(checkbox)
    expect(onChangeValue).toBeCalled()
  })

  it ('checkbox trigger input', () => {
    const { getByTestId } = render(<Wrapper />)
    const checkbox = getByTestId(CHECKBOX).querySelector('input')
    if (checkbox) fireEvent.click(checkbox)
    expect(getByTestId(INPUT)?.querySelector('input')?.disabled).toBe(false)
  })

  it ('should not show Error anymore', () => {
    const { getByTestId, queryByText } = render(<App />)
    const checkbox = getByTestId(CHECKBOX).querySelector('input')
    if (checkbox) fireEvent.click(checkbox)
    expect(queryByText(/Error/)).toBeFalsy()
  })
})

describe('<Button />', () => {
  it ('should change operator when clicked', () => {
    const { getByTestId } = render(<App />)
    const button = getByTestId(BUTTON)
    fireEvent.click(button)
    const operatorActive = getByTestId(OPERATOR_ACTIVE)
    expect(within(operatorActive).getByText(/-/)).toBeTruthy()
  })
})
