import SingleQuestion from './SingleQuestion';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export default function Questions() {
    //create questions state data
    const [questions, setQuestions] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [fetchData, setFetchData] = useState(true);

    //Get questions from api using UseEffect

    useEffect(() => {
        if (fetchData) {
            fetch(
                'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'
            )
                .then((res) => res.json())
                .then((data) => {
                    //questions data should be an array of objects with following properties: id, pickedAnswer, question, answers, correct answer, incorrect answers
                    let questions = data.results.map((question) => {
                        return {
                            ...question,
                            pickedAnswer: '',
                            allAnswers: [
                                ...question.incorrect_answers,
                                question.correct_answer,
                            ].sort((a, b) => 0.5 - Math.random()),
                            showAnswer: false,
                            id: nanoid(),
                        };
                    });

                    setQuestions(questions);
                });
        }
    }, [fetchData]);

    // function to change answer
    function changeAnswer(id, value) {
        setQuestions((prevData) => {
            return prevData.map((data) => {
                return id === data.id
                    ? {
                          ...data,
                          pickedAnswer: value,
                      }
                    : data;
            });
        });
    }

    const questionElements = questions.map((question) => (
        <SingleQuestion
            key={question.id}
            id={question.id}
            question={question.question}
            correctAnswer={question.correct_answer}
            incorrectAnswers={question.incorrect_answers}
            pickedAnswer={question.pickedAnswer}
            showAnswer={question.showAnswer}
            changeAnswer={changeAnswer}
            allAnswers={question.allAnswers}
            gameOver={gameOver}
        />
    ));

    useEffect(() => {
        if (questions.length > 0) {
            let counter = 0;

            questions.forEach((question) => {
                if (question.pickedAnswer === question.correct_answer) {
                    counter++;
                }
            });

            setScore(counter);
        }
    }, [questions]);

    //check answers
    function checkAnswers() {
        setGameOver(true);
        setFetchData(false);
    }

    //Play Again
    function playAgain() {
        setGameOver(false);
        setQuestions([]);
        setFetchData(true);
    }

    return (
        <form
            id='questions'
            onSubmit={(e) => {
                e.preventDefault();
                gameOver ? playAgain() : checkAnswers();
            }}>
            {/* map through questions and display questions correctly */}
            {questions.length > 0 ? (
                questionElements
            ) : (
                <h4>Looking for questions.....</h4>
            )}

            {gameOver ? (
                <div className='play-div'>
                    <p>You scored {score}/5 correct answers</p>{' '}
                    <button>Play again</button>
                </div>
            ) : (
                <button id='check'>Check answers</button>
            )}
        </form>
    );
}
