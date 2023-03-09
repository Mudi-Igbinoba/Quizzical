import { useState } from 'react';
import Start from './components/Start';
import Questions from './components/Questions';
import mainImg1 from './assets/images/main-blob1.png';
import mainImg2 from './assets/images/main-blob2.png';
import quizImg1 from './assets/images/quiz-blob1.png';
import quizImg2 from './assets/images/quiz-blob2.png';

export default function App() {
    //Has game started
    const [gameStarted, setGameStarted] = useState(false);

    //  Alternate styles
    const styles = {
        backgroundImage: !gameStarted
            ? `url(${mainImg1}), url(${mainImg2})`
            : `url(${quizImg1}), url(${quizImg2})`,
    };

    //Function to start game
    function startGame() {
        setGameStarted(true);
    }

    return (
        <main style={styles}>
            {!gameStarted ? <Start startGame={startGame} /> : <Questions />}
        </main>
    );
}
