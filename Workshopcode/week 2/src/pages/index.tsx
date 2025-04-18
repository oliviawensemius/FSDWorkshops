import { Dispatch, SetStateAction, useState } from "react"

type CounterType = number | null

const IndexPage = () => {
  const [counter, setCounter] = useState<CounterType>(null);

  return (
    <div>
      <CounterDisplay counter={counter} />
      <CounterIncreaser counter={counter} setCounter={setCounter} />
    </div>
  )
}

interface CounterIncreaserProps {
  counter: CounterType,
  setCounter: Dispatch<SetStateAction<CounterType>>
}

const CounterIncreaser = ({ counter, setCounter }: CounterIncreaserProps) => {
  const handleClick = () => {
    if (counter === null) {
      setCounter(0);
    } else {
      setCounter(counter => counter! + 1);
    }
  }

  return (
    <>
      <button onClick={handleClick}>Increase Counter!</button>
    </>
  )
}

const CounterDisplay = ({ counter }: { counter: number | null }) => {
  return (
    <>
      {counter === null && <h1>The counter is not set</h1>}
      {counter !== null && <h1>Counter: {counter}</h1>}
    </>
  )
}

export default IndexPage;
