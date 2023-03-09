import parse from 'html-react-parser';

export default function SingleQuestion(props) {
    const options = props.allAnswers.map((option, index) => {
        const checkStyle = `
        ${props.gameOver && 'muted-option'}
        ${
            props.gameOver && option === props.correctAnswer
                ? 'correct-option'
                : ''
        }
           ${
               props.gameOver &&
               props.pickedAnswer !== props.correctAnswer &&
               option !== props.correctAnswer
                   ? 'incorrect-option'
                   : ''
           }  
    `;

        return (
            <div className='option' key={index}>
                <input
                    id={option}
                    type='radio'
                    name={props.id}
                    value={option}
                    onChange={() => {
                        props.changeAnswer(props.id, option);
                    }}
                    disabled={props.gameOver ? true : false}
                />
                <label
                    id={
                        props.gameOver &&
                        props.pickedAnswer === '' &&
                        option !== props.correctAnswer
                            ? 'incorrect-option'
                            : ''
                    }
                    className={checkStyle}
                    htmlFor={option}>
                    {parse(option)}
                </label>
            </div>
        );
    });

    return (
        <div className='question question1'>
            <h3>{parse(props.question)}</h3>
            <div className='options'>{options}</div>
        </div>
    );
}
