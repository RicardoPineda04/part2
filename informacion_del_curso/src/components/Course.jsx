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
  
  const Total = ({exercises}) => {
    const total = exercises.reduce((acc, exercise) => {
        return acc + exercise.exercises;
    }, 0)
    return(
      <p>Number of exercises { total }</p>
    )
  }

  const Course = ({ course }) => {
    return(
        <div>
            <Header course={ course.name } />
            { course.parts.map((part) => {
                return <Content key={ part.id } part={ part} />
            })}
            <Total exercises={ course.parts } />
        </div>
    )
  }

export default Course;