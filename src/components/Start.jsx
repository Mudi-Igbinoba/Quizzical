export default function Start({ startGame }) {
    return (
        <section id='start'>
            <h1>Quizzical</h1>

            <p>A fun quiz game to test your general knowledge. Try it out and make sure you <strong>DON'T CHEAT</strong>! Have fun!!!</p>

            <button onClick={startGame}>Start quiz</button>
        </section>
    );
}
