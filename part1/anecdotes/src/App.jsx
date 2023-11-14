import { useState } from "react";

let points = new Uint8Array(8)
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points)
  const [mostVoted, setMostVoted] = useState(0)

  // const mostVoted = () => {
  //   const max = Math.max(...points)
  //   const index = points.indexOf(max)
  //   console.log(index)
  //   return index
  // }
  
  const voteCount = () => {
    const copy = [...votes]
    copy[selected] +=1
    setVotes(copy)
    const max = Math.max(...copy)
    const index = copy.indexOf(max)
    setMostVoted(index)
  }

  //console.log(votes)
  const randomNumber = () => {
    const max = anecdotes.length;
    const number = Math.floor(Math.random() * (max - 0) + 0);
    setSelected(number);
    
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteCount}>Vote</button>
      <button onClick={randomNumber}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </>
  );
};

export default App;
