export default function Start({ startGame }) {
    return (
        <section id='start'>
            <h1>Quizzical</h1>

            <p>Some description if needed</p>

            <button onClick={startGame}>Start quiz</button>
        </section>
    );
}
