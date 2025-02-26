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
  const Content = ({ parts }) => {     
    return(
      <div>
        {
            parts.map((part) =>{
                return <Part key= { part.id } name = { part.name } exercises = { part.exercises } />
            })
        }        
      </div>
    )
  }
  
  const Total = ({ exercises }) => {  
    const total = exercises.parts.reduce((acc, item) => {  
        return acc + item.exercises;
    }, 0);    
    return(
        <p><strong>Number of exercises { total }</strong></p>
    )
  }

  const Course = ({ courses }) => {
    return(
        <div>
            {
                courses.map((course) =>{
                    return(
                        <div key= { course.id }>
                            <Header course = { course.name } />
                            <Content parts = { course.parts } />
                            <Total exercises = { course } />
                        </div>
                    )
                })
            }
        </div>
    )
  }

export default Course;