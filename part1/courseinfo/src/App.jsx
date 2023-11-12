

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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}></Header> 
      <Content p1={course.parts[0].name} p2={course.parts[1].name} p3={course.parts[2].name} ex1={course.parts[0].exercises} ex2={course.parts[2].exercises} ex3={course.parts[2].exercises}></Content>     
      <Total exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2].exercises}></Total>
    </div>
  );
};

export default App;
