/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({name, onClick}) => {

  return (
    <button onClick={onClick}>{name}</button>
  )
}

const Statistic = (props) => {
  if(props.statistics === false) {      
    return (<h3>No Feedback given</h3>)
  }
  else {
    return (
    <>
    </>
    )
  } 
}

const StatisticLine = (props) => {  
      if(props.statistics === false) {      
        return (<></>)
      }
      else {
        return (
        <>
          <p>{props.text} = {props.value} {props.symbol}</p>
        </>
        )
      }    
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [statistics, setStatistics] = useState(false)
  const countGood = () => {
    setGood(good + 1)
    setStatistics(true)
  }
  const countNeutral = () => {
    setNeutral(neutral + 1)  
    setStatistics(true)
  }
  const countBad = () => {
    setBad(bad + 1)
    setStatistics(true)
  }
   
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="good" onClick={countGood}></Button>
      <Button name="neutral" onClick={countNeutral}></Button>
      <Button name="bad" onClick={countBad}></Button>
      <Statistic statistics={statistics}></Statistic> 
      <StatisticLine text="Good" value={good} statistics={statistics}></StatisticLine>
      <StatisticLine text="Neutral" value={neutral} statistics={statistics}></StatisticLine>
      <StatisticLine text="Bad" value={bad} statistics={statistics}></StatisticLine>
      <StatisticLine text="All" value={good + neutral + bad} statistics={statistics}></StatisticLine>
      <StatisticLine text="Average" value={(good - bad)/(good + neutral + bad)} statistics={statistics}  symbol="%"></StatisticLine>
      <StatisticLine text="Poritive" value={(((good)/(good + neutral + bad)))*100} statistics={statistics}  symbol="%"></StatisticLine>
    </div>
  )
}

export default App