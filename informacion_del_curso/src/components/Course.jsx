const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  const Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    ) 
  }
  const Content = ({ part }) => {    
    return(
      <div>
        <Part name = { part.name } exercises = { part.exercises } />
      </div>
    )
  }
  
  const Total = (props) => {
    return(
      <p>Number of exercises { props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises }</p>
    )
  }

  const Course = ({ course }) => {
    return(
        <div>
            <Header course={ course.name } />
            { course.parts.map((part) => {
                return <Content key={ part.id } part={ part} />
            })}
        </div>
    )
  }

export default Course;