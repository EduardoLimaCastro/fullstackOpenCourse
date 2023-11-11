

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.text} {props.exercises}</p>
  )
}

const Content = (props) => {
  return(
    <>
      <Part text={props.p1} exercises={props.ex1}></Part>
      <Part text={props.p2} exercises={props.ex2}></Part>
      <Part text={props.p3} exercises={props.ex3}></Part>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
  )
}


const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header name={course}></Header> 
      <Content p1={part1} p2={part2} p3={part3} ex1={exercises1} ex2={exercises2} ex3={exercises3}></Content>     
      <Total exercise1={exercises1} exercise2={exercises2} exercise3={exercises3}></Total>
    </div>
  );
};

export default App;
